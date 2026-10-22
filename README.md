# Embrwave™ Studios

Embrwave™ Studios' editable, static website. The current site includes 22 HTML pages and bundled CSS, JavaScript, fonts, images, and video. No package installation is required.

## Run locally

From the repository root:

```sh
python3 -m http.server 5500 --bind 127.0.0.1
```

Open `http://localhost:5500` on the same machine. In a cloud workspace, this address is internal; use a Cloudflare Pages preview deployment to view the site from another device.

## Check and build

```sh
python3 scripts/check_site.py
node --check assets/js/main.js
python3 scripts/build.py
```

The build creates `dist/` containing only public website files. Documentation, development scripts, Git metadata, and local configuration are excluded. Do not edit `dist/`; edit the source files and rebuild. Python 3.10 or newer is required; Node is used only for the JavaScript syntax check.

## Edit the website

- Homepage: `index.html`.
- About page: `about.html`, with styles in `assets/css/about.css` and the employee slider in `assets/js/about.js`. The toolkit section lives here rather than on the homepage.
- Portfolio listing: `work.html`; project details: `work-single*.html`.
- Other pages: `service.html`, `pricing.html`, `contact.html`, `blog.html`, and `blog-single*.html`.
- Template styles: `assets/css/style.css` and `assets/css/responsive.css`. Embrwave branding and responsive copy treatments: `assets/css/embrwave.css` (loaded last).
- Site interactions: `assets/js/main.js`.
- Images: `assets/imgs/`; videos: `assets/video/`.
- Typography: `assets/css/fonts.css` defines the supplied Helvetica Neue faces, served as WOFF2 from `assets/fonts/helvetica-neue/`. Original font files are retained in `design/fonts/helvetica-neue/` outside the public build.

The header and menu use the supplied white logo, switching to #2323ff on hover or keyboard focus. The original EPS artwork is retained in `design/branding/`.

The loading intro uses the supplied symbol with a repeating white-blue-white ripple. It fades into the page after a complete cycle, skips the animation for reduced-motion preferences, and releases the overlay if a page resource stalls.

To add a project with the current HTML structure, copy a project detail page, give it a unique filename, update its content, add its thumbnail and link to `work.html`, and update the homepage if the project should be featured. Shared navigation and footers currently appear in each HTML page and must be kept consistent. A CMS or shared project data model has not been added.

Store optimized images and small assets in Git. Cloudflare Pages has a 25 MiB per-file limit; host larger media in Cloudflare R2, Cloudflare Stream, or another media service and use its URL. Do not commit credentials or private client material.

## Review and publish

The proposed repository name is `embrwave-website`, and the website name is **Embrwave Studios**.

Use `preview` for changes under review and `main` for the approved live website. Ask the user before each push unless they explicitly authorize automatic preview pushes. Ask before merging or pushing to `main`. A push can trigger a public deployment once Cloudflare is connected.

See [Cloudflare setup](docs/CLOUDFLARE_SETUP.md) for the connection settings and deployment steps. GitHub branch protection and Cloudflare settings are account configuration; these files do not enable them automatically.

## Current content status

The confirmed toolkit is Adobe Premiere Pro, After Effects, Photoshop, Illustrator, Blender, Cinema 4D, Notion, Milanote, and Discord. Toolkit and creative-focus entries use two columns on desktop and one on small screens; FAQ, service, and workflow lists align with their section headings.

Confirmed social profiles are [Instagram](https://www.instagram.com/embrwavee) and [X](https://x.com/embrwave). Shared social sections link to both profiles and the studio email; visible email addresses open `mailto:studioembrwave@gmail.com`.

The About page lists Manam Shafin and Fazle Rabby Rownok (Stz) as Co-founder & Partner. Founder portraits, employee profiles, and unconfirmed project totals remain clearly marked placeholders. Edit the four original `data-team-member` articles in `about.html`; slider copies are generated automatically. The employee slider moves at 18 pixels per second, has previous/next and pause controls, and pauses on hover, keyboard focus, or when off screen. Reduced-motion preferences disable automatic movement by default.

The site uses Embrwave’s “More Than Editing” copy and #2323ff accents. The studio location is Dhaka, Bangladesh, and the header clock uses Asia/Dhaka regardless of the visitor’s time zone. Contact links use `studioembrwave@gmail.com`.

The contact form and journal response form open email drafts; they do not submit to a backend or publish comments. The inherited template’s third-party form recipient has been removed. Configure a studio-owned delivery service separately before promising website submissions. Journal search filters the six local articles.

Project case studies, portfolio imagery, and client feedback are clearly marked placeholders pending approved information. Packages use custom quotes rather than invented prices. The user’s uploaded studio video is retained unchanged. All original page sections remain available for later editing.

The existing Cloudflare Pages project is https://embrwave-website.pages.dev; a push to its connected production branch can update that public site. A custom domain has been deferred. The preview branch must be deployed and its URL verified before claiming it is available for review.
