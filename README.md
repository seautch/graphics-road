# Graphics Programmer Roadmap v6 — Program and Tree

**Open `index.html**` or publish it via GitHub Pages / static server. No build process or server database is required. External sources open via links.

## What's New

* The previous **19 massive stages** have been replaced by **21 thematic blocks and 116 specific lessons**. Two new blocks focus on LUX//PRISM (first playable prototype and vertical slice).
* Every lesson outlines **exactly what to understand, scoped reading, a practical task, a verifiable result**, and two independent checkboxes (understood / implemented).
* The flawed logic of "read RTR and automatically complete Viewer + pipeline + RenderDoc" is gone. RenderDoc is a standalone lesson requiring you to capture and analyze a frame.
* The tree remains intact (57 nodes). A node is completed **only after finishing all small lessons assigned to it**. General nodes might require lessons from multiple blocks.
* If you manually check a tree node, the program displays the associated lessons. If you can genuinely reproduce their results, confirm each lesson explicitly—there is no automatic completion of all lessons from a single node click.
* The "Today" tab shows the **next uncompleted lesson** instead of an abstract requirement to finish a massive stage. The "Chapters" tab organizes reading **by lessons**.
* The visual tree, 174 materials on the "Shelf", 21 "5–20 minutes" cards, specializations, personal notes, and export/import functionality are all preserved.

## How to Use

1. Open "Today". Read the short section specified in **What to read**. If you already know it, jump straight to practice.
2. Write the code yourself and verify it using the specific test in **How to verify**.
3. Check **"I can explain without hints"** and **"Implemented and verified via test"**. Just reading does not credit the skill.
4. The program will select the next uncompleted lesson. A single lesson might take two or more days—this is normal.
5. Check the "Tree" whenever you like: nodes turn green once all lessons required for a specific skill are finished.

The detailed text for all 116 lessons, complete with sections and criteria, is available in [`ROADMAP.md`](https://www.google.com/search?q=ROADMAP.md).

## Updating from v4/v5 Without Losing Data

1. **First, click "Export" on the old site** and save the JSON file.
2. Replace `index.html` on your server or GitHub Pages; optionally, replace `README.md` and `ROADMAP.md`.
3. On the **same URL, protocol, and browser**, your old progress will load automatically. If the URL is different, import the JSON file.
4. **Important:** Your old tree checkboxes, read chapters, notes, and major stages are retained. However, a previously completed major stage from v5 **does not count** as proof for all the new v6 lessons. You must confirm the new lessons manually to avoid logging false skills.
5. After updating, export your progress: the file will be named `graphics-roadmap-progress-v6.json`.

Saves are local (`localStorage`), not cloud-based. It is highly recommended to export a backup JSON before switching domains/browsers and to do so regularly while learning. In incognito mode or via `file://`, storage reliability depends on the browser.

## Contents

* `index.html` — a complete single-page application (all data and styles included).
* `ROADMAP.md` — all lessons in Markdown.
* `README.md` — instructions for updating and usage.
* `.nojekyll` — a utility file for GitHub Pages.

Is there a specific lesson or section of the roadmap you want to dive into first?