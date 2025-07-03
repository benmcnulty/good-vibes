# PROMPTS.md

This file collects carefully drafted prompts used for interacting with the AI agents in the **Good Vibes** project, including OpenAI Codex, Claude Code, and GitHub Copilot.

Each prompt is a stand-alone request designed to guide an agent to execute a clear, well-defined task. These records ensure transparent AI collaboration and allow for retrospective review of how prompts evolve alongside the codebase.

---

## Initial Roadmap Planning Prompt

**Prompt for Codex:**  
```
Please act as the planning and roadmap manager for the **Good Vibes** project.

Context:
- The Good Vibes project is a standalone single-page application (SPA) built with HTML, CSS, and JavaScript.
- It will include an Introduction section, a GitHub Repositories listing section, and an Articles section for writing about the vibe coding journey.
- This project is developed and maintained by three AI agents: OpenAI Codex (planning and roadmap), Claude Code (code and tests), and GitHub Copilot (commit diff and pull request reviews).

Instructions:
- Draft a detailed roadmap and development tracking guide that breaks down the SPA into logical modules and sub-components.
- Define how each module should be documented and tracked as a limited-scope task.
- Describe how Codex, Claude Code, and GitHub Copilot will engage with each module: Codex for planning and roadmap updates, Claude Code for implementation and tests, Copilot for code reviews and pull requests.
- Include principles for modular development without deadlines or time estimates since all development is handled by AI in an iterative, flexible workflow.
- Recommend best practices for tracking progress, updating documentation, and ensuring the roadmap evolves cleanly with the codebase.
- Ensure the guidance aligns with the collaboration structure described in `AGENTS.md`, `CLAUDE.md`, and `.github/copilot-instructions.md`.

After careful review and consideration of these objectives, determine and implement the appropriate roadmap and development tracking documentation directly within the repository, ensuring that the new files and any updates clearly support the ongoing AI development workflow.
```

## Core Layout Implementation Prompt for Claude Code

**Prompt for Claude Code:**  
```
Please act as the development agent for the **Good Vibes** project and begin implementing the SPA according to the approved roadmap.

Context:
- Start with **Module 1: Core Layout**, as defined in `docs/ROADMAP.md`.
- The project uses HTML, CSS, and JavaScript with no external frameworks.
- The Core Layout includes the main HTML skeleton, a header, footer, and a container for dynamic content sections.
- Global navigation should link to the Introduction Section, GitHub Repositories Listing, and Articles Section.
- Establish base CSS styles, variables, and reusable classes for layout and typography.

Instructions:
- Implement this Core Layout cleanly and modularly.
- Add clear, semantic HTML structure.
- Write maintainable CSS in an appropriate directory or style block.
- Use clear inline comments where the structure benefits from explanation.
- If navigation requires minimal JavaScript (like toggles), include it with simple, clear code.
- Follow all coding conventions in `CLAUDE.md` and coordinate with Codex and Copilot roles as described.
- Make sure the repository reflects these updates logically and supports continued modular development.

Focus on maintainability and clear structure as you move forward with this first core implementation.
```
