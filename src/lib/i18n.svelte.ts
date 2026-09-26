/* ─────────────────────────────────────────────
   Two tongues, one steel. The page prerenders in
   english; at hydration we honor a saved choice,
   else the browser's language. Everything the
   visitor reads lives in this dictionary.
   ───────────────────────────────────────────── */

export type Locale = 'en' | 'es';

const messages = {
	en: {
		title: 'smithing.dev',
		description: 'smithing.dev — developer tools in the open, on fifteen years of large systems.',
		nav: { open: 'open', years: 'years', word: 'contact' },
		heroEyebrow: 'the smith behind it',
		heroLine:
			'I make developer tools in the open — with fifteen years of large, security-critical systems underneath.',
		heroOpenSource: 'Open source',
		openHead: 'in the open',
		works: {
			beartropy:
				'A tall-stack ecosystem of robust, beautiful components for your next Laravel project — SAML 2.0, data tables, roles & permissions, and more.',
			vaxtly:
				'A local-first desktop API client. Test REST, WebSocket, and MCP endpoints — sync collections over Git, no cloud accounts required.'
		},
		moreForge: 'more in the forge',
		yearsHead: 'fifteen years, folded in',
		yearsNote:
			"Fifteen years inside a large company, focused on cybersecurity — today leading the development & automation team of its cybersecurity division. It's the work nobody sees: helping build the systems that decide who gets in, measured in decades, not sprints. These are the marks I've left along the way — separate pieces, the same hand.",
		marksAria:
			'Seven hallmarks struck in a staggered row: identity systems and IdPs, APIs and integrations, automation platforms, DevOps and DevSecOps, MCP servers and tooling, applied AI and agents, and a development and automation team, led',
		punchLabels: [
			'identity systems\n& idps',
			'apis &\nintegrations',
			'automation\nplatforms',
			'devops &\ndevsecops',
			'mcp servers\n& tooling',
			'applied ai\n& agents',
			'dev & automation\nteam — led'
		],
		wordHead: 'contact',
		wordIntro: 'A commission, an idea, or just to talk shop — the forge is open.',
		elsewhere: 'elsewhere —'
	},
	es: {
		title: 'smithing.dev',
		description:
			'smithing.dev — herramientas open source para developers, con quince años de experiencia en sistemas de gran escala.',
		nav: { open: 'open source', years: 'años', word: 'contacto' },
		heroEyebrow: 'quien está en la forja',
		heroLine:
			'Desarrollo herramientas open source para developers — sobre una base de quince años en sistemas de gran escala, críticos para la seguridad.',
		heroOpenSource: 'Open source',
		openHead: 'open source',
		works: {
			beartropy:
				'Un ecosistema tall-stack de componentes robustos y prolijos para tu próximo proyecto Laravel — SAML 2.0, tablas de datos, roles y permisos, y mucho más.',
			vaxtly:
				'Un cliente de APIs de escritorio, local-first. Probá endpoints REST, WebSocket y MCP, y sincronizá tus colecciones con Git — sin cuentas en la nube.'
		},
		moreForge: 'más en la forja',
		yearsHead: 'quince años, capa sobre capa',
		yearsNote:
			'Quince años en una gran empresa, dedicado a la ciberseguridad — hoy lidero el equipo de desarrollo y automatización de su área de ciberseguridad. Es el trabajo que no se ve: ayudar a construir los sistemas que deciden quién entra, pensados para durar décadas, no sprints. Estas son las marcas que fui dejando en el camino — piezas distintas, la misma mano.',
		marksAria:
			'Siete sellos estampados en zigzag: sistemas de identidad e IdPs, APIs e integraciones, plataformas de automatización, DevOps y DevSecOps, servidores MCP y tooling, IA aplicada y agentes, y la conducción de un equipo de desarrollo y automatización',
		punchLabels: [
			'sistemas de\nidentidad e idps',
			'apis e\nintegraciones',
			'plataformas de\nautomatización',
			'devops &\ndevsecops',
			'servidores mcp\n& tooling',
			'ia aplicada\n& agentes',
			'a cargo del\nequipo dev &\nautomatización'
		],
		wordHead: 'contacto',
		wordIntro: 'Un proyecto, una idea o simplemente charlar del oficio — la forja está abierta.',
		elsewhere: 'en otros lados —'
	}
} as const;

class I18n {
	locale = $state<Locale>('en');

	get t() {
		return messages[this.locale];
	}

	/** saved choice → browser language → english */
	detect() {
		const saved = localStorage.getItem('lang');
		const locale: Locale =
			saved === 'es' || saved === 'en'
				? saved
				: navigator.language?.toLowerCase().startsWith('es')
					? 'es'
					: 'en';
		this.locale = locale;
		document.documentElement.lang = locale;
	}

	set(locale: Locale) {
		this.locale = locale;
		localStorage.setItem('lang', locale);
		document.documentElement.lang = locale;
	}
}

export const i18n = new I18n();
