# Mobile Inventory Manager

A browser-based inventory manager for a mobile phone shop, built with HTML, CSS, and vanilla JavaScript (ES modules). It stores stock only (brand, model, price, quantity); it does not handle sales.

> **Status: work in progress.** The core inventory flow works as an early prototype with browser storage. Automated tests, full validation, search/filtering, and migration to a real database are not implemented yet.

## Contents

- [Project Status](#project-status)
- [Current Features](#current-features)
- [Known Limitations](#known-limitations)
- [Planned Features](#planned-features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Data Storage and Initialization](#data-storage-and-initialization)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Development Notes](#development-notes)

## Project Status

| Area | Status | Notes |
| --- | --- | --- |
| Inventory form and table | Implemented | Brand, model, price, quantity, and an action column |
| Add, edit, cancel, delete | Implemented | Edge cases are not covered by automated tests |
| Brand and model selectors | Implemented | Hardcoded seed lists; model options depend on the selected brand |
| Browser persistence | Implemented (local only) | `localStorage` through a storage wrapper, plus an in-memory `Map` |
| Light/dark theme toggle | Implemented | The choice is not saved across reloads |
| Input validation | Partial | Only the HTML `required` attribute on price and quantity |
| Automated tests | Not implemented | `src/modules/test/test.js` is empty |
| Search and filtering | Not implemented | No search or filter UI or logic |
| Real database | Planned | The app currently uses `localStorage` only |

## Current Features

### Form and table

- Entry form with brand, model, price, and quantity.
- Inventory table with columns for brand, model, price, quantity, and actions. Each row carries its record UUID in `data-id`.
- Rows are rendered from the records loaded at startup.

### Add, edit, cancel, and delete

- **Add:** the form's `submit` event builds a plain object from `FormData` and passes it to `Add`. `main.js` creates a UUID through `crypto.randomUUID()`.
- **Edit:** the edit button turns the row into inputs. **Done** submits the edit form with the row's existing UUID, so updates use the same upsert path as additions.
- **Cancel:** re-renders the stored record as text.
- **Delete:** removes the record from storage and from the in-memory `Map`, then removes the row.
- Only one row can be in edit mode at a time. Opening a second row first cancels the first.
- Row actions are handled by a single delegated click listener on the table body.

### Brand and model selectors

- Seed data in `src/modules/memory/memory.js`: 7 brands (Apple, Samsung, Google, Xiaomi, Huawei, OnePlus, Oppo), each with 5 models.
- Changing the brand rebuilds the model dropdown, in the entry form and in an edited row.
- In edit mode, the record's current brand and model are preselected.
- The lists are source-defined; the interface does not let users add or manage brands or models.

### Light/dark theme

- Light palette: CSS custom properties on `:root` in `styles/base.css`. Dark palette: `[data-theme="dark"]`.
- The `#darkMode` button switches `data-theme` on the root element between `dark` and `light`.
- Reloading returns to the light palette.

### Styling and assets

- `styles/main.css` imports the base, layout, button, form, and table stylesheets.
- Custom SVG favicon, also used as the header logo. Poppins is loaded from Google Fonts.

## Known Limitations

- **No automated tests.** `test.js` is empty. `main.js` imports it, but the import is unused.
- **Incomplete validation.** Price and quantity are `required` number inputs, with no `min` or `step`. There are no inventory-specific rules yet.
- **The theme preference is not saved.** There is no persistence for it.
- **`DB` is not a database.** The `DB` object in `storage.js` wraps `localStorage`.
- **Seed lists are reset on every startup.** `initMemory()` removes the stored brand and model lists and writes the source-defined ones again, so they are not editable persistent catalogs.
- **Partial corrupt-record handling.** `getToMap()` skips records whose JSON cannot be parsed and adds their keys to an internal `corrupted` list. That list is never cleared or shown to the user, and there is no repair flow.
- **Consistency helpers are not used yet.** `memory.js` has helpers that compare keys in the `Map` and in storage (refreshed every 5 seconds), but nothing consumes them because the Test module does not exist.
- **Limited error handling.** The storage wrapper methods are declared `async`, but the underlying `localStorage` calls are synchronous and can still throw (for example when storage is full or blocked). There is no user-facing feedback for storage failures.
- **No search or filtering.**

## Planned Features

- [ ] **Database migration:** replace `localStorage` persistence with a real database and adapt the Memory layer. The in-memory `Map` should be reconsidered as part of that redesign.
- [ ] **Automated tests:** build the Test module and cover the main user flows, validation, persistence, and data consistency.
- [ ] **Input validation:** define and enforce rules for required values, numeric ranges, and invalid records.
- [ ] **Search and filtering** of inventory records.
- [ ] **Persist the theme preference** across reloads.
- [ ] **Error handling** for storage or database failures and malformed records, with useful feedback.
- [ ] **Responsive layout and accessibility review.**

## Architecture

`src/main.js` is the entry point and the only file that connects the modules. It implements the operations (add, edit, delete, cancel, and model list by brand) and passes them to the UI as callbacks. The UI and Memory modules never import each other.

| Component | Path | Responsibility |
| --- | --- | --- |
| Entry point and coordinator | `src/main.js` | Initializes Memory and UI, creates UUIDs, and coordinates operations |
| Memory | `src/modules/memory/memory.js` | Seed data, in-memory `Map`, read/upsert/remove operations |
| Storage adapter | `src/modules/memory/storage.js` | Wraps `localStorage` for records (`storage`) and seed lists (`DB`) |
| UI facade | `src/modules/ui/ui.js` | Public entry points of the UI module |
| DOM events | `src/modules/ui/domEvents.js` | Form submission, table clicks, brand changes, theme toggle |
| DOM rendering | `src/modules/ui/domRendrer.js` | Initializes selectors; renders, replaces, edits, and removes rows |
| Input component | `src/modules/ui/components/inputField.js` | Numeric input for editable fields |
| Select component | `src/modules/ui/components/select.js` | Creates dropdowns and selects an option by value |
| Record component | `src/modules/ui/components/record.js` | Builds table rows in text or edit mode, with action buttons from HTML templates |
| Test (placeholder) | `src/modules/test/test.js` | Empty; tests are not implemented |

Core, Logic, and Log modules are not part of the architecture and are not planned.

## Project Structure

```text
.
├── index.html
├── mobile-inventory-favicon.svg
├── src/
│   ├── main.js
│   └── modules/
│       ├── memory/
│       │   ├── memory.js
│       │   └── storage.js
│       ├── test/
│       │   └── test.js
│       └── ui/
│           ├── ui.js
│           ├── domEvents.js
│           ├── domRendrer.js
│           └── components/
│               ├── inputField.js
│               ├── record.js
│               └── select.js
└── styles/
    ├── main.css
    ├── base.css
    ├── layout.css
    └── components/
        ├── buttons.css
        ├── form.css
        └── table.css
```

## Data Storage and Initialization

### Inventory records

- Each record is saved as JSON under `mob-inv:<uuid>`: `{ brand, model, price, quantity }`.
- At startup, `initMemory()` loads every parseable record into the in-memory `Map`.
- `upsert()` writes to storage first, then updates the `Map`. `removeOne()` removes from storage, then from the `Map`.
- `readAll()` returns `[id, record]` pairs with shallow copies of the records. `readOne()` reads synchronously from the `Map`; this should be revisited in a database migration.

### Brand and model lists

- Declared in `memory.js` and saved under `DB:mob-inv:brandDB` and `DB:mob-inv:modelDB`.
- Recreated from the source-defined lists on every startup.

### Persistence boundaries

Records persist only in the same browser profile through `localStorage`. They are not synchronized to a server or across devices, and clearing the site's data removes them.

## Technology Stack

- **HTML5:** page structure, forms, table, and `<template>` elements for row actions
- **CSS3:** custom properties, Flexbox, and nesting
- **Vanilla JavaScript:** ES modules and top-level `await`
- **Browser `localStorage`:** current persistence
- **Google Fonts:** [Poppins](https://fonts.google.com/specimen/Poppins)
- **SVG:** favicon, header logo, and interface icons

## Getting Started

A live demo is available at [mobile-inventory-manager.vercel.app](https://mobile-inventory-manager.vercel.app/).

To run it locally there is no build step:

```bash
git clone https://github.com/momenabdelhady16/mobile-inventory-manager.git
cd mobile-inventory-manager
```

The app uses ES modules, so serve the folder over HTTP instead of opening `index.html` directly. Use a recent browser (CSS nesting and top-level `await` are required). Poppins is loaded from Google Fonts and needs an internet connection; everything else is local.

## Development Notes

- Work happens on the `dev` branch and is merged into `main` through pull requests.
- There is no automated test suite, so a successful page load or a few manual clicks do not prove that all behavior is correct. Until tests exist, check these cases manually:
  - starting with empty storage, and loading previously saved records
  - adding a record and confirming it survives a reload
  - editing a record without creating a second one, and cancelling an edit
  - deleting a record
  - switching directly from editing one row to another
  - changing the brand in the entry form and in an edited row
  - malformed JSON in storage
  - toggling the theme in both directions
- Keep this README in sync with the code. When a planned feature is implemented, update its status.