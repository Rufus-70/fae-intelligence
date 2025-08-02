# Project Plan: Blog UI Unification

**Date:** 2025-08-01

**Project Lead:** Gemini

**Stakeholder:** Rosie

## 1. Goal

To refactor the `html-blog` and `visual-editor` to use the same Tailwind CSS design system as the main Fae Intelligence Next.js application. This will ensure a consistent visual identity and user experience between the public-facing website and the blog.

## 2. Scope

This project covers the setup of a Tailwind CSS build process for the blog, refactoring the editor's UI, updating the block rendering logic to output Tailwind utility classes, and cleaning up the old CSS files and inline styles.

---

## 3. Milestones and Tasks

### Milestone 1: Project Setup & Tailwind Integration

*   **Objective:** Establish the foundational tooling to compile Tailwind CSS for the blog.
*   **Status:** Not Started

| Task ID | Description                                                                                             | Assigned To | Status      |
| :------ | :------------------------------------------------------------------------------------------------------ | :---------- | :---------- |
| `1.1`   | Initialize a `package.json` for the `html-blog` directory.                                              | Gemini      | `[ ] To Do` |
| `1.2`   | Install Tailwind CSS, PostCSS, and Autoprefixer as dev dependencies.                                    | Gemini      | `[ ] To Do` |
| `1.3`   | Create `tailwind.config.js` in `html-blog` and populate it with the main site's design tokens.           | Gemini      | `[ ] To Do` |
| `1.4`   | Create `postcss.config.js` in `html-blog`.                                                              | Gemini      | `[ ] To Do` |
| `1.5`   | Create a main CSS input file (`/assets/css/source.css`) with Tailwind directives.                       | Gemini      | `[ ] To Do` |
| `1.6`   | Add a `build:css` script to the `package.json` to compile the CSS.                                      | Gemini      | `[ ] To Do` |
| `1.7`   | Run the initial build to verify the setup and generate the first `blog-styles.css`.                     | Gemini      | `[ ] To Do` |

### Milestone 2: Refactor Visual Editor & Core Components

*   **Objective:** Update the editor and shared components to use the new Tailwind CSS classes.
*   **Status:** Not Started

| Task ID | Description                                                                                             | Assigned To | Status      |
| :------ | :------------------------------------------------------------------------------------------------------ | :---------- | :---------- |
| `2.1`   | Update `visual-editor.html` to link to the new `blog-styles.css` instead of the old `blog.css`.           | Gemini      | `[ ] To Do` |
| `2.2`   | Refactor `includes/header.html` to use Tailwind utility classes.                                        | Gemini      | `[ ] To Do` |
| `2.3`   | Refactor `includes/footer.html` to use Tailwind utility classes.                                        | Gemini      | `[ ] To Do` |
| `2.4`   | Refactor the main UI of `visual-editor.html` (panels, buttons, etc.) to use Tailwind classes.           | Gemini      | `[ ] To Do` |

### Milestone 3: Update Block Rendering Logic

*   **Objective:** Ensure all dynamically generated blog content is styled with Tailwind.
*   **Status:** Not Started

| Task ID | Description                                                                                             | Assigned To | Status      |
| :------ | :------------------------------------------------------------------------------------------------------ | :---------- | :---------- |
| `3.1`   | Modify the `renderBlock` JavaScript function to output HTML with Tailwind utility classes.                | Gemini      | `[ ] To Do` |
| `3.2`   | Update the `showProperties` function to correctly reflect the state of Tailwind-styled blocks.            | Gemini      | `[ ] To Do` |
| `3.3`   | Update the `exportHTML` function to generate clean, Tailwind-based HTML.                                | Gemini      | `[ ] To Do` |

### Milestone 4: Cleanup and Finalization

*   **Objective:** Remove legacy code and document the new process.
*   **Status:** Not Started

| Task ID | Description                                                                                             | Assigned To | Status      |
| :------ | :------------------------------------------------------------------------------------------------------ | :---------- | :---------- |
| `4.1`   | Delete the old `blog.css` file.                                                                         | Gemini      | `[ ] To Do` |
| `4.2`   | Review and remove any now-redundant inline styles or `<style>` tags from `visual-editor.html`.            | Gemini      | `[ ] To Do` |
| `4.3`   | Document the new `npm run build:css` command in the main project `README.md`.                           | Gemini      | `[ ] To Do` |

