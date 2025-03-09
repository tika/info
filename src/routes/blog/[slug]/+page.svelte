<script lang="ts">
	let { data } = $props();

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="blog-post">
	<article>
		<header class="mb-8">
			<h1 class="text-3xl font-bold mb-2">{data.post.title}</h1>
			<div class="post-meta text-sm text-gray-600">
				<span class="date">{formatDate(data.post.entry_date)}</span>
				<span class="category ml-2 px-2 py-1 bg-gray-100 rounded-md">{data.post.category}</span>
			</div>
		</header>

		<div class="post-content prose max-w-none">
			{@html data.post.html}
		</div>
	</article>

	<div class="mt-8">
		<a href="/blog" class="text-sm underline hover:opacity-50">← Back to all posts</a>
	</div>
</div>

<style>
	.post-content :global(h1) {
		font-size: 1.8rem;
		font-weight: bold;
		margin-top: 1.5rem;
		margin-bottom: 1rem;
	}

	.post-content :global(h2) {
		font-size: 1.5rem;
		font-weight: bold;
		margin-top: 1.25rem;
		margin-bottom: 0.75rem;
	}

	.post-content :global(p) {
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	.post-content :global(img) {
		max-width: 100%;
		height: auto;
		margin: 1rem 0;
	}

	.post-content :global(a) {
		color: #3b82f6;
		text-decoration: underline;
	}

	.post-content :global(a:hover) {
		opacity: 0.8;
	}

	.post-content :global(ul),
	.post-content :global(ol) {
		margin-left: 1.5rem;
		margin-bottom: 1rem;
	}

	.post-content :global(li) {
		margin-bottom: 0.5rem;
	}

	.post-content :global(blockquote) {
		border-left: 4px solid #e5e7eb;
		padding-left: 1rem;
		font-style: italic;
		margin: 1rem 0;
	}

	.post-content :global(pre) {
		background-color: #f3f4f6;
		padding: 1rem;
		border-radius: 0.25rem;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.post-content :global(code) {
		background-color: #f3f4f6;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-family: monospace;
	}
</style>
