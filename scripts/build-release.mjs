import { execFileSync } from 'node:child_process';

const run = (script, env = process.env) =>
  execFileSync('npm', ['run', script], { stdio: 'inherit', env });

run('build', { ...process.env, VITE_SHOW_VERSIONS: process.env.PORTFOLIO_PUBLISH_VERSIONS === '1' ? '1' : '0' });
run('build:versions');
