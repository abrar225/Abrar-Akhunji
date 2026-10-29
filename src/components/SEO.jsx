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

  // Static route documents provide no-JS metadata. Helmet owns those fields
  // after mount; remove the unmanaged copies rather than publishing duplicates.
  useEffect(() => {
    const selectors = ['link[rel="canonical"]', 'meta[name="title"]', 'meta[name="description"]', 'meta[name="keywords"]', 'meta[name="robots"]', 'meta[name="googlebot"]', 'meta[name="bingbot"]', 'meta[property^="og:"]', 'meta[name^="twitter:"]', 'meta[property^="article:"]'];
    document.head.querySelectorAll(selectors.map(selector => `${selector}:not([data-rh])`).join(',')).forEach(node => node.remove());
    if (path !== '/') document.head.querySelectorAll('link[hreflang]').forEach(node => node.remove());
  }, [path]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta data-rh="true" name="title" content={title} />
      <meta data-rh="true" name="description" content={description} />
      <meta data-rh="true" name="author" content="Abrar Akhunji" />
      {allKeywords.length > 0 && <meta data-rh="true" name="keywords" content={allKeywords.join(', ')} />}

      <meta data-rh="true"
        name="robots"
        content={noindex
          ? 'noindex, follow'
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}
      />
      {!noindex && <meta data-rh="true" name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />}
      {!noindex && <meta data-rh="true" name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />}
      {!noindex && <link data-rh="true" rel="canonical" href={canonical} />}

      <meta data-rh="true" property="og:type" content={type} />
      <meta data-rh="true" property="og:url" content={canonical} />
      <meta data-rh="true" property="og:title" content={title} />
      <meta data-rh="true" property="og:description" content={description} />
      <meta data-rh="true" property="og:image" content={imageUrl} />
      <meta data-rh="true" property="og:image:alt" content={imageAlt || title} />
      <meta data-rh="true" property="og:site_name" content={SITE_NAME} />
      <meta data-rh="true" property="og:locale" content="en_IN" />

      <meta data-rh="true" name="twitter:card" content="summary_large_image" />
      <meta data-rh="true" name="twitter:site" content="@Abrarakhunji" />
      <meta data-rh="true" name="twitter:creator" content="@Abrarakhunji" />
      <meta data-rh="true" name="twitter:url" content={canonical} />
      <meta data-rh="true" name="twitter:title" content={title} />
      <meta data-rh="true" name="twitter:description" content={description} />
      <meta data-rh="true" name="twitter:image" content={imageUrl} />
      <meta data-rh="true" name="twitter:image:alt" content={imageAlt || title} />

      {type === 'article' && publishedTime && (
        <meta data-rh="true" property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta data-rh="true" property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && articleSection && (
        <meta data-rh="true" property="article:section" content={articleSection} />
      )}
      {type === 'article' && keywords.map((tag) => (
        <meta data-rh="true" key={tag} property="article:tag" content={tag} />
      ))}

      {schemas.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
