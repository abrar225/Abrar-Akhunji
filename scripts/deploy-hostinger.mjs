import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const tus = require('/Users/abrarakhunji/.npm/_npx/a7204b5813574340/node_modules/tus-js-client/lib.es5/node/index.js');

const DOMAIN = 'abrarakhunji.com';
const ARCHIVE_PATH = path.resolve('dist.zip');
const CREDENTIALS_PATH = '/Users/abrarakhunji/.config/hostinger-mcp/credentials.json';
const BASE_URL = 'https://developers.hostinger.com/';
const AUTH_URL = 'https://auth.hostinger.com/api/external/v1/oauth-server/token';

async function getValidToken() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(`Credentials file not found at ${CREDENTIALS_PATH}`);
  }
  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  
  if (creds.access_token && creds.expires_at && Date.now() < (creds.expires_at - 60000)) {
    console.log('[Auth] Using active access token.');
    return creds.access_token;
  }

  console.log('[Auth] Token expired or expiring soon, refreshing...');
  const params = new URLSearchParams();
  params.set('grant_type', 'refresh_token');
  params.set('refresh_token', creds.refresh_token);
  params.set('client_id', creds.client_id);

  const res = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token refresh failed with status ${res.status}: ${text}`);
  }

  const data = await res.json();
  const newCreds = {
    client_id: creds.client_id,
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + (data.expires_in - 60) * 1000
  };
  fs.writeFileSync(CREDENTIALS_PATH, JSON.stringify(newCreds, null, 2));
  console.log('[Auth] Successfully refreshed access token.');
  return newCreds.access_token;
}

async function main() {
  console.log(`Starting deployment for domain: ${DOMAIN}`);
  if (!fs.existsSync(ARCHIVE_PATH)) {
    throw new Error(`Archive not found at ${ARCHIVE_PATH}`);
  }
  const stats = fs.statSync(ARCHIVE_PATH);
  console.log(`Archive file: ${ARCHIVE_PATH} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

  const token = await getValidToken();

  // 1. Resolve username
  console.log(`Resolving username for ${DOMAIN}...`);
  const sitesUrl = new URL(`api/hosting/v1/websites?domain=${encodeURIComponent(DOMAIN)}`, BASE_URL).toString();
  const sitesRes = await fetch(sitesUrl, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!sitesRes.ok) {
    throw new Error(`Failed to resolve username: ${sitesRes.status} ${await sitesRes.text()}`);
  }
  const sitesData = await sitesRes.json();
  const username = sitesData.data?.[0]?.username;
  if (!username) {
    throw new Error(`Username not found in response: ${JSON.stringify(sitesData)}`);
  }
  console.log(`Resolved username: ${username}`);

  // 2. Fetch upload credentials
  console.log('Fetching upload credentials...');
  const credsUrl = new URL('api/hosting/v1/files/upload-urls', BASE_URL).toString();
  const credsRes = await fetch(credsUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, domain: DOMAIN })
  });
  if (!credsRes.ok) {
    throw new Error(`Failed to fetch upload credentials: ${credsRes.status} ${await credsRes.text()}`);
  }
  const credsData = await credsRes.json();
  const uploadUrl = credsData.url;
  const authToken = credsData.auth_key;
  const authRestToken = credsData.rest_auth_key;
  console.log(`Got upload URL: ${uploadUrl}`);

  // 3. Pre-upload POST & TUS upload
  const archiveBasename = path.basename(ARCHIVE_PATH);
  const cleanUploadUrl = uploadUrl.replace(/\/$/, '');
  const uploadUrlWithFile = `${cleanUploadUrl}/${archiveBasename}?override=true`;

  const requestHeaders = {
    'X-Auth': authToken,
    'X-Auth-Rest': authRestToken,
    'upload-length': stats.size.toString(),
    'upload-offset': '0'
  };

  console.log(`Sending pre-upload POST to ${uploadUrlWithFile}...`);
  const preRes = await fetch(uploadUrlWithFile, {
    method: 'POST',
    headers: requestHeaders
  });
  if (preRes.status !== 201) {
    console.warn(`Pre-upload POST status was ${preRes.status}: ${await preRes.text()}`);
  } else {
    console.log('Pre-upload initialization OK.');
  }

  // 4. Upload with tus.Upload
  console.log('Uploading archive via TUS...');
  const fileStream = fs.createReadStream(ARCHIVE_PATH);

  await new Promise((resolve, reject) => {
    let lastPercent = 0;
    const upload = new tus.Upload(fileStream, {
      uploadUrl: uploadUrlWithFile,
      retryDelays: [1000, 2000, 4000, 8000, 16000, 20000],
      uploadDataDuringCreation: false,
      parallelUploads: 1,
      chunkSize: 5242880, // 5MB chunks
      headers: requestHeaders,
      removeFingerprintOnSuccess: true,
      uploadSize: stats.size,
      metadata: { filename: archiveBasename },
      onProgress: (bytesUploaded, bytesTotal) => {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(1);
        if (Math.abs(percentage - lastPercent) >= 5 || bytesUploaded === bytesTotal) {
          console.log(`[Upload] ${percentage}% (${(bytesUploaded / 1024 / 1024).toFixed(2)} / ${(bytesTotal / 1024 / 1024).toFixed(2)} MB)`);
          lastPercent = percentage;
        }
      },
      onError: (err) => {
        reject(new Error(`TUS upload error: ${err.message}`));
      },
      onSuccess: () => {
        console.log('TUS upload completed successfully!');
        resolve();
      }
    });

    upload.start();
  });

  // 5. Trigger deployment
  console.log(`Triggering deployment on Hostinger for ${DOMAIN}...`);
  const deployUrl = new URL(`api/hosting/v1/accounts/${username}/websites/${DOMAIN}/deploy`, BASE_URL).toString();
  const deployRes = await fetch(deployUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ archive_path: archiveBasename })
  });

  if (!deployRes.ok) {
    throw new Error(`Deploy trigger failed: ${deployRes.status} ${await deployRes.text()}`);
  }

  const deployResult = await deployRes.json();
  console.log('Deploy response:', JSON.stringify(deployResult));

  // Clean up archive
  if (fs.existsSync(ARCHIVE_PATH)) {
    fs.unlinkSync(ARCHIVE_PATH);
    console.log(`Cleaned up ${ARCHIVE_PATH}`);
  }

  console.log('HOSTINGER DEPLOYMENT SUCCESSFUL!');
}

main().catch(err => {
  console.error('Deployment error:', err);
  process.exit(1);
});
