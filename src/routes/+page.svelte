<script lang="ts">
	/* ─────────────────────────────────────────────
	   smithing.dev — cold steel, warm hands.
	   The page rests matte and near-monochrome.
	   Whatever you touch heats instantly and cools
	   slowly: the name ignites letter by letter
	   under the cursor, links and layers hold your
	   warmth for a moment after you leave.
	   ───────────────────────────────────────────── */

	/* ── Content ── */

	const NAME = 'smithing.dev';

	const works = [
		{
			name: 'beartropy',
			host: 'beartropy.com',
			desc: 'A tall-stack ecosystem of robust, beautiful components for your next Laravel project — SAML 2.0, data tables, roles & permissions, and more.',
			meta: 'laravel · livewire · tailwind',
			url: 'https://beartropy.com'
		},
		{
			name: 'vaxtly',
			host: 'vaxtly.app',
			desc: 'A local-first desktop API client. Test REST, WebSocket, and MCP endpoints — sync collections over Git, no cloud accounts required.',
			meta: 'desktop · open source · mit',
			url: 'https://vaxtly.app'
		}
	];

	const EMAIL = 'smithingdev@gmail.com';

	/* The machine — six hallmark punches wired to a common bus.
	   Each mark certifies one part of the corporate work. */
	const punches = [
		{
			label: 'identity systems & idps',
			cx: 130,
			above: true,
			d: 'M12 3 L19 6 V11 C19 16 16 19.5 12 21 C8 19.5 5 16 5 11 V6 Z M12 9.5 a1.5 1.5 0 1 0 0.01 0 M12 12.5 v3'
		},
		{
			label: 'apis & integrations',
			cx: 278,
			above: false,
			d: 'M8 7 L3 12 L8 17 M16 7 L21 12 L16 17'
		},
		{
			label: 'automation platforms',
			cx: 426,
			above: true,
			d: 'M12 9 a3 3 0 1 0 0.01 0 M12 2 v3 M12 19 v3 M2 12 h3 M19 12 h3 M4.9 4.9 L7 7 M17 17 L19.1 19.1 M19.1 4.9 L17 7 M7 17 L4.9 19.1'
		},
		{
			label: 'devops & devsecops',
			cx: 574,
			above: false,
			d: 'M12 12 C10.5 9.5 9 8.5 7 8.5 C4.5 8.5 3 10 3 12 C3 14 4.5 15.5 7 15.5 C9 15.5 10.5 14.5 12 12 C13.5 9.5 15 8.5 17 8.5 C19.5 8.5 21 10 21 12 C21 14 19.5 15.5 17 15.5 C15 15.5 13.5 14.5 12 12'
		},
		{
			label: 'mcp servers & tooling',
			cx: 722,
			above: true,
			d: 'M14 4 L20 10 L17 13 L11 7 Z M12.5 8.5 L4 17 L4 20 L7 20 L15.5 11.5'
		},
		{
			label: 'dev & automation team — led',
			cx: 870,
			above: false,
			d: 'M12 5 a2.5 2.5 0 1 0 0.01 0 M7 13.5 a2.5 2.5 0 1 0 0.01 0 M17 13.5 a2.5 2.5 0 1 0 0.01 0'
		}
	];

	/* ── Heat ramp: cold steel → red → cherry → orange → amber → near-white ── */
	const RAMP: [number, [number, number, number]][] = [
		[0.0, [122, 112, 98]],
		[0.22, [124, 42, 16]],
		[0.45, [193, 63, 18]],
		[0.68, [236, 122, 38]],
		[0.86, [247, 181, 90]],
		[1.0, [252, 233, 196]]
	];

	function heatColor(h: number): string {
		for (let i = 0; i < RAMP.length - 1; i++) {
			const [a, ca] = RAMP[i];
			const [b, cb] = RAMP[i + 1];
			if (h >= a && h <= b) {
				const t = (h - a) / (b - a);
				const r = Math.round(ca[0] + (cb[0] - ca[0]) * t);
				const g = Math.round(ca[1] + (cb[1] - ca[1]) * t);
				const bl = Math.round(ca[2] + (cb[2] - ca[2]) * t);
				return `rgb(${r} ${g} ${bl})`;
			}
		}
		return 'rgb(122 112 98)';
	}

	/* ── Per-letter heat simulation — every .lt on the page is heatable steel ── */
	$effect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const letterEls = Array.from(document.querySelectorAll<HTMLElement>('.lt'));
		const heats = new Array<number>(letterEls.length).fill(0);
		let raf = 0;
		let last = 0;
		let active = false;

		const apply = () => {
			for (let i = 0; i < letterEls.length; i++) {
				const el = letterEls[i];
				if (!el) continue;
				const h = heats[i];
				if (h < 0.01) {
					el.style.color = '';
					el.style.textShadow = '';
					el.style.transform = '';
				} else {
					el.style.color = heatColor(h);
					el.style.textShadow =
						h > 0.25 ? `0 0 ${Math.round(38 * h)}px rgba(236, 130, 50, ${(0.3 * h).toFixed(2)})` : '';
					el.style.transform = `translateY(${(-0.035 * h).toFixed(3)}em)`;
				}
			}
		};

		const loop = (t: number) => {
			const dt = last ? t - last : 16;
			last = t;
			const decay = Math.exp(-dt / 1600); // slow cool
			let any = false;
			for (let i = 0; i < heats.length; i++) {
				heats[i] *= decay;
				if (heats[i] > 0.01) any = true;
				else heats[i] = 0;
			}
			apply();
			if (any) raf = requestAnimationFrame(loop);
			else {
				active = false;
				last = 0;
			}
		};

		const ignite = () => {
			if (!active) {
				active = true;
				last = 0;
				raf = requestAnimationFrame(loop);
			}
		};

		const onMove = (e: MouseEvent) => {
			for (let i = 0; i < letterEls.length; i++) {
				const el = letterEls[i];
				if (!el) continue;
				const r = el.getBoundingClientRect();
				const dx = e.clientX - (r.left + r.width / 2);
				const dy = e.clientY - (r.top + r.height / 2);
				const s = Math.max(70, r.width); // heat radius scales with letter size
				const add = Math.exp(-(dx * dx + dy * dy) / (2 * s * s));
				if (add > heats[i]) heats[i] = Math.min(1, add);
			}
			ignite();
		};

		let sweepTimer: ReturnType<typeof setInterval> | undefined;

		if (matchMedia('(hover: none)').matches) {
			/* Touch devices: an unseen hand sweeps the name instead */
			const sweep = () => {
				for (let i = 0; i < NAME.length; i++) {
					setTimeout(() => {
						heats[i] = 1;
						ignite();
					}, i * 120);
				}
			};
			const first = setTimeout(sweep, 900);
			sweepTimer = setInterval(sweep, 6000);
			return () => {
				clearTimeout(first);
				clearInterval(sweepTimer);
				cancelAnimationFrame(raf);
			};
		}

		window.addEventListener('mousemove', onMove, { passive: true });
		return () => {
			window.removeEventListener('mousemove', onMove);
			cancelAnimationFrame(raf);
		};
	});

	/* ── Reveal on enter ── */
	function inview(node: HTMLElement) {
		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					node.classList.add('lit');
					io.unobserve(node);
				}
			},
			{ threshold: 0.12 }
		);
		io.observe(node);
		return { destroy: () => io.disconnect() };
	}
