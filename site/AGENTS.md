# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## GaoXTech visual decisions

- The selected homepage direction is a dark, immersive technology publication with deep navy surfaces, electric-blue signals, and restrained yellow accents for investing content.
- Use `/public/assets/gaoxtech-logo.png`, copied from the workspace `logo.png`, as the single logo asset everywhere: header, hero, footer, favicon, and touch icon.
- Whenever the visible brand name “高手科技” appears, pair it with the explanatory line “高老师手把手带你探索科技”.
- The three primary editorial paths are AI 实战, 科技前沿, and 美股研究.
- Keep the site accessible from mainland China: avoid runtime dependencies on Google Fonts, blocked CDNs, or third-party image hosts.
- The site should stay expandable for articles, interactive tools, and later dynamic data without changing the core visual language.
- Always preserve a user-controlled dark/light theme switch. The light theme should use a soft blue-gray technology palette rather than stark pure white.
- Treat mobile responsiveness as a first-class requirement because a large share of readers will open the site on phones.
- In the header brand lockup, keep “高手科技” dominant while making “GaoXTech” and “高老师手把手带你探索科技” comfortably legible with moderate contrast and weight, including on narrow mobile screens.
- Keep the primary navigation beginner-friendly and direct: 首页, 出海指南, 美股研究, 实用工具, 关于. Use “实用工具” as the broad entry for downloads, online calculators, templates, and prompt resources.
