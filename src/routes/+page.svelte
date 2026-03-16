<script lang="ts">
	import EmberParticles from '$lib/components/EmberParticles.svelte';

	/* ── Data ── */

	const projects = [
		{
			name: 'Beartropy',
			logo: '/images/beartropy-logo.png',
			desc: 'A tall stack ecosystem of robust and beautiful components for your next Laravel project. SAML 2.0, data tables, roles & permissions, and more.',
			tags: ['Laravel', 'Livewire', 'Tailwind CSS'],
			url: 'https://beartropy.com'
		},
		{
			name: 'Vaxtly',
			logo: '/images/vaxtly-logo.png',
			desc: 'A local-first desktop API client. Test REST, WebSocket, and MCP endpoints — sync collections via Git, no cloud accounts required.',
			tags: ['Desktop', 'Open Source', 'MIT'],
			url: 'https://vaxtly.app'
		}
	];

	const links = [
		{ platform: 'github', handle: 'smithingdev', url: 'https://github.com/smithingdev' },
		{ platform: 'twitter', handle: '@smithingdev', url: 'https://x.com/smithingdev' },
		{ platform: 'email', handle: 'smithingdev@gmail.com', url: 'mailto:smithingdev@gmail.com' }
	];

	/* ── Nav scroll state ── */

	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 80;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	/* ── Intersection observer action ── */

	function inview(node: HTMLElement) {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					node.classList.add('in-view');
					observer.unobserve(node);
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<!-- ═══════════════ NAV ═══════════════ -->

<nav class="nav" class:scrolled>
	<a href="/" class="nav-logo">s<span class="ember">.</span>dev</a>
	<div class="nav-links">
		<a href="#projects">projects</a>
		<a href="#connect">connect</a>
	</div>
</nav>

<!-- ═══════════════ HERO ═══════════════ -->

<section class="hero">
	<div class="hero-grid" aria-hidden="true"></div>
	<div class="hero-glow" aria-hidden="true"></div>
	<EmberParticles />

	<div class="hero-content">
		<span class="hero-tag">// open source · developer tools</span>
		<h1 class="hero-title">smithing<span class="ember">.dev</span></h1>
		<p class="hero-tagline">Forging software, one commit at a time.</p>
		<div class="hero-actions">
			<a href="https://github.com/smithingdev" class="pill pill--filled">GitHub</a>
			<a href="#projects" class="pill">Projects</a>
			<a href="#connect" class="pill">Contact</a>
		</div>
	</div>

	<div class="scroll-hint" aria-hidden="true">
		<span>scroll</span>
		<div class="scroll-line"></div>
	</div>
</section>

<!-- ═══════════════ ABOUT ═══════════════ -->

<section class="about" use:inview>
	<p class="about-text">
		I build developer tools and ecosystems — from
		<a href="https://beartropy.com">Laravel component libraries</a> to
		<a href="https://vaxtly.app">local-first desktop apps</a>.
		Focused on developer experience, open source, and software that ships.
	</p>
</section>

<div class="divider" aria-hidden="true"></div>

<!-- ═══════════════ PROJECTS ═══════════════ -->

<section id="projects" class="section" use:inview>
	<header class="section-head">
		<span class="section-num">01</span>
		<h2>Projects</h2>
		<div class="section-rule"></div>
	</header>

	<div class="projects-grid">
		{#each projects as proj}
			<a href={proj.url} class="card" target="_blank" rel="noopener noreferrer">
				<div class="card-logo-wrap">
					<img src={proj.logo} alt="{proj.name} logo" class="card-logo" />
				</div>
				<h3>{proj.name}</h3>
				<p>{proj.desc}</p>
				<div class="card-footer">
					<div class="card-tags">
						{#each proj.tags as tag}
							<span>{tag}</span>
						{/each}
					</div>
					<span class="card-arrow">&rarr;</span>
				</div>
			</a>
		{/each}
	</div>
</section>

<!-- ═══════════════ CONNECT ═══════════════ -->

<section id="connect" class="section" use:inview>
	<header class="section-head">
		<span class="section-num">02</span>
		<h2>Connect</h2>
		<div class="section-rule"></div>
	</header>

	<p class="connect-intro">Have an idea? Let's talk.</p>

	<div class="connect-links">
		{#each links as l}
			<a href={l.url} class="connect-row">
				<span class="connect-arrow">&rsaquo;</span>
				<span class="connect-platform">{l.platform}</span>
				<span class="connect-handle">{l.handle}</span>
			</a>
		{/each}
	</div>
</section>

<!-- ═══════════════ FOOTER ═══════════════ -->

<footer class="footer">
	<span>&copy; {new Date().getFullYear()} smithing.dev</span>
	<span class="footer-sep">&mdash;</span>
	<span>forged with <a href="https://svelte.dev" class="footer-link">Svelte</a></span>
</footer>

<!-- ═══════════════ STYLES ═══════════════ -->

<style>
	/* ── Utilities ── */
	.ember {
		color: var(--ember);
	}

	/* ── Nav ── */
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 2rem;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		transition:
			background 0.35s,
			border-color 0.35s,
			backdrop-filter 0.35s;
		border-bottom: 1px solid transparent;
	}

	.nav.scrolled {
		background: rgba(10, 10, 10, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom-color: var(--border-subtle);
	}

	.nav-logo {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.1rem;
		letter-spacing: -0.02em;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-links a {
		color: var(--text-secondary);
		transition: color 0.2s;
	}

	.nav-links a:hover {
		color: var(--ember-light);
	}

	/* ── Hero ── */
	.hero {
		position: relative;
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-grid {
		position: absolute;
		inset: 0;
		background-image: linear-gradient(rgba(232, 101, 26, 0.025) 1px, transparent 1px),
			linear-gradient(90deg, rgba(232, 101, 26, 0.025) 1px, transparent 1px);
		background-size: 64px 64px;
		mask-image: radial-gradient(ellipse 70% 55% at 50% 50%, black 20%, transparent 100%);
		-webkit-mask-image: radial-gradient(
			ellipse 70% 55% at 50% 50%,
			black 20%,
			transparent 100%
		);
	}

	.hero-glow {
		position: absolute;
		bottom: -40%;
		left: 50%;
		translate: -50% 0;
		width: min(1100px, 140vw);
		height: 70%;
		background: radial-gradient(
			ellipse at center,
			rgba(232, 101, 26, 0.1) 0%,
			rgba(232, 101, 26, 0.04) 40%,
			transparent 70%
		);
		animation: glowPulse 7s ease-in-out infinite;
		pointer-events: none;
	}

	@keyframes glowPulse {
		0%,
		100% {
			opacity: 0.7;
		}
		50% {
			opacity: 1;
		}
	}

	.hero-content {
		position: relative;
		z-index: 2;
		text-align: center;
		padding: 0 1.5rem;
	}

	.hero-tag {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-tertiary);
		letter-spacing: 0.06em;
		margin-bottom: 1.25rem;
		opacity: 0;
		animation: fadeUp 0.7s 0.2s ease-out forwards;
	}

	.hero-title {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(2rem, 9vw, 8.5rem);
		line-height: 1;
		letter-spacing: -0.03em;
		padding-bottom: 0.3em;
		margin-bottom: 0.1em;
		opacity: 0;
		animation: fadeUp 0.8s 0.35s ease-out forwards;
	}

	.hero-title .ember {
		text-shadow:
			0 0 30px rgba(232, 101, 26, 0.4),
			0 0 80px rgba(232, 101, 26, 0.15);
	}

	.hero-tagline {
		font-family: var(--font-mono);
		font-size: clamp(0.85rem, 1.6vw, 1.05rem);
		font-weight: 300;
		color: var(--text-secondary);
		margin-bottom: 2.5rem;
		opacity: 0;
		animation: fadeUp 0.8s 0.55s ease-out forwards;
	}

	.hero-actions {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		flex-wrap: wrap;
		opacity: 0;
		animation: fadeUp 0.8s 0.75s ease-out forwards;
	}

	.pill {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		padding: 0.55rem 1.4rem;
		border: 1px solid var(--border);
		border-radius: 100px;
		color: var(--text-secondary);
		transition:
			border-color 0.25s,
			color 0.25s,
			background 0.25s;
	}

	.pill:hover {
		border-color: var(--ember);
		color: var(--ember-light);
	}

	.pill--filled {
		background: var(--ember);
		border-color: var(--ember);
		color: var(--bg-primary);
		font-weight: 500;
	}

	.pill--filled:hover {
		background: var(--ember-light);
		border-color: var(--ember-light);
		color: var(--bg-primary);
	}

	/* scroll hint */
	.scroll-hint {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		translate: -50% 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--text-tertiary);
		animation: scrollFade 3s 2s ease-in-out infinite;
	}

	.scroll-line {
		width: 1px;
		height: 32px;
		background: var(--text-tertiary);
		transform-origin: top;
		animation: scrollDraw 3s 2s ease-in-out infinite;
	}

	@keyframes scrollFade {
		0%,
		100% {
			opacity: 0.25;
		}
		50% {
			opacity: 0.7;
		}
	}

	@keyframes scrollDraw {
		0% {
			transform: scaleY(0);
			transform-origin: top;
		}
		45% {
			transform: scaleY(1);
			transform-origin: top;
		}
		55% {
			transform: scaleY(1);
			transform-origin: bottom;
		}
		100% {
			transform: scaleY(0);
			transform-origin: bottom;
		}
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* ── About ── */
	.about {
		position: relative;
		max-width: 640px;
		margin: 0 auto;
		padding: 4rem 2rem 3rem;
		text-align: center;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.7s ease-out,
			transform 0.7s ease-out;
	}

	:global(.about.in-view) {
		opacity: 1;
		transform: translateY(0);
	}

	.about-text {
		font-size: 1.1rem;
		line-height: 1.75;
		color: var(--text-secondary);
	}

	.about-text a {
		color: var(--text-primary);
		text-decoration-line: underline;
		text-decoration-color: var(--border);
		text-underline-offset: 3px;
		text-decoration-thickness: 1px;
		transition:
			text-decoration-color 0.2s,
			color 0.2s;
	}

	.about-text a:hover {
		color: var(--ember-light);
		text-decoration-color: var(--ember);
	}

	/* ── Divider ── */
	.divider {
		width: 48px;
		height: 1px;
		margin: 0 auto;
		background: linear-gradient(90deg, transparent, var(--ember), transparent);
		opacity: 0.3;
	}

	/* ── Sections (shared) ── */
	.section {
		max-width: 1100px;
		margin: 0 auto;
		padding: 4rem 2rem;
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.7s ease-out,
			transform 0.7s ease-out;
	}

	:global(.section.in-view) {
		opacity: 1;
		transform: translateY(0);
	}

	.section-head {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2.5rem;
	}

	.section-num {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--ember);
		letter-spacing: 0.08em;
	}

	.section-head h2 {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.6rem;
		letter-spacing: -0.02em;
		white-space: nowrap;
	}

	.section-rule {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, var(--border), transparent);
	}

	/* ── Projects ── */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 2rem;
		background: var(--bg-surface);
		border: 1px solid var(--border-subtle);
		border-radius: 12px;
		transition:
			border-color 0.3s,
			box-shadow 0.3s,
			transform 0.3s;
	}

	.card::before {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: 12px;
		padding: 1px;
		background: linear-gradient(
			160deg,
			rgba(232, 101, 26, 0.3),
			transparent 40%,
			transparent 60%,
			rgba(232, 101, 26, 0.1)
		);
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask-composite: exclude;
		-webkit-mask-composite: xor;
		opacity: 0;
		transition: opacity 0.4s;
		pointer-events: none;
	}

	.card:hover {
		border-color: var(--border-hover);
		box-shadow:
			0 8px 40px var(--ember-glow),
			0 0 0 1px rgba(232, 101, 26, 0.06);
		transform: translateY(-3px);
	}

	.card:hover::before {
		opacity: 1;
	}

	.card-logo-wrap {
		margin-bottom: 1.25rem;
		height: 48px;
		display: flex;
		align-items: flex-start;
	}

	.card-logo {
		height: 100%;
		width: auto;
		max-width: 160px;
		object-fit: contain;
	}

	.card h3 {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.2rem;
		letter-spacing: -0.01em;
		margin-bottom: 0.6rem;
	}

	.card p {
		font-size: 0.88rem;
		line-height: 1.6;
		color: var(--text-secondary);
		flex: 1;
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1.25rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-subtle);
	}

	.card-tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.card-tags span {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		padding: 0.2rem 0.6rem;
		border-radius: 4px;
		background: var(--bg-secondary);
		color: var(--text-tertiary);
		border: 1px solid var(--border-subtle);
	}

	.card-arrow {
		color: var(--text-tertiary);
		font-size: 1.1rem;
		transition:
			color 0.2s,
			transform 0.2s;
	}

	.card:hover .card-arrow {
		color: var(--ember);
		transform: translateX(4px);
	}

	/* ── Connect ── */
	.connect-intro {
		font-size: 1.05rem;
		color: var(--text-secondary);
		margin-bottom: 1.75rem;
	}

	.connect-links {
		display: flex;
		flex-direction: column;
		max-width: 420px;
	}

	.connect-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 0;
		border-bottom: 1px solid var(--border-subtle);
		font-family: var(--font-mono);
		font-size: 0.88rem;
		transition: color 0.2s;
	}

	.connect-row:first-child {
		border-top: 1px solid var(--border-subtle);
	}

	.connect-arrow {
		color: var(--text-tertiary);
		font-size: 1.2rem;
		transition:
			color 0.2s,
			transform 0.2s;
	}

	.connect-row:hover .connect-arrow {
		color: var(--ember);
		transform: translateX(3px);
	}

	.connect-platform {
		color: var(--text-tertiary);
		min-width: 72px;
	}

	.connect-handle {
		color: var(--text-secondary);
		transition: color 0.2s;
	}

	.connect-row:hover .connect-handle {
		color: var(--ember-light);
	}

	/* ── Footer ── */
	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		padding: 3rem 2rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--text-tertiary);
		border-top: 1px solid var(--border-subtle);
		max-width: 1100px;
		margin: 0 auto;
	}

	.footer-sep {
		opacity: 0.4;
	}

	.footer-link {
		color: var(--ember-dim);
		transition: color 0.2s;
	}

	.footer-link:hover {
		color: var(--ember);
	}

	/* ── Responsive ── */
	@media (max-width: 768px) {
		.nav {
			padding: 1rem 1.25rem;
		}

		.nav-links {
			gap: 1.25rem;
			font-size: 0.78rem;
		}

		.section {
			padding: 3rem 1.25rem;
		}

		.about {
			padding: 3rem 1.25rem 2.5rem;
		}

		.about-text {
			font-size: 1rem;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}

		.section-head {
			margin-bottom: 2rem;
		}
	}

	@media (max-width: 480px) {
		.nav-links {
			display: none;
		}

		.hero-actions {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
