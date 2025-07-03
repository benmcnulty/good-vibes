# Good Vibes – Sprint 2 Plan

This document defines the next sprint for the Good Vibes project following the successful completion of Modules 1–6. It builds on the foundation established in [docs/ROADMAP.md](docs/ROADMAP.md) and the [Retrospective](Retrospective.md).

## Goals
- Introduce dynamic data integration for repositories and articles
- Improve user interaction and accessibility
- Expand testing and refine the build process
- Enhance responsive design and documentation

## Modules

### Module 7 – Dynamic GitHub Repository Loading
- Create `githubService.js` to fetch repository data from the GitHub API
- Cache results in `localStorage` with offline fallback
- Integrate loading and error states using existing utilities
- Update tests to mock network requests
- Document API usage and environment variables

### Module 8 – Articles Data Integration
- Decide on a data source (static JSON/Markdown or simple CMS)
- Build a loader that fetches article metadata and populates the Articles section
- Add safe HTML conversion for article excerpts
- Include retry logic and tests for data fetch failures
- Provide sample dynamic articles

### Module 9 – Interactivity & UX Enhancements
- Add smooth scrolling and active navigation highlighting
- Implement a "scroll to top" button for long pages
- Introduce an optional dark mode toggle via CSS variables
- Ensure keyboard navigation and focus styles for accessibility

### Module 10 – Testing & Build Refinements
- Expand unit tests to cover new modules
- Add an initial Playwright or Cypress test suite
- Integrate Prettier for automated code formatting
- Review build scripts for additional optimizations

### Module 11 – Responsive Styling Updates
- Audit styles at multiple breakpoints
- Refine grid layouts for smaller screens
- Test layout in multiple browsers to catch quirks

### Module 12 – Documentation & Workflow
- Update `docs/ROADMAP.md` and `docs/DEVELOPMENT_TRACKING.md` with sprint details
- Document API key setup and environment configuration
- Add usage notes for new features to `README.md`
- Summarize this plan in the project documentation

## Agent Collaboration
- **Codex** updates the roadmap and keeps tasks scoped and organized
- **Claude Code** implements features, writes tests, and updates docs
- **GitHub Copilot** reviews pull requests and suggests improvements

This roadmap keeps improvements modular and iterative while maintaining the Good Vibes ethos.
