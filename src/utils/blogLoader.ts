// Dynamic blog loader utility to load markdown files from blogs directory
import { marked } from 'marked';

export interface BlogMetadata {
  id?: string;
  title: string;
  date: string;
  author: string;
  authorTitle: string;
  authorImage: string;
  category: string;
  tags: string[];
  image: string;
  excerpt: string;
  readTime: string;
  featured?: boolean;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogArticle extends BlogMetadata {
  content: string;
  slug: string;
}

// Configure marked for better HTML output
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Parse frontmatter from markdown
function parseFrontmatter(markdown: string): { metadata: BlogMetadata; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('Invalid frontmatter format');
  }

  const [, frontmatterStr, content] = match;
  
  // Simple YAML parser for our needs
  const metadata: any = {};
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      // Handle arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''));
      }
      // Handle boolean values
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      
      metadata[key.trim()] = value;
    }
  });

  return { metadata: metadata as BlogMetadata, content: content.trim() };
}

// Generate slug from filename
function generateSlug(filename: string): string {
  return filename.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

// Get all markdown files dynamically from blogs directory
function getMarkdownFiles(): Record<string, () => Promise<any>> {
  const files = {
    ...import.meta.glob('/src/content/blogs/*.md', { as: 'raw', eager: false })
  };
  return files;
}

// Cache for loaded articles to improve performance
let blogsCache: BlogArticle[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Load all blog articles from actual files
export async function loadAllBlogs(): Promise<BlogArticle[]> {
  // Check cache first
  const now = Date.now();
  if (blogsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return blogsCache;
  }

  const articles: BlogArticle[] = [];
  const files = getMarkdownFiles();
  
  if (Object.keys(files).length === 0) {
    console.warn('No markdown files found in /src/content/blogs/');
    return [];
  }
  
  for (const [filePath, loadFile] of Object.entries(files)) {
    try {
      const content = await loadFile();
      const filename = filePath.split('/').pop() || '';
      const { metadata, content: markdownContent } = parseFrontmatter(content);
      const htmlContent = await marked(markdownContent);
      const slug = generateSlug(filename);
      
      articles.push({
        ...metadata,
        content: htmlContent,
        slug,
        id: metadata.id || slug,
      });
    } catch (error) {
      console.error(`Error loading blog file ${filePath}:`, error);
    }
  }
  
  // Sort by date (newest first)
  const sortedArticles = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Update cache
  blogsCache = sortedArticles;
  cacheTimestamp = now;
  
  return sortedArticles;
}

// Clear cache function (useful for development)
export function clearBlogsCache(): void {
  blogsCache = null;
  cacheTimestamp = 0;
}

// Load a specific blog article by slug
export async function loadBlogArticle(slug: string): Promise<BlogArticle | null> {
  const articles = await loadAllBlogs();
  return articles.find(article => article.slug === slug) || null;
}

// Get featured blog articles
export async function getFeaturedBlogs(): Promise<BlogArticle[]> {
  const articles = await loadAllBlogs();
  return articles.filter(article => article.featured);
}

// Get recent blog articles (for homepage preview) - automatically sorted by date
export async function getRecentBlogs(limit: number = 3): Promise<BlogArticle[]> {
  const articles = await loadAllBlogs();
  return articles.slice(0, limit);
}

// Get unique categories from all articles
export async function getBlogCategories(): Promise<string[]> {
  const articles = await loadAllBlogs();
  const categories = [...new Set(articles.map(article => article.category))];
  return ['All', ...categories.sort()];
}

// Get unique tags from all articles
export async function getBlogTags(): Promise<string[]> {
  const articles = await loadAllBlogs();
  const allTags = articles.flatMap(article => article.tags || []);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags.sort();
}

// Filter articles by category
export async function getBlogsByCategory(category: string): Promise<BlogArticle[]> {
  const articles = await loadAllBlogs();
  if (category === 'All') return articles;
  return articles.filter(article => article.category === category);
}

// Filter articles by tag
export async function getBlogsByTag(tag: string): Promise<BlogArticle[]> {
  const articles = await loadAllBlogs();
  return articles.filter(article => article.tags?.includes(tag));
}

// Search blogs by title, excerpt, or content
export async function searchBlogs(query: string): Promise<BlogArticle[]> {
  const articles = await loadAllBlogs();
  const searchTerm = query.toLowerCase();
  
  return articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm) ||
    article.excerpt.toLowerCase().includes(searchTerm) ||
    article.content.toLowerCase().includes(searchTerm) ||
    article.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Get related blogs based on tags and category
export async function getRelatedBlogs(currentBlog: BlogArticle, limit: number = 3): Promise<BlogArticle[]> {
  const articles = await loadAllBlogs();
  
  // Filter out current blog
  const otherArticles = articles.filter(article => article.slug !== currentBlog.slug);
  
  // Score articles based on shared tags and category
  const scoredArticles = otherArticles.map(article => {
    let score = 0;
    
    // Same category gets higher score
    if (article.category === currentBlog.category) {
      score += 3;
    }
    
    // Shared tags get points
    const sharedTags = article.tags?.filter(tag => currentBlog.tags?.includes(tag)) || [];
    score += sharedTags.length * 2;
    
    return { article, score };
  });
  
  // Sort by score and return top results
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
}