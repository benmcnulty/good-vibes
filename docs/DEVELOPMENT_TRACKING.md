# Development Tracking Guide

This guide describes how tasks and progress are tracked in the Good Vibes project. It complements the main [roadmap](ROADMAP.md) and focuses on keeping development steps organized for the AI agents.

## Task Structure

- **Module Reference**: Each task references a module from the roadmap.
- **Scope**: Tasks are small and focused, usually involving a single feature or improvement.
- **Documentation**: Updates or new tasks are documented directly in the repository so future agents can pick up where previous ones left off.

## Updating Tasks

1. **Codex** identifies upcoming work in `docs/ROADMAP.md` and adds or refines tasks in this file.
2. **Claude Code** implements the code changes and associated tests.
3. **GitHub Copilot** reviews the pull request, suggesting improvements when necessary.
4. After merging, the task status is updated here to reflect completion.

## Example Entry

```
- [ ] Introduce navigation component (Module: Core Layout)
  - [ ] Create HTML structure
  - [ ] Add CSS styles
  - [ ] Implement JavaScript toggle logic
```

Checkboxes allow progress to be tracked over multiple commits or pull requests. Finished items can be checked off and dated if desired.

## Task Log

- [x] **Module 1: Core Layout**
  - index.html, styles.css, and script.js created
  - Header, footer, navigation, and base styling implemented (`a45f8ee`)
- [ ] **Module 2: Introduction Section**
  - Add introduction content and section-specific styles

## Best Practices

- Keep each entry short and clear so it is easy for any agent to continue the work.
- When closing a task, provide a brief note about the implementation (file names or PR reference).
- Review this guide regularly to ensure it matches the actual project state.

This tracking approach ensures iterative progress without strict deadlines, allowing the AI agents to maintain momentum while keeping documentation in sync with the codebase.
