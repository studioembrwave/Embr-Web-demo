# Cloudflare Pages setup

## 1. Name and branches

Recommended GitHub repository name: `studioembrwave/embrwave-website`.

The current remote is `studioembrwave/Embr-Web-demo`. After approval, rename it in GitHub **Settings → General → Repository name**. Renaming a local folder or Git remote alone does not rename a GitHub repository. GitHub redirects the old repository address, but update the local origin after the rename succeeds:

```sh
git remote set-url origin https://github.com/studioembrwave/embrwave-website.git
```

Keep `main` as the production branch. Push the approved preparation commit to `preview` first, then review and merge it into `main` before connecting the production build. The branch must exist on GitHub before selecting it for preview deployments.

If available for the repository's plan and visibility, configure a GitHub branch rule for `main` requiring a pull request and the `Validate website` status check. Permission policy in AGENTS.md is guidance, not server-enforced protection.

## 2. Connect Cloudflare to GitHub

In the Cloudflare dashboard, choose **Workers & Pages → Create application → Pages → Connect to Git** (wording may vary). Connect the GitHub account or organization and grant access to this repository. A GitHub-connected Pages project automatically deploys pushed commits; this workflow does not require putting a Cloudflare API token in GitHub Actions.

Use these build settings:

| Setting | Value |
| --- | --- |
| Project name | `embrwave-website`, if available |
| Production branch | `main` |
| Framework preset | None |
| Root directory | Repository root; leave blank |
| Build command | `python3 scripts/build.py` |
| Build output directory | `dist` |
| Environment variables | None required for this static build |

The build command requires Python 3.10 or later. Review the build log if the selected Cloudflare build image reports a different Python version.

The initial connection deploys the selected production branch publicly. Use a pages.dev address for review before connecting a custom domain. Never upload the entire repository manually: `dist/` is the intended public output.

## 3. Preview and approval workflow

In Pages build settings, enable preview deployments for the `preview` branch. After its first successful deployment, copy the branch alias from the Cloudflare dashboard. That stable URL shows the latest successful preview. Each deployment also has its own URL. Do not assume a URL exists or guess the allocated hostname before Cloudflare reports it.

1. Edit the source, validate, and summarize the changes.
2. Get permission to push to `preview` unless automatic preview pushes have been explicitly authorized.
3. Push; inspect the Cloudflare deployment result and review the preview on desktop and mobile.
4. Get approval before merging into `main`.
5. Merge and verify the production deployment.

GitHub Actions validates changes but does not deploy them itself. A failed GitHub check does not automatically prevent Cloudflare preview deployment; the build also runs validation, and main should have branch protection where supported.

## 4. Media and content before launch

- Use `assets/imgs/` for optimized project images and thumbnails.
- Keep individual files below Cloudflare Pages' 25 MiB limit; use R2 or Stream for large media.
- Email links and forms open drafts to studioembrwave@gmail.com. No website form backend or public comment storage is configured; add a studio-owned service separately if needed.
- Review portfolio placeholders, approved testimonials, software names, commercial terms, and social profiles before final launch. The confirmed studio location is Dhaka, Bangladesh.
- A custom domain and DNS changes require a separate approval. Preserve email-related DNS records.

## 5. Rollback

For a source correction, revert the approved commit through Git and redeploy. For an urgent hosting rollback, select a previously successful production deployment in Cloudflare if the dashboard supports it, then reconcile Git so the next deployment retains the correction. Do not force-push main.
