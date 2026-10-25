import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  normalizePath,
} from '../lib/content/urls.js';

const DEFAULT_KEYWORDS = [
  'Abrar Akhunji',
  'AI/ML engineer Ahmedabad',
  'full-stack developer Ahmedabad',
  'computer vision engineer',
  'LLM engineer India',
  'hire AI engineer Gandhinagar',
  'full-stack developer Bangalore',
];

export default function SEO({
  title,
  description,
  path = '/',
  type = 'website',
  image,
  imageAlt,
  publishedTime,
  modifiedTime,
  keywords = [],
  schema,
  noindex = false,
  articleSection,
}) {
  const canonical = absoluteUrl(normalizePath(path));
  const imageUrl = image
    ? (/^https?:\/\//.test(image) ? image : new URL(image, SITE_URL).toString())
    : DEFAULT_OG_IMAGE;
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];
  const allKeywords = [...new Set([...keywords, ...DEFAULT_KEYWORDS])];

  // The static shell ships indexable robots tags. For a noindex route, make the
  // base tags restrictive too instead of leaving two conflicting directives.
  useEffect(() => {
    if (!noindex) return undefined;
    const baseTags = [...document.querySelectorAll(
      'meta[name="robots"]:not([data-rh]), meta[name="googlebot"]:not([data-rh]), meta[name="bingbot"]:not([data-rh])'
    )];
    const previous = baseTags.map((tag) => [tag, tag.getAttribute('content')]);
    baseTags.forEach((tag) => tag.setAttribute('content', 'noindex, follow'));
    return () => {
      previous.forEach(([tag, content]) => {
        if (content == null) tag.removeAttribute('content');
        else tag.setAttribute('content', content);
      });
    };
  }, [noindex]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content="Abrar Akhunji" />
      {allKeywords.length > 0 && <meta name="keywords" content={allKeywords.join(', ')} />}

      <meta
        name="robots"
        content={noindex
          ? 'noindex, follow'
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />
      {!noindex && <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />}
      {!noindex && <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />}
      {!noindex && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt || title} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Abrarakhunji" />
      <meta name="twitter:creator" content="@Abrarakhunji" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt || title} />

      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      {type === 'article' && keywords.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {schemas.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
