<script>
	let { children } = $props();
	import '../styles.css';
</script>

<div class="font-mono px-6 sm:px-36 lg:px-60 py-12">
	{@render children()}
</div>
