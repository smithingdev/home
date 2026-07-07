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
			"Fifteen years inside a large company, focused on cybersecurity — today leading the development & automation team of its cybersecurity division. It's the work nobody sees: the systems that decide who gets in, measured in decades, not sprints. All of it one machine; these are the parts.",
		machineAria:
			'Six hallmark punches wired to a common bus: identity systems and IdPs, APIs and integrations, automation platforms, DevOps and DevSecOps, MCP servers and tooling, and a development and automation team, led',
		punchLabels: [
			'identity systems & idps',
			'apis & integrations',
			'automation platforms',
			'devops & devsecops',
			'mcp servers & tooling',
			'dev & automation team — led'
		],
		wordHead: 'contact',
		wordIntro: 'A commission, an idea, or just to talk shop — the forge is open.',
		elsewhere: 'elsewhere —'
	},
	es: {
		title: 'smithing.dev',
		description:
			'smithing.dev — herramientas open source para developers, sobre quince años de sistemas grandes.',
		nav: { open: 'open source', years: 'años', word: 'contacto' },
		heroEyebrow: 'el herrero detrás',
		heroLine:
			'Hago herramientas open source para developers — con quince años de sistemas grandes y críticos en seguridad por debajo.',
		heroOpenSource: 'Open source',
		openHead: 'open source',
		works: {
			beartropy:
				'Un ecosistema tall-stack de componentes robustos y hermosos para tu próximo proyecto Laravel — SAML 2.0, tablas de datos, roles y permisos, y más.',
			vaxtly:
				'Un cliente de APIs de escritorio, local-first. Probá endpoints REST, WebSocket y MCP — sincronizá colecciones por Git, sin cuentas en la nube.'
		},
		moreForge: 'más en la forja',
		yearsHead: 'quince años, plegados adentro',
		yearsNote:
			'Quince años dentro de una gran empresa, enfocado en ciberseguridad — hoy liderando el equipo de desarrollo y automatización de su división de ciberseguridad. Es el trabajo que nadie ve: los sistemas que deciden quién entra, medidos en décadas, no en sprints. Todo una sola máquina; estas son las partes.',
		machineAria:
			'Seis punzones conectados a un bus común: sistemas de identidad e IdPs, APIs e integraciones, plataformas de automatización, DevOps y DevSecOps, servidores MCP y tooling, y un equipo de desarrollo y automatización, a cargo',
		punchLabels: [
			'sistemas de identidad e idps',
			'apis e integraciones',
			'plataformas de automatización',
			'devops & devsecops',
			'servidores mcp & tooling',
			'equipo dev & automatización\n— a cargo'
		],
		wordHead: 'contacto',
		wordIntro: 'Un encargo, una idea, o solo hablar del oficio — la forja está abierta.',
		elsewhere: 'también en —'
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
