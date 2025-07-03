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

## Post-Implementation Review Prompt for Codex

**Prompt for Codex:**  
```
Please act in your role as planning and roadmap manager for the **Good Vibes** project.

Context:
- Claude Code has completed an implementation task for **Module 1: Core Layout** as defined in the roadmap.
- The implementation includes the basic HTML skeleton, header, footer, navigation, base CSS, and minimal JavaScript if needed.
- The work aligns with the modular development structure and coding conventions defined for this project.

Instructions:
- Review the newly implemented module for consistency with the existing roadmap and development tracking.
- Update `docs/ROADMAP.md` and `docs/DEVELOPMENT_TRACKING.md` as needed to reflect the current state of the project.
- Ensure all new information supports clear next steps for upcoming modules.
- Revise documentation to maintain clear, limited-scope tasks and agent responsibilities.
- Keep the project structure and documentation aligned with the AI collaboration model described in `AGENTS.md`, `CLAUDE.md`, and `.github/copilot-instructions.md`.

Maintain clear structure and accuracy as you integrate this development milestone into the planning documentation.
```

## Introduction Section Implementation Prompt for Claude Code

**Prompt for Claude Code:**  
```
Please continue in your role as development agent for the **Good Vibes** project and proceed with the next module according to the approved roadmap.

Context:
- This task focuses on **Module 2: Introduction Section** as outlined in `docs/ROADMAP.md`.
- The Introduction Section will present an overview of the Good Vibes project, its purpose, and any relevant vibe coding context.
- The section should be clearly visible within the SPA’s Core Layout and linked from the global navigation.

Instructions:
- Develop the HTML for the Introduction Section using semantic markup.
- Add appropriate CSS to ensure consistent styling with the Core Layout.
- Include placeholder text or basic example content that can be refined later.
- Use clear inline comments where needed to explain structure or styling decisions.
- Ensure the section is modular and easy to update or replace with dynamic content in the future.
- Follow coding standards and guidelines defined in `CLAUDE.md` and coordinate with Codex and Copilot as described.
- Keep the repository organized and updated to reflect the new section in alignment with the modular development approach.

Focus on clean, maintainable structure and keep changes scoped to this section.
```

## Post-Introduction Review Prompt for Codex

**Prompt for Codex:**  
```
Please continue in your role as the planning and roadmap manager for the **Good Vibes** project.

Context:
- Claude Code has completed the implementation of **Module 2: Introduction Section** as outlined in the roadmap.
- The new section includes semantic HTML, consistent CSS, placeholder content, and links integrated into the Core Layout.
- This work should align with the modular design, coding conventions, and project structure.

Instructions:
- Review the committed Introduction Section for alignment with the roadmap and development tracking.
- Update `docs/ROADMAP.md` and `docs/DEVELOPMENT_TRACKING.md` if needed to accurately reflect the current state of the project.
- Ensure any lessons learned or new standards are noted for future modules.
- Maintain consistency and clarity across all planning documents.
- Keep all updates aligned with the collaborative AI agent model described in `AGENTS.md`, `CLAUDE.md`, and `.github/copilot-instructions.md`.

Ensure the planning documents remain accurate and actionable as development continues.
```

## GitHub Repositories Listing Implementation Prompt for Claude Code

**Prompt for Claude Code:**  
```
Please continue in your role as development agent for the **Good Vibes** project and proceed with the next module according to the approved roadmap.

Context:
- This task focuses on **Module 3: GitHub Repositories Listing** as defined in `docs/ROADMAP.md`.
- The section will display a dynamic or static list of GitHub repositories related to vibe coding projects.
- It should be linked from the global navigation and follow the layout established by the Core Layout and Introduction Section.

Instructions:
- Develop the HTML structure for the GitHub Repositories Listing Section using clear, semantic markup.
- Style the section with CSS for visual consistency with the rest of the SPA.
- Include placeholder repository items to illustrate the expected layout (e.g., name, description, link).
- If appropriate, include minimal JavaScript or pseudo-code comments to show how dynamic data could be loaded in the future.
- Use clear inline comments to explain the structure and logic where needed.
- Follow coding standards and conventions defined in `CLAUDE.md` and coordinate with Codex and Copilot as described.
- Keep changes scoped and maintainable, ensuring the repository structure remains organized for modular updates.

Keep the implementation clean, modular, and aligned with the vibe coding approach.
```

## Post-Repositories Listing Review Prompt for Codex

**Prompt for Codex:**  
```
Please continue in your role as the planning and roadmap manager for the **Good Vibes** project.

Context:
- Claude Code has completed the implementation of **Module 3: GitHub Repositories Listing** as defined in the roadmap.
- The new section includes semantic HTML, consistent CSS styling, placeholder repository items, and optional notes for dynamic loading.
- This work should align with the modular design approach, Core Layout, and Introduction Section.

Instructions:
- Review the committed GitHub Repositories Listing for consistency with the overall roadmap and development tracking.
- Update `docs/ROADMAP.md` and `docs/DEVELOPMENT_TRACKING.md` as needed to reflect the current state and any refinements.
- Document any new structural notes or lessons learned that will inform future modules.
- Ensure that modular scope and agent responsibilities remain clear and aligned with `AGENTS.md`, `CLAUDE.md`, and `.github/copilot-instructions.md`.
- Maintain clear structure, accurate versioning, and actionable next steps for the remaining modules.

Keep the roadmap and tracking documentation fully aligned with the current state of the project.
```

## Articles Section Implementation Prompt for Claude Code

**Prompt for Claude Code:**  
```
Please continue in your role as development agent for the **Good Vibes** project and proceed with the next module according to the approved roadmap.

Context:
- This task focuses on **Module 4: Articles Section** as defined in `docs/ROADMAP.md`.
- The Articles Section will display a list of articles or posts about the vibe coding journey.
- It should be accessible from the global navigation and follow the same layout and style conventions established by previous modules.

Instructions:
- Develop the HTML structure for the Articles Section using semantic, accessible markup.
- Style the section with CSS so it integrates cleanly with the Core Layout, Introduction, and Repositories sections.
- Include placeholder article items (e.g., title, snippet, read more link) to illustrate the intended structure.
- Add inline comments where helpful to explain structural decisions or future dynamic features.
- If appropriate, include minimal JavaScript or pseudo-code comments to indicate how articles might be loaded dynamically.
- Follow the standards and conventions described in `CLAUDE.md` and coordinate with Codex and Copilot as needed.
- Ensure changes remain scoped, modular, and easy to extend in future iterations.

Keep the implementation clean, clear, and aligned with the modular vibe coding approach.
```
