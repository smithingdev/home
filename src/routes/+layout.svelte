<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n.svelte';
	let { children } = $props();

	$effect(() => {
		i18n.detect();
	});
</script>

<svelte:head>
	<title>{i18n.t.title}</title>
	<meta name="description" content={i18n.t.description} />
</svelte:head>

{@render children()}
