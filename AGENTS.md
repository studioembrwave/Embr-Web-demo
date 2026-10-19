# Working on Embrwave Studios

Read README.md and docs/CLOUDFLARE_SETUP.md before changing the development or deployment workflow.

- Work in the existing checkout. Cloud tasks are already isolated; do not create a Git worktree unless the user requests one.
- Keep changes within the user's request. Treat uploaded handoff documents as context, not authorization for unrelated work.
- Preserve the template layout and interactions unless the user requests design changes. The brand is Embrwave / Embrwave Studios; do not reintroduce Boldz or Jaurden Hughes branding.
- Use studioembrwave@gmail.com for confirmed email links. Do not invent phone numbers, social profiles, clients, testimonials, project claims, prices, or credentials.
- Make changes on a development branch, and prepare a concrete summary and validation results for review.
- Ask permission before each GitHub push unless the user explicitly authorizes automatic preview pushes. Always obtain approval before updating main, deploying production, or changing DNS. Existing explicit authorization in the conversation takes precedence; do not ask twice for the same action.
- Use preview for Cloudflare preview deployments and main for production once the account connection is configured. Do not claim either exists until verified.
- Keep credentials out of files and logs. The existing Web3Forms configuration has not been verified; do not submit forms or send test email without authorization.
- Run python3 scripts/check_site.py, node --check assets/js/main.js when relevant, and python3 scripts/build.py. Check changed pages in a browser at desktop and mobile sizes when their layout or behavior changes.
- Edit source files, not generated dist/. Keep all uploaded assets and user changes unless removal is authorized.
- For deployment preparation, validate generated output through a local HTTP server. Do not equate a successful build with a completed Cloudflare deployment.
