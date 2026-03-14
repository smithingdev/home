<script lang="ts">
	const particles = Array.from({ length: 28 }, (_, i) => ({
		id: i,
		size: 1.5 + Math.random() * 3,
		x: Math.random() * 100,
		duration: 5 + Math.random() * 8,
		delay: Math.random() * 10,
		opacity: 0.15 + Math.random() * 0.45,
		drift: -25 + Math.random() * 50,
		color: Math.random() > 0.4 ? '22, 78%, 51%' : '30, 100%, 63%'
	}));
</script>

<div class="embers" aria-hidden="true">
	{#each particles as p (p.id)}
		<div
			class="ember"
			style="
				--x: {p.x}%;
				--size: {p.size}px;
				--duration: {p.duration}s;
				--delay: {p.delay}s;
				--opacity: {p.opacity};
				--drift: {p.drift}px;
				--color: {p.color};
			"
		></div>
	{/each}
</div>

<style>
	.embers {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.ember {
		position: absolute;
		bottom: -10px;
		left: var(--x);
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		background: hsl(var(--color));
		box-shadow: 0 0 calc(var(--size) * 3) calc(var(--size) * 0.8) hsla(var(--color), 0.35);
		opacity: 0;
		animation: rise var(--duration) var(--delay) infinite ease-out;
	}

	@keyframes rise {
		0% {
			opacity: 0;
			transform: translateY(0) translateX(0) scale(1);
		}
		8% {
			opacity: var(--opacity);
		}
		85% {
			opacity: calc(var(--opacity) * 0.5);
		}
		100% {
			opacity: 0;
			transform: translateY(-100vh) translateX(var(--drift)) scale(0.4);
		}
	}
</style>
