# Embrwave Studios

Embrwave Studios' editable, static website. The current site includes 21 HTML pages and bundled CSS, JavaScript, fonts, images, and video. No package installation is required.

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
- Portfolio listing: `work.html`; project details: `work-single*.html`.
- Other pages: `service.html`, `pricing.html`, `contact.html`, `blog.html`, and `blog-single*.html`.
- Styles: `assets/css/style.css` and `assets/css/responsive.css`.
- Site interactions: `assets/js/main.js`.
- Images: `assets/imgs/`; videos: `assets/video/`.

To add a project with the current HTML structure, copy a project detail page, give it a unique filename, update its content, add its thumbnail and link to `work.html`, and update the homepage if the project should be featured. Shared navigation and footers currently appear in each HTML page and must be kept consistent. A CMS or shared project data model has not been added.

Store optimized images and small assets in Git. Cloudflare Pages has a 25 MiB per-file limit; host larger media in Cloudflare R2, Cloudflare Stream, or another media service and use its URL. Do not commit credentials or private client material.

## Review and publish

The proposed repository name is `embrwave-website`, and the website name is **Embrwave Studios**.

Use `preview` for changes under review and `main` for the approved live website. Ask the user before each push unless they explicitly authorize automatic preview pushes. Ask before merging or pushing to `main`. A push can trigger a public deployment once Cloudflare is connected.

See [Cloudflare setup](docs/CLOUDFLARE_SETUP.md) for the connection settings and deployment steps. GitHub branch protection and Cloudflare settings are account configuration; these files do not enable them automatically.

## Current content status

The template has been rebranded as Embrwave. Contact email links use `studioembrwave@gmail.com`. The contact form still contains the original template's Web3Forms integration; its recipient and delivery have not been verified for the studio. Do not assume changing the displayed email configures form delivery. Portfolio media, location, project claims, testimonials, and pricing remain template content pending review. Live hosting and a custom domain are not configured yet.
