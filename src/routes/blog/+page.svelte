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

<div class="blog-container">
	<h1 class="text-lg font-bold">Thoughts</h1>
	<p class="text-sm text-gray-600 mb-6">{data.posts.length} posts</p>

	{#if data.posts.length === 0}
		<div class="no-posts">
			<p>No posts found.</p>
		</div>
	{:else}
		<div class="posts-list space-y-6">
			{#each data.posts as post}
				<div class="post-item not-last:border-b border-gray-200 pb-4">
					<a href="/blog/{post.slug}" class="block">
						<h2 class="text-lg font-semibold hover:underline">
							<span class="text-gray-600">{post.category}</span>/{post.title}
						</h2>
						<div class="post-meta text-sm text-gray-600 mt-1">
							<span class="date">{formatDate(post.entry_date)}</span>
						</div>
					</a>
				</div>
			{/each}
		</div>
	{/if}

	<div class="mt-6">
		<a href="/" class="text-sm underline hover:opacity-50">← Back to home</a>
	</div>
</div>
