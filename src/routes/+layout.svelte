<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>smithing.dev</title>
	<meta name="description" content="Developer profile — forging software, one commit at a time." />
</svelte:head>

{@render children()}
