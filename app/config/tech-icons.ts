/**
 * skillicons.dev slugs, grouped for the picker UI.
 *
 * Every slug here was checked against the live service — an unknown slug does
 * not error, it silently renders a blank tile, so a typo would ship as a hole
 * in the user's README rather than as a visible failure. Verify new entries
 * against https://skillicons.dev before adding them.
 *
 * `python` and `py` are the same icon upstream; only one is listed.
 */
export const TECH_ICONS: Record<string, string[]> = {
  'Languages': [
    'ts', 'js', 'python', 'go', 'rust', 'java', 'kotlin', 'swift', 'php', 'ruby',
    'c', 'cpp', 'cs', 'dart', 'lua', 'r', 'scala', 'elixir', 'haskell', 'perl',
    'zig', 'nim', 'ocaml', 'clojure', 'crystal', 'solidity', 'julia', 'v', 'vala',
    'fortran', 'matlab', 'octave', 'bash', 'powershell', 'regex', 'md', 'latex'
  ],
  'Frontend': [
    'vue', 'nuxtjs', 'react', 'nextjs', 'svelte', 'angular', 'astro', 'solidjs',
    'remix', 'gatsby', 'alpinejs', 'htmx', 'lit', 'ember', 'jquery',
    'tailwind', 'bootstrap', 'sass', 'less', 'windicss', 'materialui', 'vuetify',
    'styledcomponents', 'emotion', 'redux', 'pinia', 'html', 'css', 'pug',
    'vite', 'webpack', 'rollupjs', 'gulp', 'babel', 'threejs', 'd3', 'p5js'
  ],
  'Backend': [
    'nodejs', 'bun', 'deno', 'express', 'nestjs', 'adonis', 'elysia',
    'django', 'flask', 'fastapi', 'laravel', 'symfony', 'spring', 'hibernate',
    'dotnet', 'rails', 'ktor', 'actix', 'rocket', 'graphql', 'maven', 'gradle'
  ],
  'Mobile & Desktop': [
    'flutter', 'androidstudio', 'apple', 'electron', 'tauri', 'qt', 'gtk'
  ],
  'Databases': [
    'postgres', 'mysql', 'mongodb', 'redis', 'sqlite', 'supabase', 'firebase',
    'prisma', 'sequelize', 'elasticsearch', 'cassandra', 'dynamodb',
    'planetscale', 'rabbitmq', 'kafka'
  ],
  'DevOps & Cloud': [
    'docker', 'kubernetes', 'aws', 'gcp', 'azure', 'cloudflare', 'workers',
    'vercel', 'netlify', 'heroku', 'nginx', 'terraform', 'ansible', 'jenkins',
    'githubactions', 'prometheus', 'grafana', 'sentry', 'openshift', 'openstack',
    'linux', 'ubuntu', 'debian', 'arch', 'redhat', 'kali', 'nix', 'bsd',
    'windows', 'raspberrypi', 'ipfs'
  ],
  'AI & Data': [
    'tensorflow', 'pytorch', 'sklearn', 'opencv', 'anaconda'
  ],
  'Design': [
    'figma', 'xd', 'ai', 'ps', 'ae', 'au', 'blender', 'sketchup', 'webflow',
    'processing', 'autocad'
  ],
  'Tools & Editors': [
    'git', 'github', 'gitlab', 'bitbucket', 'vscode', 'vscodium', 'visualstudio',
    'idea', 'pycharm', 'phpstorm', 'webstorm', 'clion', 'rider', 'neovim', 'vim',
    'emacs', 'sublime', 'atom', 'obsidian', 'notion', 'postman', 'replit',
    'jest', 'vitest', 'cypress', 'selenium', 'npm', 'yarn', 'pnpm', 'cmake',
    'stackoverflow', 'discord'
  ],
  'Game & Hardware': [
    'unity', 'unreal', 'godot', 'gamemakerstudio', 'robloxstudio', 'bevy',
    'arduino', 'ros'
  ]
}

/** Flat list, used for search and for the "N available" count. */
export const ALL_TECH_ICONS = Object.values(TECH_ICONS).flat()

/**
 * skillicons slug → simple-icons slug, for the badge rendering mode.
 *
 * The two services do not share a naming scheme, and shields.io simply omits a
 * logo it cannot resolve, so an unmapped name costs a logo rather than raising
 * anything. Only the differences are listed — most slugs are identical in both,
 * and the renderer passes those through.
 *
 * Some tools have no entry because simple-icons has dropped the mark on
 * trademark grounds (Java's cup, VS Code, AWS, Azure, C#, the Adobe suite).
 * Those render as a text-only badge, which is the correct outcome.
 */
export const LOGO_ALIASES: Record<string, string> = {
  ts: 'typescript',
  js: 'javascript',
  cpp: 'cplusplus',
  java: 'openjdk',
  html: 'html5',
  tailwind: 'tailwindcss',
  nodejs: 'nodedotjs',
  nuxtjs: 'nuxt',
  nextjs: 'nextdotjs',
  vue: 'vuedotjs',
  solidjs: 'solid',
  alpinejs: 'alpinedotjs',
  ember: 'emberdotjs',
  materialui: 'mui',
  threejs: 'threedotjs',
  p5js: 'p5dotjs',
  rollupjs: 'rollupdotjs',
  rails: 'rubyonrails',
  postgres: 'postgresql',
  cassandra: 'apachecassandra',
  kafka: 'apachekafka',
  maven: 'apachemaven',
  gcp: 'googlecloud',
  arch: 'archlinux',
  kali: 'kalilinux',
  nix: 'nixos',
  bsd: 'freebsd',
  openshift: 'redhatopenshift',
  workers: 'cloudflareworkers',
  sklearn: 'scikitlearn',
  emacs: 'gnuemacs',
  sublime: 'sublimetext',
  idea: 'intellijidea',
  unreal: 'unrealengine',
  godot: 'godotengine',
  gamemakerstudio: 'gamemaker',
  robloxstudio: 'roblox',
  processing: 'processingfoundation',
  autocad: 'autodesk'
}

/**
 * Display names for the slugs whose abbreviation is not self-explanatory. The
 * picker falls back to the slug itself for everything else, so this only needs
 * the genuinely cryptic ones.
 */
export const TECH_ICON_LABELS: Record<string, string> = {
  ae: 'After Effects',
  ai: 'Illustrator',
  au: 'Audition',
  ps: 'Photoshop',
  xd: 'Adobe XD',
  cs: 'C#',
  cpp: 'C++',
  ts: 'TypeScript',
  js: 'JavaScript',
  py: 'Python',
  md: 'Markdown',
  d3: 'D3.js',
  idea: 'IntelliJ IDEA',
  dotnet: '.NET',
  nuxtjs: 'Nuxt',
  nextjs: 'Next.js',
  solidjs: 'Solid',
  p5js: 'p5.js',
  threejs: 'Three.js',
  materialui: 'Material UI',
  styledcomponents: 'styled-components',
  githubactions: 'GitHub Actions',
  workers: 'Cloudflare Workers',
  sklearn: 'scikit-learn',
  bsd: 'FreeBSD',
  v: 'V',
  r: 'R',
  c: 'C'
}
