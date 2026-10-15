# SORAA'27 Website

Official website for the 1st International Workshop on
Software Organizations in the Era of AI Agents (SORAA'27),
co-located with FSE 2027.

Website:
https://soraa27.github.io/soraa27/

## Website structure

The site is a single static page with no build step, framework, or package manager.

```
index.html              All page content (one section per navigation item)
css/style.css           All styles, including light/dark colour tokens
js/main.js              Mobile menu and current-section highlighting (optional;
                        all content works without JavaScript)
assets/favicon.svg      Site icon
assets/fonts/           Self-hosted Newsreader and Public Sans (SIL Open Font
                        License; licence texts included)
.nojekyll               Tells GitHub Pages to serve files as-is (no Jekyll build)
```

Sections in `index.html`, in page order, each with a matching anchor:
`#home`, `#about`, `#topics`, `#cfp`, `#dates`, `#program`, `#outcomes`,
`#organizers`, `#policies`, `#contact`.

All paths are relative (`css/style.css`, not `/css/style.css`) because the site is
served from the `/soraa27/` sub-path. Keep new links and assets relative.

## Preview locally

Either open `index.html` directly in a browser, or serve it so it behaves exactly
as on GitHub Pages (under `/soraa27/`):

```sh
cd ..                         # the folder that contains this repository
python3 -m http.server 8000
# then open http://localhost:8000/soraa27/
```

(This assumes the repository folder is named `soraa27`.)

## Common updates

Search `index.html` for the comment markers below; each block explains what to edit.

### Important dates

Search for `IMPORTANT DATES` (in the `#dates` section). For each date, change both
the visible text and the `datetime="YYYY-MM-DD"` attribute. When the workshop day is
confirmed, also:

- remove the "Exact date TBA" tag and the July 11 / July 17 note in that section;
- update "Workshop date" in the hero (`hero-facts` near the top of the page).

Do not add a time zone (e.g. AoE) until it is officially confirmed.

### Program

Search for `PROGRAM: organizers` (in the `#program` section). Each
`<li class="slot">` is one time slot; breaks use `class="slot slot-break"`. To switch
to a half-day program, edit the times and delete or reorder whole `<li>` elements.
Add the keynote speaker where the comment `Replace TBA with the speaker's name`
appears.

### Program committee members

In the `#organizers` section, find the comment
`Replace "Coming soon" with the PC member list once confirmed` under the
"Program Committee" heading, and replace the "Coming soon" tag with the list.

### Submission URL

In the `#cfp` section, find the comment
`Placeholder: replace with a link once the official submission system is confirmed`.
Replace the disabled button with a link, for example:

```html
<a class="button" href="https://…">Submit via …</a>
```

and update the note below it if needed.

## Deployment (GitHub Pages)

The site is published by GitHub Pages directly from the `main` branch, repository
root (Settings → Pages → Build and deployment → Source: **Deploy from a branch**,
Branch: **main**, Folder: **/ (root)**).

Every push to `main` triggers GitHub's built-in "pages build and deployment" run;
the updated site usually appears at https://soraa27.github.io/soraa27/ within a few
minutes. No GitHub Actions workflow file is needed.
