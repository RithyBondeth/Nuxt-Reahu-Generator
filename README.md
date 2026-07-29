# Reahu Generator

Compose a GitHub profile README from drag-and-drop blocks. Live preview,
undo/redo, shareable links, download as Markdown. Runs entirely in the browser —
no backend, no database, no account.

Seventeen block types, including animated banners and typing text, four kinds of
GitHub graph, ~200 tech icons, 50 social platforms, and 70 card themes.

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
    common.ts social.ts stats.ts widgets.ts

  config/                  Static data. No logic, no state.
    services.ts              Third-party widget hosts (see caveats below)
    social-platforms.ts      50 platforms: colours, logos, href builders
    tech-icons.ts            ~200 skillicons slugs + simple-icons aliases
    stats-themes.ts          70 card themes, grouped for the picker
    widgets.ts               Banner shapes, trophy filters, typing fonts
    support-platforms.ts badge-presets.ts emoji.ts ui-options.ts landing.ts

  core/                    Pure TypeScript. No Vue, no DOM state.
    render/                  One `props -> Markdown` file per block type
      header.ts banner.ts typing.ts about.ts tech-stack.ts stats.ts
      activity.ts trophies.ts repos.ts snake.ts badges.ts socials.ts
      support.ts quote.ts table.ts divider.ts markdown.ts
      helpers.ts               qs / align / heading / badge primitives
      registry.ts              Maps block type -> renderer; renderReadme()
    blocks/
      definitions.ts           Labels, icons, categories, default props
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

Add a key to `BlockPropsMap` and the compiler walks you through the rest — it
will refuse to build until the renderer, the metadata, the editor, and the
palette entry all exist:

1. `types/block.ts` — the props
2. `core/render/<name>.ts` + register it in `render/registry.ts`
3. `core/blocks/definitions.ts` — label, icon, category, defaults
4. `components/blocks/editors/<Name>Editor.vue` + the map in `BlockEditor.vue`

Step 3's `BLOCK_CATEGORIES` is checked too: `BLOCK_ORDER` carries a conditional
type that collapses to `never` if a block type is missing from the palette, so
forgetting one is a compile error rather than a block nobody can find.

The shared editor controls — `SegmentedField`, `ColorField`, `ToggleRow`,
`StringListField`, `EmojiPicker` — are auto-imported, so a new editor is mostly
composition rather than markup.

### Blocks

| Category | Blocks |
| --- | --- |
| Structure | Header, Banner, Divider |
| Content | About me, Tech stack, Custom badges, Table, Dev quote, Custom Markdown |
| Graphs | GitHub stats, Activity graph, Trophies, Pinned repos |
| Motion | Typing text, Contribution snake |
| Links | Socials, Sponsor buttons |

## Brand

Reahu uses a Drizzle-inspired colour system: one acid-lime accent over cool
graphite surfaces. The custom mark is an abstract `R` assembled from modular
blocks, connecting the identity to the product's block-based workflow:

| Token | Value | Role |
| --- | --- | --- |
| `lime-500` (primary) | `#C5F74F` | actions and active states |
| `slate-950` (surface) | `#111111` | dark canvas |
| `slate-800` (elevated) | `#282828` | raised surfaces |
| `slate-400` (muted) | `#909090` | secondary text |

Ramps are defined in `app/assets/css/main.css` and aliased in
`app/app.config.ts`. Hairline borders and quiet grid lines provide structure;
brand colour is reserved for active controls and primary actions.

Type is Ubuntu throughout, with Ubuntu Mono reserved for code and section
labels. Both are self-hosted at build time by `@nuxt/fonts`, which ships with
Nuxt UI, so there is no CDN request at runtime.

The landing page uses a compact product demo as its main visual. It mirrors the
real two-pane builder rather than introducing a separate decorative hero.

The browser icon uses the same blocks symbol as the live brand mark.
The social image is generated from its source artwork.

```bash
sips -s format png public/og-image.svg --out public/og-image.png
```

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

**Every card is somebody else's free-tier deployment.** None of them are ours,
none of them are under contract, and two of the best-known ones went dark while
this was being written. All hosts live in `app/config/services.ts` so a swap is
one line. The current state:

| Service | Host | Note |
| --- | --- | --- |
| Stats, languages, pins | `gh-readme-stats.vercel.app` | Not the canonical host — see below |
| Trophies | `github-trophies.vercel.app` | Not the canonical host — see below |
| Streak | `streak-stats.demolab.com` | Maintained |
| Typing SVG | `readme-typing-svg.demolab.com` | Maintained |
| Banner, divider | `capsule-render.vercel.app` | Fine |
| Activity graph | `github-readme-activity-graph.vercel.app` | Fine |
| Badges | `img.shields.io` | Fine |
| Icon grid | `skillicons.dev` | Fine |

**`STATS_HOST` and `TROPHY_HOST` point at community mirrors, not the official
instances.** Both canonical hosts return errors for every request, including
ones with no parameters — `github-readme-stats.vercel.app` answers `503
DEPLOYMENT_PAUSED` and `github-profile-trophy.vercel.app` answers `402
DEPLOYMENT_DISABLED`. Those are switched-off deployments rather than rate
limiting, so retrying does not help. The mirrors run the same open-source code
and take the same parameters, but they belong to third parties nobody here has
vetted, and every visitor to a generated README fetches an image from them. If
you depend on these cards, [deploy your own
instance](https://github.com/anuraghazra/github-readme-stats#deploy-on-your-own)
and point `STATS_HOST` at it.

**Do not use `github-readme-streak-stats.herokuapp.com`** or
**`readme-typing-svg.herokuapp.com`**. Both stopped resolving when Heroku ended
free dynos, and most tutorials still list them. `streak-stats.demolab.com` and
`readme-typing-svg.demolab.com` are the maintained replacements.

**These services fail silently, so verify slugs against the source.** An unknown
skillicons slug renders a blank tile, an unknown card theme falls back to the
default palette, and an unknown trophy filter returns an empty card — none of
them return an error. Every slug in `tech-icons.ts`, every theme in
`stats-themes.ts`, and every filter in `widgets.ts` was checked against the live
service or the upstream source, which is why the trophy filters use upstream's
exact spellings (`MultiLanguage`, not `MultipleLang`).

**Two encoding traps in the query builder.** `qs()` percent-encodes values, and
that is usually what you want — but a literal `+` becomes `%2B`, which arrives
as a plus sign rather than a space. That is why `TypingFont` stores `Fira Code`
and not the `Fira+Code` form the service's own docs use: the `+` form silently
returns a card with no text in it. Semicolons and colons are fine encoded, since
the services decode before parsing.

**Do not name a CSS class `collapse`.** Tailwind ships a `collapse` utility that
sets `visibility: collapse`, and a class of that name on a wrapper hides
everything inside it. The block card's disclosure is `.disclosure` for exactly
this reason.

**`USelect` rejects an empty-string option value.** It reserves `''` for
clearing the field and shows the placeholder instead, and passing one throws at
render. "No animation" is therefore the string `'none'`, dropped from the query
by the renderer.

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
