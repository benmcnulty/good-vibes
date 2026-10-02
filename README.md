# Good Vibes

This is the source repository for an experimental single-page site about AI-assisted web development. The previously advertised `benlive.tv/good-vibes` URL rendered the host's Page Not Found during the 2026-10-02 portfolio review; no current hosted demo is verified here.

**Good Vibes** is a standalone single-page application (SPA) built with HTML, CSS, and JavaScript.  
It serves as an open example of a "vibe coding" project — an experimental approach to building web pages that reflect spontaneous, creative coding sessions.

The site includes:

- An introduction to vibe coding and this project's purpose.
- A dynamic GitHub repository listing powered by the GitHub API.
- A section for articles about the vibe coding journey, process, and experiments.
- A suite of interactive Vibe Coding examples demonstrating modern SPA techniques.

📂 **Repo:** [github.com/benmcnulty/good-vibes](https://github.com/benmcnulty/good-vibes)

## AI Assistance

This project uses a collaborative AI development approach with three dedicated systems:

- **[OpenAI Codex](AGENTS.md)**: Responsible for planning, roadmap management, and high-level project direction.
- **[Claude Code](CLAUDE.md)**: Responsible for writing code implementations and test coverage.
- **[GitHub Copilot](.github/copilot-instructions.md)**: Responsible for reviewing commit diffs and pull requests for consistency and style.

## Project Roadmap

The planning and tracking documents live in the [docs](docs/) directory:

- [Good Vibes Roadmap](docs/ROADMAP.md)
- [Development Tracking Guide](docs/DEVELOPMENT_TRACKING.md)
- [Sprint 2 Plan](ROADMAP-2.md)

These documents record the project's planning history. Proposed roadmap work should not be read as delivered functionality.

## Development Status

**Current status:** Historical experimental SPA. The July 2025 retrospective records its first development cycle; it is not a current production-readiness or accessibility certification.

The original development cycle and its implementation decisions are described in the [Development Retrospective](Retrospective.md) for detailed analysis of lessons learned, technical achievements, and recommendations for future development.

Planning for the next sprint is outlined in [ROADMAP-2.md](ROADMAP-2.md).

## Architecture and local requirements

`src/index.html` loads vanilla scripts and styles. `src/script.js` drives section navigation; `src/githubService.js` and `src/articlesService.js` supply repository/article data. Five standalone examples live under `examples/`. Tests under `tests/` use Node's test runner and JSDOM. No framework server or secret API key is required.

The public GitHub listing needs network access and is subject to unauthenticated API rate limits. Loading the page does not verify every remote link or repository result. Article/example content is an experiment, not evidence that every roadmap item shipped.

The existing dev/build paths serve/copy `src/` without the top-level `examples/` directory, so the main page's relative example links do not resolve in those outputs. To inspect an individual example, serve the repository root with `python -m http.server 8081` and open, for example, <http://localhost:8081/examples/chat-spa/>. This limitation remains explicit; no working integrated demo deployment is claimed.

## Getting Started

Use Node/npm with the committed lockfile and Python 3 for the static server. The package declares Node >=18; the existing CI matrix uses 18/20. The 2026-10-02 candidate was checked locally with Node 24; consult its CI for the declared 18/20 matrix. Build cleanup and copying use Node filesystem APIs and work without POSIX shell commands. On Windows, a direct source preview is:

```powershell
python -m http.server 8080 --directory src
```

Open <http://localhost:8080>. For a non-watch test invocation that avoids shell glob expansion, use `node --test` after installing dependencies. The install, lint, test and build commands work with the committed lockfile:

```bash
# Install the committed dependency lock
npm ci

# Start a local dev server
npm run dev

# Run lint checks and tests
npm run validate

# Build optimized production files
npm run build
```

Run `npm run format` to apply Prettier formatting or `npm run format:check` to verify formatting.

## Verification, contributions and license

The 2026-10-02 candidate passed `npm ci --ignore-scripts`, lint (36 existing JavaScript warnings, no errors), all 57 tests, coverage execution and the local build on Node 24. Regression tests cover date-only formatting in UTC, America/New_York and Pacific/Auckland, actual CSS minification under ESM, and a nonzero build exit on invalid assets. The lockfile now includes the already-declared Prettier version; other dependency versions were preserved.

Coverage execution also generates `coverage/lcov.info` through c8's explicit
LCOV reporter for the existing CI upload step; the local artifact was verified.
That establishes an available report, not successful external upload.

The current coverage runner does not measure the full browser application: existing tests load much of it through JSDOM/VM, and the report mainly covers the minifier. No full browser/accessibility checks, deployment or live GitHub-service test was performed. Consult exact candidate CI for the 18/20 matrix. Building writes local `dist/` files; it does not publish a site.

Keep contributions focused and preserve the project's plain HTML/CSS/JavaScript structure. Run relevant lint/tests/build checks and report failures or unrun steps explicitly. See [AGENTS.md](AGENTS.md) and the original retrospective for project context. Licensed under [MIT](LICENSE).
