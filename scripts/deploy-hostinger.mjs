#!/usr/bin/env node
/**
 * Deploys dist/ to Hostinger through their hosting API.
 *
 * Requires the credentials file created by the Hostinger MCP flow:
 *   ~/.config/hostinger-mcp/credentials.json
 * Override with HOSTINGER_CREDENTIALS. The domain defaults to
 * abrarakhunji.com and can be overridden with HOSTINGER_DOMAIN.
 *
 * The archive is created locally from dist/ on every run, so there is no
 * stale dist.zip to deploy by accident.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const tusModule = require('tus-js-client');
const TusUpload = tusModule.Upload || tusModule.default?.Upload || tusModule;

const DOMAIN = process.env.HOSTINGER_DOMAIN || 'abrarakhunji.com';
const DIST_DIR = path.resolve('dist');
const ARCHIVE_PATH = path.resolve('dist.zip');
const CREDENTIALS_PATH = process.env.HOSTINGER_CREDENTIALS
  || path.join(os.homedir(), '.config/hostinger-mcp/credentials.json');
const BASE_URL = 'https://developers.hostinger.com/';
const AUTH_URL = 'https://auth.hostinger.com/api/external/v1/oauth-server/token';

async function fetchWithRetry(url, options, retries = 3, backoff = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (i === retries - 1) throw err;
      console.warn(`[network] Fetch attempt ${i + 1} failed (${err.message}). Retrying in ${backoff}ms...`);
      await new Promise(r => setTimeout(r, backoff));
      backoff *= 2;
    }
  }
}

async function getValidToken() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(`Hostinger credentials not found at ${CREDENTIALS_PATH}. Set HOSTINGER_CREDENTIALS or complete the Hostinger auth flow.`);
  }
  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

  if (creds.access_token && creds.expires_at && Date.now() < (creds.expires_at - 60_000)) {
    console.log('[auth] Using active access token.');
    return creds.access_token;
  }

  console.log('[auth] Refreshing access token...');
  const params = new URLSearchParams();
  params.set('grant_type', 'refresh_token');
  params.set('refresh_token', creds.refresh_token);
  params.set('client_id', creds.client_id);

  const res = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  if (!res.ok) throw new Error(`Token refresh failed (${res.status}): ${await res.text()}`);

  const data = await res.json();
  const next = {
    client_id: creds.client_id,
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + (data.expires_in - 60) * 1000,
  };
  fs.writeFileSync(CREDENTIALS_PATH, JSON.stringify(next, null, 2));
  console.log('[auth] Access token refreshed.');
  return next.access_token;
}

function createArchive() {
  if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    throw new Error('dist/index.html is missing. Run `npm run build` first.');
  }
  if (fs.existsSync(ARCHIVE_PATH)) fs.unlinkSync(ARCHIVE_PATH);
  execFileSync('zip', ['-rq', ARCHIVE_PATH, '.'], { cwd: DIST_DIR });
  const size = fs.statSync(ARCHIVE_PATH).size;
  console.log(`[archive] ${path.basename(ARCHIVE_PATH)} (${(size / 1024 / 1024).toFixed(2)} MB)`);
  return size;
}

async function uploadArchive(archiveSize, uploadUrl, authToken, authRestToken) {
  const archiveName = path.basename(ARCHIVE_PATH);
  const uploadUrlWithFile = `${uploadUrl.replace(/\/$/, '')}/${archiveName}?override=true`;
  const headers = {
    'X-Auth': authToken,
    'X-Auth-Rest': authRestToken,
    'upload-length': String(archiveSize),
    'upload-offset': '0',
  };

  const preRes = await fetch(uploadUrlWithFile, { method: 'POST', headers });
  if (preRes.status !== 201) {
    console.warn(`[upload] Pre-upload returned ${preRes.status}; continuing with TUS.`);
  }

  const fileBuffer = fs.readFileSync(ARCHIVE_PATH);
  await new Promise((resolve, reject) => {
    const upload = new TusUpload(fileBuffer, {
      uploadUrl: uploadUrlWithFile,
      retryDelays: [0, 1000, 3000, 5000, 10000, 20000],
      uploadDataDuringCreation: false,
      parallelUploads: 1,
      chunkSize: 2 * 1024 * 1024,
      headers,
      removeFingerprintOnSuccess: true,
      uploadSize: archiveSize,
      metadata: { filename: archiveName },
      onProgress: (uploaded, total) => {
        const percent = ((uploaded / total) * 100).toFixed(1);
        if (percent.endsWith('.0') || uploaded === total) {
          console.log(`[upload] ${percent}%`);
        }
      },
      onError: reject,
      onSuccess: resolve,
    });
    upload.start();
  });
  return archiveName;
}

async function main() {
  const archiveSize = createArchive();
  const token = await getValidToken();

  const sitesRes = await fetchWithRetry(
    new URL(`api/hosting/v1/websites?domain=${encodeURIComponent(DOMAIN)}`, BASE_URL),
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!sitesRes.ok) throw new Error(`Could not resolve site: ${sitesRes.status} ${await sitesRes.text()}`);
  const sites = await sitesRes.json();
  const username = sites.data?.[0]?.username;
  if (!username) throw new Error('Hosting username missing from API response.');

  const credsRes = await fetchWithRetry(new URL('api/hosting/v1/files/upload-urls', BASE_URL), {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, domain: DOMAIN }),
  });
  if (!credsRes.ok) throw new Error(`Upload credentials failed: ${credsRes.status} ${await credsRes.text()}`);
  const uploadCreds = await credsRes.json();

  const archiveName = await uploadArchive(archiveSize, uploadCreds.url, uploadCreds.auth_key, uploadCreds.rest_auth_key);

  const deployRes = await fetchWithRetry(
    new URL(`api/hosting/v1/accounts/${username}/websites/${DOMAIN}/deploy`, BASE_URL),
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ archive_path: archiveName }),
    }
  );
  if (!deployRes.ok) throw new Error(`Deploy failed: ${deployRes.status} ${await deployRes.text()}`);

  fs.unlinkSync(ARCHIVE_PATH);
  console.log('[deploy] Hostinger deployment triggered successfully.');
}

main().catch((error) => {
  console.error('[deploy] Failed:', error.message);
  process.exit(1);
});
