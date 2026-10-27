# Mobile Inventory Manager

A browser-based inventory manager for a mobile phone shop, built with HTML, CSS, and vanilla JavaScript.

**Live Demo:** [Mobile Inventory Manager](https://mobile-inventory-manager.vercel.app/)

> **Status:** Work in progress. The initial UI prototype and basic inventory operations have been implemented. The application is still under development and may contain bugs.

## Current Version

- Form for entering a phone's brand, model, release year, price, and quantity.
- Release-year dropdown with options from 2015 through 2026.
- Inventory table with columns for brand, model, release year, price, quantity, and actions.
- Dynamic table-row rendering using JavaScript.
- Initial implementations of adding, editing, and deleting inventory records.
- Edit and cancel actions for table rows.
- Browser-based persistence using `localStorage`.
- A Memory module that loads stored records into a JavaScript `Map` and provides basic CRUD operations.
- UUID-based record identification using `crypto.randomUUID()`.
- Light and dark color palettes defined as CSS custom properties. The dark palette applies when `data-theme="dark"` is set on the root element.
- Theme-toggle button in the header; its behavior is not implemented yet.
- Custom SVG favicon, also used as the header logo.

**Note:** The UI and basic inventory workflows are implemented as an initial prototype. They have not yet been fully tested or hardened. Validation, error handling, and consistency checks remain part of the planned work.

## Roadmap

- [x] Build the initial UI and styling
- [x] Implement the first working prototype of the UI module
- [x] Add basic inventory record creation, display, editing, and deletion
- [x] Implement browser persistence using `localStorage`
- [ ] Validate input before processing operations
- [ ] Search and filter the inventory
- [ ] Record operations and errors
- [ ] Check data consistency between memory and storage
- [ ] Handle corrupted or invalid stored records robustly
- [ ] Implement a theme toggle that remembers the user's preference
- [ ] Test and refine inventory operations and error handling
- [ ] Complete the planned modular architecture

## Architecture

The project is being developed with a modular JavaScript architecture. The intended design uses a central Core module to coordinate independent modules, with interactions routed through the Core rather than modules calling one another directly.

The current implementation is an intermediate step toward that design. `main.js` currently coordinates the UI and Memory modules directly.

| Module | Responsibility | Status |
| --- | --- | --- |
| Main | Initializes the application and coordinates UI and Memory operations | Implemented |
| UI | Handles DOM events, renders inventory records, and manages row-editing interactions | Initial working prototype |
| Memory | Holds inventory records in a `Map` and provides CRUD operations | Implemented |
| Storage | Wraps browser `localStorage` operations | Implemented |
| Test | Validates data and checks consistency | Planned |
| Logic | Handles inventory and shop rules | Planned |
| Log | Records operations and errors | Planned |
| Core | Central coordination and operation dispatch | Planned |

### Data Storage

Inventory records are stored in the browser's `localStorage` using the `mob-inv:` prefix. Each record is identified by a UUID.

On startup, the Memory module loads stored records into an in-memory `Map`. Changes made through the current inventory workflows are written to storage.

Data is stored locally in the current browser. It is not synchronized between devices or shared with other users.

## Project Structure

```text
.
├── index.html
├── mobile-inventory-favicon.svg
├── src/
│   ├── main.js
│   └── modules/
│       ├── log/
│       ├── logic/
│       ├── memory/
│       │   ├── memory.js
│       │   └── storage.js
│       ├── test/
│       └── ui/
│           ├── ui.js
│           ├── domEvents.js
│           └── domRendrer.js
└── styles/
    ├── main.css
    ├── base.css
    ├── layout.css
    └── components/
        ├── buttons.css
        ├── form.css
        └── table.css
```

*Note: The structure above describes the current implementation and planned module directories. Some directories may still contain placeholders.*

## Tech Stack

- HTML5
- CSS3: custom properties, Flexbox, and nesting
- Vanilla JavaScript with ES modules
- Browser `localStorage` for persistence
- `crypto.randomUUID()` for record identifiers
- [Poppins](https://fonts.google.com/specimen/Poppins) from Google Fonts
- SVG for the favicon and interface icons
- [Vercel](https://vercel.com/) for deployment

## Getting Started

### Try the Live Version

Visit the [live demo](https://mobile-inventory-manager.vercel.app/) to access the deployed application.

### Run Locally

There is no build step.

```bash
git clone https://github.com/momenabdelhady16/mobile-inventory-manager.git
cd mobile-inventory-manager
```

Open `index.html` in a modern browser.

The application uses JavaScript ES modules and CSS nesting, so a modern browser is required. The Poppins font is loaded from Google Fonts and requires an internet connection; the rest of the application runs locally.

## Development Notes

- The application is a work in progress. Some implemented features may still have bugs.
- The Memory module separates in-memory data management from browser storage operations.
- The UI module handles DOM rendering and user interactions, while `main.js` coordinates operations.
- The planned Core module and the Test, Logic, and Log modules have not yet been fully implemented.
- Inventory data is stored in the current browser and is not synchronized across devices.
- Development takes place on the `dev` branch, with changes merged into `main` through pull requests.
