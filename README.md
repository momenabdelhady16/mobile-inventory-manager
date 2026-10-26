# Mobile Inventory Manager

A browser-based inventory manager for a mobile phone shop, built with HTML, CSS, and vanilla JavaScript.

> **Status:** work in progress. The interface and styling are complete. The application logic is planned and not implemented yet.

## Current Version

- Entry form for brand, model, release year, price, and quantity.
- Release-year dropdown with options from 2015 through 2026.
- Inventory table with columns for brand, model, release year, price, quantity, and actions. It is an empty layout for now.
- Styled form controls, buttons, table rows, and action icons.
- Light and dark palettes defined as CSS custom properties. The dark palette applies when `data-theme="dark"` is set on the root element.
- Theme-toggle button in the header (visual only for now).
- Custom SVG favicon, also used as the header logo.

Adding, editing, and deleting phones are not functional yet.

## Roadmap

- [ ] Add, edit, and delete phones
- [ ] Search and filter the inventory
- [ ] Validate input before processing operations
- [ ] Persist inventory data in the browser
- [ ] Record operations and errors
- [ ] Check data consistency
- [ ] Working theme toggle that remembers the user's preference

## Architecture

The planned JavaScript architecture splits the app into independent modules coordinated by a central Core. Modules never call one another directly; every interaction goes through the Core.

| Module | Responsibility |
| --- | --- |
| Core | Coordinates the modules and dispatches operations |
| UI | DOM rendering and user-interface events, with no business rules |
| Memory | Holds the inventory data in memory and handles persistence |
| Test | Validates data and checks consistency |
| Logic | Inventory and shop rules |
| Log | Records operations and errors |

The module files exist as empty placeholders. Their implementation is planned work.

## Project Structure

```
.
├── index.html
├── mobile-inventory-favicon.svg
├── src/
│   ├── main.js
│   ├── core/
│   └── modules/
│       ├── log/
│       ├── logic/
│       ├── memory/
│       ├── test/
│       └── ui/
└── styles/
    ├── main.css
    ├── base.css
    ├── layout.css
    └── components/
        ├── buttons.css
        ├── form.css
        └── table.css
```

## Tech Stack

- HTML5
- CSS3: custom properties, Flexbox, and nesting
- Vanilla JavaScript (planned for application behavior)
- [Poppins](https://fonts.google.com/specimen/Poppins) from Google Fonts
- SVG for the favicon and interface icons

## Getting Started

There is no build step.

```bash
git clone https://github.com/momenabdelhady16/mobile-inventory-manager.git
cd mobile-inventory-manager
```

Open `index.html` in a modern browser. The stylesheet uses CSS nesting, so a recent browser is required. The Poppins font is loaded from Google Fonts and needs an internet connection; everything else is served from local files.

## Development Notes

- The existence of a JavaScript module file does not mean its behavior is implemented.
- Work happens on the `dev` branch and is merged into `main` through pull requests.
