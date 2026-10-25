# Graphics Programmer Roadmap — v4

Open `index.html` in your browser. The page is standalone: no build, no dependencies, no account, and no backend. External books open via links; their texts are not included in the archive.

## Sections

* Today — one active stage, upcoming reading, return point.
* Program — 19 stages, 54 reading items, practice, and criteria; 6 specializations.
* Tree — 57 saved nodes and dependencies from the previous version.
* Chapters — plans for 28 sources specifying the edition.
* 5–20 minutes — 21 cards for short reading, review, and breaks.
* Shelf — all 174 original resources; key books have a "Which chapters to read" button.

`ROADMAP.md` contains the program text for reading, searching, and printing.

## Updating an already hosted page

1. Before replacing, export the progress of the old page to JSON.
2. Replace `index.html` with the new one, keep `.nojekyll`. The rest of the files are optional for the page to function.
3. Open the page and import the JSON if necessary. The import merges records; matching tree and note records are updated from the file, while new learning marks are merged.

The old localStorage keys have been preserved. On the same address and in the same browser, previous marks should be picked up automatically. The full v4 JSON includes both the old tree and the new reading/practice data. JSON v1/v2 are supported.

## Where progress is stored

Only in the browser's localStorage. There is no synchronization between devices and domains. In `file://` mode and private mode, saving depends on the browser. JSON export is a reliable way to transfer data. Resetting deletes all marks and notes after confirmation.

## Hosting

This is a regular static site, compatible with GitHub Pages and Nginx. For an existing site, simply replace the file in its previous location. When setting up new hosting, use the provider's current documentation.

## Content and editions

Main tables of contents were verified on October 25, 2026. Numbering: FCG 5, RTR 4, PBRT 4, GEA 3, CS:APP 3, PMPP 4, Math Primer 2, FGED according to the specified volumes. For sources without a confirmed edition, topics are used without fabricated numbers. Old search links on the shelf have been preserved and are not presented as verified tables of contents.

The order, exercises, and criteria constitute an individual program. The number of minutes refers to a single study session; a large chapter will take multiple sessions. The program is not an official studio curriculum or a guarantee of professional proficiency.