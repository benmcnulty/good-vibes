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


## Post-Articles Section Review Prompt for Codex

**Prompt for Codex:**  
```
Please continue in your role as the planning and roadmap manager for the **Good Vibes** project.

Context:
- Claude Code has completed the implementation of **Module 4: Articles Section** as defined in the roadmap.
- The new section includes semantic HTML, consistent CSS styling, placeholder article items, and optional notes for dynamic content loading.
- This work should align with the modular design approach and integrate cleanly with the Core Layout, Introduction, and Repositories sections.

Instructions:
- Review the committed Articles Section for alignment with the roadmap and development tracking.
- Update `docs/ROADMAP.md` and `docs/DEVELOPMENT_TRACKING.md` as needed to reflect this new module’s completion and any adjustments.
- Note any structural refinements or best practices to inform future enhancements or additional sections.
- Confirm that the modular scope and agent responsibilities remain aligned with `AGENTS.md`, `CLAUDE.md`, and `.github/copilot-instructions.md`.
- Keep all planning documents accurate, clear, and actionable for the next phases.

Maintain consistency and clarity as you integrate this milestone into the living roadmap.
```

## Core Utilities and Helpers Implementation Prompt for Claude Code

**Prompt for Claude Code:**  
```
Please continue in your role as development agent for the **Good Vibes** project and proceed with the next module according to the approved roadmap.

Context:
- This task focuses on **Module 5: Core Utilities and Helpers** as defined in `docs/ROADMAP.md`.
- This module provides any reusable helper functions, utility scripts, or common JavaScript snippets that support the SPA’s modular structure.
- These utilities may include tasks like DOM selection helpers, simple toggle logic, or placeholder logic for future dynamic content.

Instructions:
- Develop clear, reusable utility scripts in JavaScript.
- Place utilities in an organized location within the repository structure.
- Add inline comments to explain each helper’s purpose and example usage.
- Keep utilities simple and scoped to immediate project needs — no unnecessary complexity.
- Ensure that the helpers align with existing modules and can support future dynamic data if needed.
- Follow the standards and conventions defined in `CLAUDE.md` and coordinate with Codex and Copilot as appropriate.
- Maintain clarity and modularity to ensure helpers are easy to update or expand.

Focus on simplicity, clarity, and maintainability as you implement these core utilities.
```


## Post-Utilities and Helpers Review Prompt for Codex

**Prompt for Codex:**  
```
Please continue in your role as the planning and roadmap manager for the **Good Vibes** project.

Context:
- Claude Code has completed the implementation of **Module 5: Core Utilities and Helpers** as defined in the roadmap.
- The new utilities include reusable helper functions, small scripts, or snippets that support the modular structure of the SPA.
- This work should align with the style, structure, and coding conventions already established in previous modules.

Instructions:
- Review the committed Core Utilities and Helpers for alignment with the existing roadmap and development tracking.
- Update `docs/ROADMAP.md` and `docs/DEVELOPMENT_TRACKING.md` as needed to reflect this module’s addition and any structural improvements.
- Confirm that all helpers are scoped properly, support current and future modules, and follow the maintainable modular approach.
- Note any patterns or conventions that should guide future utilities or refactors.
- Keep all planning and tracking documents clear, modular, and actionable for the next development steps.
- Ensure alignment with `AGENTS.md`, `CLAUDE.md`, and `.github/copilot-instructions.md`.

Maintain accuracy and cohesion as you evolve the roadmap for the next phases of the project.
```


## Build and Testing Setup Implementation Prompt for Claude Code

**Prompt for Claude Code:**  
```
Please continue in your role as development agent for the **Good Vibes** project and proceed with the next module according to the updated roadmap.

Context:
- This task focuses on **Module 6: Build and Testing Setup** as defined in `docs/ROADMAP.md`.
- This module establishes a simple, maintainable structure for building and testing the SPA’s HTML, CSS, and JavaScript components.
- This setup should align with the project’s minimal tooling approach and the style conventions already implemented.

Instructions:
- Implement any basic build scripts if needed (for example, simple bundling or minification, if appropriate).
- Add lightweight test files or placeholders showing how core components can be tested in the future.
- Include clear inline comments explaining how the build and test pieces fit into the overall repo.
- Keep this setup simple and scoped — no unnecessary complexity or heavy tooling.
- Ensure that the structure supports future expansion if more testing or build steps are added.
- Follow all standards defined in `CLAUDE.md` and coordinate with Codex and Copilot as appropriate.
- Maintain clarity and modularity to keep the repository well-organized and easy to evolve.

Focus on maintainability, simplicity, and clear documentation as you implement this setup.
```


## Final Project Review and Retrospective Prompt for Codex

