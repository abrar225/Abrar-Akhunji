<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Abrar Akhunji</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&amp;family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500&amp;family=Space+Grotesk:wght@500;600;700&amp;display=swap" rel="stylesheet" />
        <style>
          :root {
            --bg-canvas: #0F0E0C;
            --bg-surface: #17150F;
            --bg-elevated: #211D15;
            --text-fg: #F4F1EA;
            --text-muted: #8A8578;
            --text-faint: #57534A;
            --border-line: rgba(244, 241, 234, 0.12);
            --color-accent: #FF5A1F;
            --color-accent-soft: #FF7A45;
            --color-emerald: #10B981;
            --font-display: 'Space Grotesk', -apple-system, sans-serif;
            --font-serif: 'Fraunces', Georgia, serif;
            --font-mono: 'JetBrains Mono', monospace;
            --font-body: 'Inter', -apple-system, sans-serif;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            background-color: var(--bg-canvas);
            color: var(--text-fg);
            font-family: var(--font-body);
            line-height: 1.6;
            padding: 3rem 1.5rem 6rem;
            min-height: 100vh;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
          }

          /* Header */
          .header {
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--border-line);
          }

          .tag {
            display: inline-block;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--color-accent);
            background: rgba(255, 90, 31, 0.1);
            padding: 0.35rem 0.85rem;
            border-radius: 9999px;
            border: 1px solid rgba(255, 90, 31, 0.25);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 1.25rem;
          }

          .title {
            font-family: var(--font-serif);
            font-size: clamp(2rem, 4vw, 3.25rem);
            font-weight: 600;
            line-height: 1.15;
            color: var(--text-fg);
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
          }

          .title span {
            color: var(--color-accent);
          }

          .subtitle {
            font-size: 1.05rem;
            color: var(--text-muted);
            max-width: 720px;
            margin-bottom: 1.5rem;
          }

          /* Quick Navigation */
          .quick-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-top: 1.5rem;
          }

          .nav-btn {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--text-fg);
            background: var(--bg-surface);
            border: 1px solid var(--border-line);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
          }

          .nav-btn:hover {
            border-color: var(--color-accent);
            color: var(--color-accent);
            transform: translateY(-1px);
          }

          /* Stats Grid */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1rem;
            margin-bottom: 2.5rem;
          }

          .stat-card {
            background: var(--bg-surface);
            border: 1px solid var(--border-line);
            border-radius: 12px;
            padding: 1.25rem 1.5rem;
            position: relative;
            overflow: hidden;
          }

          .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
            opacity: 0.4;
          }

          .stat-label {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
          }

          .stat-value {
            font-family: var(--font-display);
            font-size: 2rem;
            font-weight: 700;
            color: var(--text-fg);
          }

          .stat-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.75rem;
            color: var(--color-emerald);
            background: rgba(16, 185, 129, 0.1);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            margin-top: 0.35rem;
          }

          /* Security Notice Banner */
          .security-banner {
            background: rgba(16, 185, 129, 0.08);
            border: 1px solid rgba(16, 185, 129, 0.25);
            border-radius: 10px;
            padding: 1rem 1.25rem;
            margin-bottom: 2.5rem;
            display: flex;
            align-items: center;
            gap: 0.85rem;
            font-size: 0.875rem;
            color: #d1fae5;
          }

          .security-banner svg {
            flex-shrink: 0;
            color: var(--color-emerald);
          }

          /* Search and Filter Bar */
          .filter-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            flex-wrap: wrap;
            margin-bottom: 1.5rem;
          }

          .search-input {
            background: var(--bg-surface);
            border: 1px solid var(--border-line);
            color: var(--text-fg);
            font-family: var(--font-body);
            font-size: 0.9rem;
            padding: 0.65rem 1rem;
            border-radius: 8px;
            min-width: 280px;
            outline: none;
            transition: border-color 0.2s;
          }

          .search-input:focus {
            border-color: var(--color-accent);
          }

          .search-input::placeholder {
            color: var(--text-faint);
          }

          /* Table Container */
          .table-container {
            background: var(--bg-surface);
            border: 1px solid var(--border-line);
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          }

          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 0.875rem;
          }

          thead {
            background: var(--bg-elevated);
            border-bottom: 1px solid var(--border-line);
          }

          th {
            padding: 1rem 1.25rem;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            font-weight: 500;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }

          tbody tr {
            border-bottom: 1px solid rgba(244, 241, 234, 0.05);
            transition: background 0.15s ease;
          }

          tbody tr:hover {
            background: rgba(255, 90, 31, 0.03);
          }

          tbody tr:last-child {
            border-bottom: none;
          }

          td {
            padding: 1rem 1.25rem;
            vertical-align: middle;
          }

          .url-cell {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .url-link {
            color: var(--text-fg);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.925rem;
            transition: color 0.15s;
            word-break: break-all;
          }

          .url-link:hover {
            color: var(--color-accent);
          }

          .url-path {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-muted);
          }

          .badge {
            display: inline-block;
            font-family: var(--font-mono);
            font-size: 0.7rem;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }

          .badge-core {
            background: rgba(59, 91, 219, 0.15);
            color: #93c5fd;
            border: 1px solid rgba(59, 91, 219, 0.3);
          }

          .badge-blog {
            background: rgba(255, 90, 31, 0.12);
            color: var(--color-accent);
            border: 1px solid rgba(255, 90, 31, 0.25);
          }

          .priority-meter {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-fg);
          }

          .priority-bar {
            width: 48px;
            height: 6px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            overflow: hidden;
            display: inline-block;
          }

          .priority-fill {
            height: 100%;
            background: var(--color-accent);
            border-radius: 3px;
          }

          .date-cell {
            font-family: var(--font-mono);
            font-size: 0.8rem;
            color: var(--text-muted);
            white-space: nowrap;
          }

          .freq-cell {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-muted);
            text-transform: lowercase;
          }

          .image-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: #a7f3d0;
            background: rgba(16, 185, 129, 0.12);
            padding: 0.25rem 0.55rem;
            border-radius: 4px;
            border: 1px solid rgba(16, 185, 129, 0.25);
            text-decoration: none;
          }

          .image-badge:hover {
            background: rgba(16, 185, 129, 0.2);
          }

          /* Footer */
          .footer {
            margin-top: 3.5rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border-line);
            text-align: center;
            font-size: 0.85rem;
            color: var(--text-muted);
          }

          .footer a {
            color: var(--color-accent);
            text-decoration: none;
          }

          .footer a:hover {
            text-decoration: underline;
          }

          @media (max-width: 768px) {
            body {
              padding: 2rem 1rem 4rem;
            }
            .hide-mobile {
              display: none;
            }
            th, td {
              padding: 0.75rem 0.85rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <header class="header">
            <div class="tag">( System Sitemap Index )</div>
            <h1 class="title">Index of <span>abrarakhunji.com</span></h1>
            <p class="subtitle">
              Verified XML sitemap index generated for Googlebot, Bingbot, PerplexityBot, and technical inspection. 
              Provides complete canonical discovery for all production routes and multimodal image assets.
            </p>

            <div class="quick-nav">
              <a href="/" class="nav-btn">← Portfolio Home</a>
              <a href="/blog" class="nav-btn">The Neural Log (Blog)</a>
              <a href="/llms.txt" class="nav-btn">AI Guide (llms.txt)</a>
              <a href="/llms-full.txt" class="nav-btn">Full Archive (llms-full.txt)</a>
              <a href="/robots.txt" class="nav-btn">Robots Policy</a>
            </div>
          </header>

          <!-- Security Verification Banner -->
          <div class="security-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
            <div>
              <strong>Security &amp; Privacy Verified:</strong>
              This sitemap exposes zero internal API routes, no backend scripts, no server configurations, and no staging paths. All 
              <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> listed URLs are verified, public-facing canonical endpoints.
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total Indexed URLs</div>
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
              <div class="stat-badge">● 100% Canonical</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Technical Deep Dives</div>
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/blog/')])"/></div>
              <div class="stat-badge">● Evergreen Slugs</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Multimodal Assets</div>
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url/image:image)"/></div>
              <div class="stat-badge">● Google Image Ext</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Core Pages</div>
              <div class="stat-value"><xsl:value-of select="count(sitemap:urlset/sitemap:url[not(contains(sitemap:loc, '/blog/'))])"/></div>
              <div class="stat-badge">● Daily Frequency</div>
            </div>
          </div>

          <!-- Filter and Search Bar -->
          <div class="filter-bar">
            <input type="text" id="sitemapSearch" class="search-input" placeholder="Search by title or URL slug..." onkeyup="filterSitemap()" />
            <div style="font-family:var(--font-mono);font-size:0.8rem;color:var(--text-muted);">
              Showing <span id="visibleCount" style="color:var(--color-accent);font-weight:600;"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span> URLs
            </div>
          </div>

          <!-- Table Container -->
          <div class="table-container">
            <table id="sitemapTable">
              <thead>
                <tr>
                  <th>Route / Title</th>
                  <th class="hide-mobile">Type</th>
                  <th class="hide-mobile">Frequency</th>
                  <th>Priority</th>
                  <th>Image</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:variable name="loc" select="sitemap:loc"/>
                  <xsl:variable name="priority" select="sitemap:priority"/>
                  <xsl:variable name="lastmod" select="sitemap:lastmod"/>
                  <xsl:variable name="changefreq" select="sitemap:changefreq"/>
                  <xsl:variable name="imageUrl" select="image:image/image:loc"/>
                  <xsl:variable name="imageTitle" select="image:image/image:title"/>

                  <tr>
                    <td>
                      <div class="url-cell">
                        <a href="{$loc}" class="url-link" target="_blank">
                          <xsl:choose>
                            <xsl:when test="string-length($imageTitle) &gt; 0">
                              <xsl:value-of select="$imageTitle"/>
                            </xsl:when>
                            <xsl:when test="$loc = 'https://abrarakhunji.com/'">
                              Abrar Akhunji — Senior AI Systems &amp; Full-Stack Portfolio
                            </xsl:when>
                            <xsl:when test="$loc = 'https://abrarakhunji.com/blog'">
                              The Neural Log — Technical Deep Dives Directory
                            </xsl:when>
                            <xsl:otherwise>
                              <xsl:value-of select="$loc"/>
                            </xsl:otherwise>
                          </xsl:choose>
                        </a>
                        <span class="url-path"><xsl:value-of select="$loc"/></span>
                      </div>
                    </td>
                    <td class="hide-mobile">
                      <xsl:choose>
                        <xsl:when test="contains($loc, '/blog/')">
                          <span class="badge badge-blog">Deep Dive</span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="badge badge-core">Core</span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="hide-mobile freq-cell">
                      <xsl:value-of select="$changefreq"/>
                    </td>
                    <td>
                      <div class="priority-meter">
                        <span class="priority-bar">
                          <span class="priority-fill" style="width: {number($priority) * 100}%"></span>
                        </span>
                        <span><xsl:value-of select="$priority"/></span>
                      </div>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="string-length($imageUrl) &gt; 0">
                          <a href="{$imageUrl}" target="_blank" class="image-badge">
                            📷 View
                          </a>
                        </xsl:when>
                        <xsl:otherwise>
                          <span style="color:var(--text-faint);font-size:0.75rem;">—</span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                    <td class="date-cell">
                      <xsl:value-of select="$lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <!-- Footer -->
          <footer class="footer">
            <p>
              Designed and maintained by <a href="/">Abrar Akhunji</a> • AI &amp; Systems Engineering. 
              Validated against Schema.org and Sitemaps.org standards.
            </p>
          </footer>
        </div>

        <script>
          function filterSitemap() {
            var input = document.getElementById('sitemapSearch');
            var filter = input.value.toLowerCase();
            var table = document.getElementById('sitemapTable');
            var tr = table.getElementsByTagName('tr');
            var visible = 0;

            for (var i = 1; i &lt; tr.length; i++) {
              var td = tr[i].getElementsByTagName('td')[0];
              if (td) {
                var text = td.textContent || td.innerText;
                if (text.toLowerCase().indexOf(filter) &gt; -1) {
                  tr[i].style.display = '';
                  visible++;
                } else {
                  tr[i].style.display = 'none';
                }
              }
            }
            document.getElementById('visibleCount').innerText = visible;
          }
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