</script>

<!-- ═══════════ NAV ═══════════ -->
<nav class="nav">
	<a href="/" class="brand">smithing<span class="brand-tld">.dev</span></a>
	<div class="nav-links">
		<a href="#open">open</a>
		<a href="#years">years</a>
		<a href="#word">word</a>
	</div>
</nav>

<!-- ═══════════ HERO — the name is the material ═══════════ -->
<header class="hero">
	<p class="hero-eyebrow">martin — the smith behind it</p>

	<h1 class="plate" aria-label={NAME}>
		{#each NAME.split('') as ch}
			<span class="lt" aria-hidden="true">{ch}</span>
		{/each}
	</h1>

	<p class="hero-line">
		I make developer tools in the open — with fifteen years of large, security-critical systems
		underneath.
	</p>

	<div class="hero-actions">
		<a href="https://github.com/smithingdev" class="btn btn--solid">GitHub</a>
		<a href="#open" class="btn">Open source</a>
	</div>
</header>

<!-- ═══════════ IN THE OPEN ═══════════ -->
<section id="open" class="block" use:inview>
	<div class="block-head">
		<h2>in the open</h2>
		<span class="block-rule"></span>
	</div>

	<div class="forged">
		{#each works as w}
			<a href={w.url} class="frow" target="_blank" rel="noopener noreferrer">
				<div class="frow-main">
					<h3 class="frow-name" aria-label={w.name}>
						{#each w.name.split('') as ch}<span class="lt" aria-hidden="true">{ch}</span>{/each}
					</h3>
					<p>{w.desc}</p>
				</div>
				<div class="frow-side">
					<span class="frow-host">{w.host} ↗</span>
					<span class="frow-meta">{w.meta}</span>
				</div>
			</a>
		{/each}
		<a class="frow frow--more" href="https://github.com/smithingdev" target="_blank" rel="noopener noreferrer">
			<span class="more-text">more in the forge</span>
			<span class="frow-host">github.com/smithingdev ↗</span>
		</a>
	</div>
</section>

<!-- ═══════════ YEARS — the machine ═══════════ -->
<section id="years" class="block" use:inview>
	<div class="block-head">
		<h2>fifteen years, folded in</h2>
		<span class="block-rule"></span>
	</div>

	<p class="years-note">
		Fifteen years inside a large company, focused on cybersecurity — today leading the development
		&amp; automation team of its cybersecurity division. It's the work nobody sees: the systems
		that decide who gets in, measured in decades, not sprints. All of it one machine; these are
		the parts.
	</p>

	<div
		class="machine"
		role="img"
		aria-label="Six hallmark punches wired to a common bus: identity systems and IdPs, APIs and integrations, automation platforms, DevOps and DevSecOps, MCP servers and tooling, and a development and automation team, led"
	>
		<svg viewBox="0 0 1000 320" aria-hidden="true">
			<line class="bus" x1="50" y1="160" x2="950" y2="160" />
			<rect class="term" x="44" y="154" width="12" height="12" />
			<rect class="term" x="944" y="154" width="12" height="12" />

			{#each punches as p}
				{@const iconY = p.above ? 58 : 214}
				{@const stubY1 = p.above ? iconY + 50 : 160}
				{@const stubY2 = p.above ? 160 : iconY - 2}
				{@const labelY = p.above ? 36 : 302}
				<g class="pnode">
					<line class="stub" x1={p.cx} y1={stubY1} x2={p.cx} y2={stubY2} />
					<circle class="joint" cx={p.cx} cy="160" r="3.5" />
					<g transform="translate({p.cx - 24}, {iconY}) scale(2)">
						<path class="punch" d={p.d} />
					</g>
					<text class="punch-label" x={p.cx} y={labelY}>{p.label}</text>
				</g>
			{/each}
		</svg>

		<!-- narrow screens: the bus goes vertical -->
		<div class="machine-m" aria-hidden="true">
			{#each punches as p}
				<div class="m-row">
					<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<path d={p.d} />
					</svg>
					<span>{p.label}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ═══════════ SEND WORD ═══════════ -->
<section id="word" class="block" use:inview>
	<div class="block-head">
		<h2>send word</h2>
		<span class="block-rule"></span>
	</div>
	<p class="word-intro">A commission, an idea, or just to talk shop — the forge is open.</p>

	<a class="word-mail" href="mailto:{EMAIL}" aria-label={EMAIL}>
		{#each EMAIL.split('') as ch}<span class="lt" aria-hidden="true">{ch}</span>{/each}
	</a>

	<p class="word-else">
		elsewhere —
		<a href="https://github.com/smithingdev" target="_blank" rel="noopener noreferrer">github ↗</a>
		<span class="sep">·</span>
		<a href="https://x.com/smithingdev" target="_blank" rel="noopener noreferrer">x @smithingdev ↗</a>
	</p>
</section>

<!-- ═══════════ FOOTER ═══════════ -->
<footer class="foot">
	<span>© {new Date().getFullYear()} smithing.dev</span>
	<span class="foot-dot">·</span>
	<span>made by martin</span>
</footer>

<style>
	/* ═══════════ NAV ═══════════ */
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 80;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.1rem 2rem;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.04em;
		background: color-mix(in oklab, var(--ground) 82%, transparent);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--line);
	}

	.brand {
		font-weight: 600;
		color: var(--ink);
	}
	.brand-tld {
		color: var(--ember);
	}

	.nav-links {
		display: flex;
		gap: 1.6rem;
	}
	/* heats fast, cools slow */
	.nav-links a {
		color: var(--ink-2);
		transition: color 1.8s ease;
	}
	.nav-links a:hover,
	.nav-links a:focus-visible {
		color: var(--ember);
		transition: color 0.12s;
	}

	/* ═══════════ HERO ═══════════ */
	.hero {
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 7rem 2rem 4rem;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}

	.hero-eyebrow {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-3);
		margin-bottom: 1.2rem;
		opacity: 0;
		animation: settle 0.8s 0.15s ease-out forwards;
	}

	.plate {
		font-family: var(--font-display);
		font-weight: 900;
		font-stretch: 122%;
		font-size: clamp(2rem, 9.2vw, 8.5rem);
		line-height: 0.88;
		letter-spacing: -0.025em;
		text-transform: lowercase;
		user-select: none;
		margin-bottom: 2.2rem;
		opacity: 0;
		animation: settle 1s 0.3s ease-out forwards;
	}

	.lt {
		display: inline-block;
		color: var(--steel);
		will-change: color, transform;
	}

	.hero-line {
		max-width: 44ch;
		font-size: clamp(1rem, 2vw, 1.3rem);
		color: var(--ink-2);
		margin-bottom: 2.2rem;
		opacity: 0;
		animation: settle 0.8s 0.5s ease-out forwards;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		opacity: 0;
		animation: settle 0.8s 0.65s ease-out forwards;
	}

	.btn {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.04em;
		padding: 0.6rem 1.3rem;
		border: 1px solid var(--line-hi);
		color: var(--ink);
		transition:
			border-color 1.8s ease,
			color 1.8s ease;
	}
	.btn:hover,
	.btn:focus-visible {
		border-color: var(--ember);
		color: var(--ember);
		transition:
			border-color 0.12s,
			color 0.12s;
	}
	.btn--solid {
		background: var(--ember);
		border-color: var(--ember);
		color: var(--ground);
		font-weight: 600;
	}
	.btn--solid:hover,
	.btn--solid:focus-visible {
		background: transparent;
		color: var(--ember);
	}

	/* ═══════════ BLOCKS (shared) ═══════════ */
	.block {
		max-width: 1080px;
		margin: 0 auto;
		padding: 5rem 2rem;
		opacity: 0;
		transform: translateY(26px);
		transition:
			opacity 0.7s ease-out,
			transform 0.7s ease-out;
	}
	:global(.block.lit) {
		opacity: 1;
		transform: translateY(0);
	}

	.block-head {
		display: flex;
		align-items: center;
		gap: 1.1rem;
		margin-bottom: 2.4rem;
	}
	.block-head h2 {
		font-family: var(--font-display);
		font-weight: 800;
		font-stretch: 112%;
		font-size: 1.5rem;
		letter-spacing: 0.01em;
		white-space: nowrap;
	}
	.block-rule {
		flex: 1;
		height: 1px;
		background: linear-gradient(90deg, var(--line-hi), transparent);
	}

	/* ═══════════ IN THE OPEN — forged ledger ═══════════ */
	.forged {
		display: flex;
		flex-direction: column;
	}

	.frow {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 2.5rem;
		padding: 2.2rem 0;
		border-top: 1px solid var(--line);
		transition: border-color 2.4s ease;
	}
	.frow:last-child {
		border-bottom: 1px solid var(--line);
	}
	.frow:hover,
	.frow:focus-visible {
		border-top-color: var(--ember);
		transition: border-color 0.12s;
	}

	.frow-name {
		font-family: var(--font-display);
		font-weight: 900;
		font-stretch: 116%;
		font-size: clamp(2rem, 4.6vw, 3.4rem);
		line-height: 1;
		letter-spacing: -0.02em;
		text-transform: lowercase;
		margin-bottom: 0.7rem;
		user-select: none;
	}

	.frow-main p {
		font-size: 0.95rem;
		line-height: 1.65;
		color: var(--ink-2);
		max-width: 54ch;
	}

	.frow-side {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.5rem;
		flex-shrink: 0;
		padding-top: 0.6rem;
		font-family: var(--font-mono);
		text-align: right;
	}

	.frow-host {
		font-size: 0.72rem;
		letter-spacing: 0.05em;
		color: var(--ink-2);
		transition: color 2.2s ease;
	}
	.frow:hover .frow-host,
	.frow:focus-visible .frow-host {
		color: var(--ember);
		transition: color 0.12s;
	}

	.frow-meta {
		font-size: 0.62rem;
		letter-spacing: 0.1em;
		color: var(--ink-3);
	}

	.frow--more {
		align-items: center;
		padding: 1.5rem 0;
	}
	.more-text {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		color: var(--ink-3);
		transition: color 2.2s ease;
	}
	.frow--more:hover .more-text {
		color: var(--ink);
		transition: color 0.12s;
	}

	/* ═══════════ YEARS — the strata ═══════════ */
	.years-note {
		max-width: 62ch;
		font-size: 1.05rem;
		line-height: 1.7;
		color: var(--ink-2);
		margin-bottom: 2.4rem;
	}

	.machine {
		border: 1px solid var(--line);
		background: var(--panel);
		padding: 1.4rem;
	}

	.machine > svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.bus {
		stroke: var(--line-hi);
		stroke-width: 1.5;
	}

	.term {
		fill: none;
		stroke: var(--line-hi);
		stroke-width: 1.5;
	}

	.pnode .stub {
		stroke: var(--line-hi);
		stroke-width: 1.2;
		transition: stroke 2.2s ease;
	}
	.pnode .joint {
		fill: var(--line-hi);
		transition: fill 2.2s ease;
	}
	.pnode .punch {
		fill: none;
		stroke: var(--ink-3);
		stroke-width: 1.5;
		stroke-linecap: round;
		stroke-linejoin: round;
		transition:
			stroke 2.2s ease,
			filter 2.2s ease;
	}
	.pnode .punch-label {
		font-family: var(--font-mono);
		font-size: 11.5px;
		letter-spacing: 0.08em;
		fill: var(--ink-3);
		text-anchor: middle;
		transition: fill 2s ease;
	}

	.pnode:hover .stub {
		stroke: var(--ember);
		transition: stroke 0.12s;
	}
	.pnode:hover .joint {
		fill: var(--ember);
		transition: fill 0.12s;
	}
	.pnode:hover .punch {
		stroke: var(--ember);
		filter: drop-shadow(0 0 6px rgba(184, 85, 31, 0.45));
		transition:
			stroke 0.12s,
			filter 0.12s;
	}
	.pnode:hover .punch-label {
		fill: var(--ink);
		transition: fill 0.12s;
	}

	/* vertical-bus fallback, hidden on wide screens */
	.machine-m {
		display: none;
	}

	/* ═══════════ SEND WORD ═══════════ */
	.word-intro {
		font-size: 1.05rem;
		color: var(--ink-2);
	}

	/* the last piece of steel on the page */
	.word-mail {
		display: block;
		width: fit-content;
		font-family: var(--font-display);
		font-weight: 900;
		font-stretch: 114%;
		font-size: clamp(1.35rem, 4.9vw, 4rem);
		line-height: 1.05;
		letter-spacing: -0.015em;
		margin: 1.8rem 0 2rem;
	}

	.word-else {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		color: var(--ink-3);
	}
	.word-else .sep {
		margin: 0 0.5rem;
	}
	.word-else a {
		color: var(--ink-2);
		transition: color 2.2s ease;
	}
	.word-else a:hover,
	.word-else a:focus-visible {
		color: var(--ember);
		transition: color 0.12s;
	}

	/* ═══════════ FOOTER ═══════════ */
	.foot {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.75rem;
		padding: 3rem 2rem;
		font-family: var(--font-mono);
		font-size: 0.64rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-3);
		border-top: 1px solid var(--line);
	}
	.foot-dot {
		color: var(--line-hi);
	}

	/* ═══════════ MOTION ═══════════ */
	@keyframes settle {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-eyebrow,
		.plate,
		.hero-line,
		.hero-actions {
			opacity: 1;
			animation: none;
		}
		.block {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}

	/* ═══════════ RESPONSIVE ═══════════ */
	@media (max-width: 900px) {
		.hero {
			padding: 6.5rem 1.5rem 4rem;
		}
		.plate {
			font-stretch: 108%;
		}
		.block {
			padding: 4rem 1.5rem;
		}
		.frow {
			flex-direction: column;
			gap: 1rem;
		}
		.frow-side {
			flex-direction: row;
			align-items: baseline;
			gap: 1.2rem;
			padding-top: 0;
			text-align: left;
		}
		.frow--more {
			flex-direction: row;
			justify-content: space-between;
		}
		/* the bus goes vertical: icon rows on a left rail */
		.machine > svg {
			display: none;
		}
		.machine {
			padding: 0.6rem 1.4rem;
		}
		.machine-m {
			display: block;
			border-left: 1px solid var(--line-hi);
		}
		.m-row {
			position: relative;
			display: flex;
			align-items: center;
			gap: 1rem;
			padding: 0.85rem 0 0.85rem 1.6rem;
		}
		.m-row::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			width: 1.1rem;
			height: 1px;
			background: var(--line-hi);
		}
		.m-row svg {
			width: 24px;
			height: 24px;
			flex-shrink: 0;
			stroke: var(--ink-3);
		}
		.m-row span {
			font-family: var(--font-mono);
			font-size: 0.68rem;
			letter-spacing: 0.08em;
			color: var(--ink-2);
		}
	}

	@media (max-width: 520px) {
		.plate {
			font-stretch: 100%;
			font-size: clamp(1.6rem, 10.5vw, 2.9rem);
		}
		.hero-actions .btn {
			flex: 1;
			text-align: center;
		}
	}
</style>