**Prompt for Codex:**  
```
Please continue in your role as the planning and roadmap manager for the **Good Vibes** project and complete a final review and retrospective for this development cycle.

Context:
- All six modules defined in the roadmap have been implemented and integrated into the repository.
- Each section reflects the modular, maintainable design approach established at project kickoff.
- The project was developed collaboratively by the AI agents Codex, Claude Code, and GitHub Copilot.

Instructions:
- Review the entire `docs/ROADMAP.md` and `docs/DEVELOPMENT_TRACKING.md` to ensure they fully reflect the completed state of the project.
- Document a clear retrospective section summarizing lessons learned, strengths of the current vibe coding workflow, and any points for improvement.
- Add notes or recommendations for a potential future phase (Version 2) that may include dynamic data loading, expanded testing, or other enhancements.
- Verify that all documentation aligns with `AGENTS.md`, `CLAUDE.md`, and `.github/copilot-instructions.md` to maintain clarity of agent responsibilities.
- Ensure all roadmap tasks are marked complete, and the documents remain well-organized for future reference.

Keep the final documentation clear, concise, and aligned with the Good Vibes project’s modular, AI-supported development ethos.
```

## Final Linting, Testing, and Retrospective Prompt for Claude Code

**Prompt for Claude Code:**  
```
Please continue in your role as development agent for the **Good Vibes** project and complete this final cycle to ensure the project’s technical quality and closure.

Context:
- Codex’s final review identified outstanding linting errors and warnings that must be resolved.
- The build and testing setup (Module 6) is in place but test coverage is minimal.
- A clean, maintainable state is required for the end of this development cycle.

Instructions:
- Review the entire codebase for lint errors and warnings. Resolve all issues across HTML, CSS, and JavaScript files.
- Expand the test coverage where practical — focus on utilities, helpers, and reusable components.
- Automate linting and tests where feasible, e.g., by adding or updating any simple CI workflows if appropriate.
- Add clear inline comments explaining any test cases or tricky fixes.
- Once technical fixes are complete, write a concise retrospective from Claude Code’s perspective summarizing:
  - Lessons learned during implementation.
  - Observations on code quality and maintainability.
  - Recommendations for Version 2 development.
- Ensure all updates follow the standards in `CLAUDE.md` and coordinate with Codex and Copilot roles as described.

Focus on leaving the codebase clean, maintainable, well-tested, and ready for future vibe coding iterations.
```


## Publish Retrospective and Final Documentation Wrap-Up Prompt for Claude Code

**Prompt for Claude Code:**  
```
Please continue in your role as development agent for the **Good Vibes** project and complete this final wrap-up task.

Context:
- Your retrospective has been provided interactively but should now be formally recorded for future reference.
- The project is ready for version tagging or pausing until the next development cycle.

Instructions:
- Format and publish your full retrospective as a new `Retrospective.md` file in the root of the repository.
- Ensure the document is clear, well-structured, and easy to read.
- Update `README.md` with a brief summary line that points to the published retrospective.
- If appropriate, update any other relevant documentation (e.g., `docs/ROADMAP.md`) to note that the current development cycle is complete.
- Confirm that all files are consistent with the modular, maintainable vibe coding approach.
- Follow documentation standards as described in `CLAUDE.md`.

Focus on clarity, professionalism, and maintainability as you close out this project stage.
```

## Next Sprint Planning Prompt for Codex

**Prompt for Codex:**  
```
Please continue in your role as the planning and roadmap manager for the **Good Vibes** project and develop a clear, actionable plan for the next sprint.

Context:
- The first development cycle is complete, with all six core modules implemented, linted, tested, and documented.
- A full retrospective has been published, highlighting strengths and areas for potential improvement.
- The next phase should build on this solid SPA foundation and take the project to the next level with reasonable, modular enhancements that fit the vibe coding workflow.

Instructions:
- Review the full repository state, including `ROADMAP.md`, `DEVELOPMENT_TRACKING.md`, `Retrospective.md`, and `README.md`.
- Propose a detailed plan for a new sprint focused on realistic enhancements. Consider areas such as:
  - Dynamic data integration for the Repositories and Articles sections.
  - Improving interactivity and user experience with JavaScript.
  - Expanding test coverage and refining the build process if beneficial.
  - Enhancing the styling and responsive design for wider device support.
  - Any other modular, manageable improvements that align with the Good Vibes ethos.
- Break the proposed enhancements into logical modules and tasks, keeping each scoped for clear execution.
- Define how Codex, Claude Code, and GitHub Copilot will engage in planning, implementation, testing, and review for this sprint.
- Recommend updates or extensions to existing documentation and workflows as needed.

Deliver the plan in a clear, organized format, and ensure it is practical, iterative, and maintains the project’s modular, maintainable structure.
```
