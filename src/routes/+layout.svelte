<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>smithing.dev — martin</title>
	<meta
		name="description"
		content="Martin — smithing.dev. Developer tools in the open, on fifteen years of large systems."
	/>
</svelte:head>

{@render children()}
