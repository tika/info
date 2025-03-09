import { marked } from 'marked';

export interface BlogPost {
	slug: string;
	title: string;
	category: string;
	entry_date: string;
	content: string;
	html: string;
}

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com/repos/tika/thoughts/contents/posts';
const GITHUB_API_KEY = import.meta.env.VITE_GITHUB_API_KEY; // Make sure to set this in your .env file

/**
 * Fetches all blog posts from the GitHub repository
 */
export async function getAllPosts(): Promise<BlogPost[]> {
	try {
		// Fetch the list of files from the "posts" directory
		const response = await fetch(GITHUB_API_BASE, {
			headers: {
				Authorization: `token ${GITHUB_API_KEY}`,
				Accept: 'application/vnd.github.v3+json'
			}
		});

		if (!response.ok) {
			// Provide more detailed error logging
			const errorBody = await response.text();
			throw new Error(`Failed to fetch posts: ${response.statusText} - ${errorBody}`);
		}

		const files = await response.json();

		// Filter only markdown files
		const mdFiles = files.filter((file: any) => file.name.endsWith('.md') && file.type === 'file');

		// Fetch and parse each markdown file
		const posts = await Promise.all(
			mdFiles.map(async (file: any) => {
				const content = await fetchPostContent(file.download_url);
				return content;
			})
		);

		// Sort posts by date (newest first)
		return posts.sort(
			(a, b) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime()
		);
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return [];
	}
}

/**
 * Fetches a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	try {
		const posts = await getAllPosts();
		return posts.find((post) => post.slug === slug) || null;
	} catch (error) {
		console.error(`Error fetching post with slug ${slug}:`, error);
		return null;
	}
}

/**
 * Fetches and parses a markdown file from a URL
 */
async function fetchPostContent(url: string): Promise<BlogPost> {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Failed to fetch post content: ${response.statusText}`);
	}

	// Fetch raw text instead of using gray-matter directly
	const markdown = await response.text();

	// Manual frontmatter parsing
	const frontmatterMatch = markdown.match(/^---\n(.*?\n)---\n/s);
	const frontmatter: Record<string, string> = {};

	if (frontmatterMatch) {
		const frontmatterContent = frontmatterMatch[1];
		frontmatterContent.split('\n').forEach((line) => {
			const [key, value] = line.split(':').map((part) => part.trim());
			if (key && value) {
				frontmatter[key] = value.replace(/^['"]|['"]$/g, '');
			}
		});
	}

	// Remove frontmatter from content
	const content = markdown.replace(/^---\n.*?\n---\n/s, '').trim();

	// Generate slug from title
	const slug = frontmatter.title
		.toLowerCase()
		.replace(/[^\w\s]/g, '')
		.replace(/\s+/g, '-');

	// Convert markdown to HTML
	const html = marked.parse(content, { async: false }) as string;

	return {
		slug,
		title: frontmatter.title,
		category: frontmatter.category,
		entry_date: frontmatter.entry_date,
		content,
		html
	};
}
