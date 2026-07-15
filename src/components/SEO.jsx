import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url, type = "website", image, schema }) {
  const siteUrl = "https://abrar225.github.io/Abrar-Akhunji";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/images/myimg.webp`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />

      {/* Schema.org JSON-LD for AEO / Rich Snippets */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
