export const SITE_URL = 'https://abrarakhunji.com';
export const SITE_NAME = 'Abrar Akhunji';
export const AUTHOR_NAME = 'Abrar Akhunji';
export const AUTHOR_ROLE = 'AI/ML & Full-Stack Engineer';
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const BLOG_NAME = 'The Neural Log';

export const DEFAULT_DESCRIPTION =
  'Abrar Akhunji is an AI/ML and full-stack engineer in Ahmedabad, building computer vision, LLM and production web systems for teams in Ahmedabad, Gandhinagar, Bangalore and remotely.';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;

export function normalizePath(path = '/') {
  if (!path) return '/';
  const clean = String(path).split(/[?#]/)[0].replace(/\/{2,}/g, '/');
  if (clean === '/') return '/';
  return `/${clean.replace(/^\/+|\/+$/g, '')}/`;
}

export function absoluteUrl(path = '/') {
  return new URL(normalizePath(path), SITE_URL).toString();
}

export function postPath(slug) {
  return normalizePath(`/blog/${slug}`);
}

export function postUrl(slug) {
  return absoluteUrl(postPath(slug));
}

export function blogPath() {
  return '/blog/';
}

export function hirePath() {
  return '/hire/';
}

export const SOCIAL_LINKS = [
  'https://github.com/abrar225',
  'https://www.linkedin.com/in/abrar-akhunji/',
  'https://x.com/Abrarakhunji',
  'https://www.instagram.com/strick.9_/',
  'https://huggingface.co/abrar225',
];

export const LOCATIONS = ['Ahmedabad', 'Gandhinagar', 'Bangalore', 'Remote'];
