<?php
/**
 * twin.php — server-side proxy for the Digital Twin.
 *
 * Why this exists: a static bundle cannot hide an API key (VITE_ vars are
 * inlined into public JS) and a localStorage limit is trivially bypassed. This
 * proxy runs on Hostinger's PHP, so:
 *   - the FreeLLMAPI key lives ONLY on the server (config.php, never shipped to JS)
 *   - the daily limit is enforced per client IP, server-side (can't be cleared)
 *
 * Ships inside dist/api/. The real key is written to dist/api/config.php at
 * build time from .env (see scripts/gen-php-config.mjs) — config.php is NOT in
 * source control and NOT readable over HTTP (.htaccess denies it).
 */

declare(strict_types=1);

/* ---------- config ---------- */
$cfg = @include __DIR__ . '/config.php';
if (!is_array($cfg) || empty($cfg['api_key'])) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Server not configured']);
    exit;
}

$API_URL       = rtrim($cfg['base_url'], '/') . '/chat/completions';
$API_KEY       = $cfg['api_key'];
$MODEL         = $cfg['model'] ?? 'auto';
$DAILY_LIMIT   = (int)($cfg['daily_limit'] ?? 10);
$ALLOW_ORIGINS = $cfg['allow_origins'] ?? []; // [] = allow any

/* ---------- CORS (same-origin in prod; allowlist optional) ---------- */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin) {
    if (empty($ALLOW_ORIGINS) || in_array($origin, $ALLOW_ORIGINS, true)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Vary: Origin');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
    }
}
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }

header('Content-Type: application/json');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

/* ---------- identify client ---------- */
function client_ip(): string {
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $k) {
        if (!empty($_SERVER[$k])) {
            $ip = trim(explode(',', $_SERVER[$k])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) return $ip;
        }
    }
    return '0.0.0.0';
}

$ip  = client_ip();
$day = gmdate('Y-m-d');
$key = hash('sha256', $ip . '|' . $day);

$dir = __DIR__ . '/.rl';
if (!is_dir($dir)) { @mkdir($dir, 0700, true); }
$file = "$dir/$key.json";

/* ---------- atomic reserve-before-forward (prevents race bypass) ---------- */
$fp = fopen($file, 'c+');
if ($fp === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Storage error']);
    exit;
}
flock($fp, LOCK_EX);
$raw   = stream_get_contents($fp);
$state = json_decode($raw ?: '{}', true);
$count = ($state['day'] ?? '') === $day ? (int)($state['count'] ?? 0) : 0;

if ($count >= $DAILY_LIMIT) {
    flock($fp, LOCK_UN); fclose($fp);
    http_response_code(429);
    echo json_encode(['error' => 'rate_limited', 'remaining' => 0, 'limit' => $DAILY_LIMIT]);
    exit;
}

$count++; // reserve the slot NOW, before the slow upstream call
ftruncate($fp, 0); rewind($fp);
fwrite($fp, json_encode(['day' => $day, 'count' => $count]));
fflush($fp);
flock($fp, LOCK_UN); fclose($fp);

$remaining = max(0, $DAILY_LIMIT - $count);

/* ---------- validate body ---------- */
$body = json_decode(file_get_contents('php://input'), true);
$messages = $body['messages'] ?? null;
if (!is_array($messages) || count($messages) === 0) {
    // bad request shouldn't burn a slot → refund
    refund($file, $day);
    http_response_code(400);
    echo json_encode(['error' => 'messages[] required']);
    exit;
}

/* ---------- forward to FreeLLMAPI ---------- */
$payload = json_encode([
    'model'       => $MODEL,
    'messages'    => $messages,
    'temperature' => 0.6,
    'max_tokens'  => 600,
    'stream'      => false,
]);

$ch = curl_init($API_URL);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 45,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $API_KEY,
    ],
]);
$resp   = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err    = curl_error($ch);
curl_close($ch);

/* ---------- upstream failed → refund the reserved slot ---------- */
if ($resp === false || $status >= 500 || $status === 0) {
    refund($file, $day);
    http_response_code(502);
    echo json_encode(['error' => 'upstream_unavailable', 'detail' => $err ?: "status $status"]);
    exit;
}

/* success (or 4xx from upstream) → keep the slot, relay response + meta */
$data = json_decode($resp, true);
$content = $data['choices'][0]['message']['content'] ?? null;
if ($content === null) {
    refund($file, $day);
    http_response_code(502);
    echo json_encode(['error' => 'bad_upstream_response']);
    exit;
}

echo json_encode(['content' => $content, 'remaining' => $remaining, 'limit' => $DAILY_LIMIT]);

/* ---------- helpers ---------- */
function refund(string $file, string $day): void {
    $fp = @fopen($file, 'c+');
    if (!$fp) return;
    flock($fp, LOCK_EX);
    $state = json_decode(stream_get_contents($fp) ?: '{}', true);
    if (($state['day'] ?? '') === $day && (int)($state['count'] ?? 0) > 0) {
        $state['count']--;
        ftruncate($fp, 0); rewind($fp);
        fwrite($fp, json_encode(['day' => $day, 'count' => $state['count']]));
    }
    flock($fp, LOCK_UN); fclose($fp);
}
