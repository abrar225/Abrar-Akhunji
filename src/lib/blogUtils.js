import matter from 'gray-matter';
import { marked } from 'marked';

// Vite's feature to import multiple files. 'query: "?raw"' brings them in as strings.
const blogFiles = import.meta.glob('../content/blogs/*.md', { query: '?raw', eager: true });

export function getAllBlogs() {
  const blogs = [];
  
  for (const path in blogFiles) {
    const rawContent = blogFiles[path].default;
    // Parse frontmatter
    const { data, content } = matter(rawContent);
    
    // Extract slug from filename (e.g., ../content/blogs/my-post.md -> my-post)
    const slug = path.split('/').pop().replace('.md', '');
    
    blogs.push({
      slug,
      title: data.title || 'Untitled',
      date: data.date || '',
      description: data.description || '',
      tags: data.tags || [],
      author: data.author || 'Abrar Akhunji',
      content, // raw markdown body
    });
  }
  
  // Sort by date descending
  return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogBySlug(slug) {
  const blogs = getAllBlogs();
  return blogs.find((blog) => blog.slug === slug) || null;
}

export function markdownToHtml(markdown) {
  return marked(markdown);
}
