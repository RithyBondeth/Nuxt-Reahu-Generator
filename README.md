# Profile README Builder

Build a GitHub profile README from drag-and-drop blocks. Live preview, undo/redo,
shareable links, download as Markdown. Runs entirely in the browser — no backend,
no database, no account.

## Setup

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000 — the builder itself is at `/build`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build into `.output/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint (`npx eslint . --fix` to autofix) |
| `npm run typecheck` | `vue-tsc` over the whole project |

## Architecture

The one idea worth knowing: **a README is an ordered array of typed blocks**, and
the document is a pure function of that array.

The code is layered so that dependencies only ever point downward —
`pages → components → composables → core → config → types`. Nothing in `core/`
or `config/` imports Vue, so the entire render pipeline is plain TypeScript you
can unit-test without mounting a component.

```
app/
  types/                   Type vocabulary. Depends on nothing.
    block.ts                 BlockPropsMap — the single source of truth
    common.ts social.ts stats.ts

  config/                  Static data. No logic, no state.
    services.ts              Third-party widget hosts (see caveats below)
    social-platforms.ts      Badge colours, logos, href builders
    tech-icons.ts            skillicons slugs, grouped for the picker
    stats-themes.ts ui-options.ts landing.ts

  core/                    Pure TypeScript. No Vue, no DOM state.
    render/                  One `props -> Markdown` file per block type
      header.ts about.ts tech-stack.ts stats.ts socials.ts markdown.ts
      helpers.ts               qs / align / heading primitives
      registry.ts              Maps block type -> renderer; renderReadme()
    blocks/
      definitions.ts           Labels, icons, and default props per type
      factory.ts               createBlock / cloneBlock
      starter.ts               The first-run document
    document/
      storage.ts               localStorage load/save
      share.ts                 lz-string encode/decode for share links
      download.ts              Blob download

  composables/             Vue state. Thin wrappers over core/.
    useBlockCollection.ts    The array + CRUD + undo/redo
    useDocumentPersistence.ts Hydrate on boot, save on change
    useReadme.ts             Shared singleton wiring the two together

  components/
    blocks/                  BlockList, BlockCard, BlockEditor, AddBlockMenu,
                             HistoryControls, editors/*
    readme/                  ReadmePanel, ReadmeToolbar, ReadmePreview

  pages/
    index.vue                Landing page (prerendered)
    build.vue                The builder (SPA-only) — 20 lines, just layout
```

Components live in feature folders but keep flat names (`<BlockCard>`, not
`<BlocksBlockCard>`) via `components: [{ path, pathPrefix: false }]` in
`nuxt.config.ts`. Names must stay unique across those folders.

### Adding a block type

1. Add its props to `BlockPropsMap` in `app/types/block.ts`
2. Add a renderer in `app/core/render/<name>.ts` and register it in `registry.ts`
3. Add metadata to `BLOCK_DEFINITIONS` + `BLOCK_ORDER` in `app/core/blocks/definitions.ts`
4. Add an editor component and register it in `BlockEditor.vue`

Steps 2 and 3 are mapped types keyed off `BlockType`, so TypeScript fails the
build on whichever you forget.

## Things that will bite you

**`/build` is `ssr: false` on purpose.** It reads `localStorage` and the URL hash
at setup time. Rendering it on the server would hydrate against state the server
cannot see. `/` stays prerendered for SEO. See `routeRules` in `nuxt.config.ts`.

**The preview uses `v-html`.** That is unavoidable — an accurate GitHub preview
needs the raw-HTML subset GitHub allows inside Markdown (`<div align>`, `<img>`,
`<picture>`). Input is sanitized with DOMPurify first, which matters because
share links carry a whole document in the URL fragment, so the content is not
always the viewer's own. `vue/no-v-html` is disabled for that one file in
`eslint.config.mjs` — scoped by path, so the rule still guards everywhere else.

**Stat cards fail intermittently.** The public `github-readme-stats` instance
shares one GitHub API token across all its users and returns 503 regularly. This
is not a bug in this app. [Deploy your own instance](https://github.com/anuraghazra/github-readme-stats#deploy-on-your-own)
and change `STATS_HOST` in `app/utils/catalog.ts`.

**Do not use `github-readme-streak-stats.herokuapp.com`.** That host stopped
resolving when Heroku ended free dynos, though most tutorials still list it.
`streak-stats.demolab.com` is the maintained replacement, and is what
`config/services.ts` points at.

**Block props must stay JSON-serializable.** Persistence, share links, and
`cloneBlock` all round-trip them through JSON. Adding a `Date`, `Map`, or
function to `BlockPropsMap` will break all three silently.

**Profile READMEs must be Markdown.** The output is a `README.md` that goes in a
repo named *exactly* your GitHub username. An `.html` file will not render as a
profile.

## Deploying

Nitro auto-detects the target, so Vercel / Netlify / Cloudflare Pages all work
with no config. `npm run build`, then deploy `.output/`.

Nothing here needs a server today. If you later add GitHub prefill, AI-generated
copy, or publish-to-GitHub via OAuth, those go in `server/api/` in this same
project and deploy alongside as functions.
