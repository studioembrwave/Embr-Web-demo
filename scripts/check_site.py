"""Check public pages, local references, and Cloudflare Pages file sizes."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
MAX_FILE_SIZE = 25 * 1024 * 1024
PUBLIC_EXTRAS = ("_headers", "_redirects", "robots.txt", "sitemap.xml")


def public_files():
    files = list(ROOT.glob("*.html"))
    files += [p for p in (ROOT / "assets").rglob("*") if p.is_file()]
    files += [ROOT / name for name in PUBLIC_EXTRAS if (ROOT / name).is_file()]
    return sorted(files)


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []
        self.title_parts = []
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        self.in_title = self.in_title or tag == "title"
        for key, value in attrs:
            if value and key in ("src", "href", "poster"):
                self.references.append(value)

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title_parts.append(data)


def validate():
    files = public_files()
    public_paths = {p.resolve() for p in files}
    errors = []
    checked = 0
    for required in ("index.html", "404.html", "contact.html", "work.html"):
        if ROOT / required not in files:
            errors.append(f"Missing required page: {required}")

    for path in files:
        relative = path.relative_to(ROOT)
        if path.is_symlink():
            errors.append(f"Public file must not be a symlink: {relative}")
        if path.stat().st_size > MAX_FILE_SIZE:
            errors.append(f"Exceeds Cloudflare Pages' 25 MiB limit: {relative}")
        references = []
        if path.suffix == ".html":
            parser = References()
            parser.feed(path.read_text(encoding="utf-8"))
            references = parser.references
            if not "".join(parser.title_parts).strip():
                errors.append(f"Missing page title: {relative}")
        elif path.suffix == ".css":
            references = [m.strip(" \t\r\n\"'") for m in re.findall(
                r"url\(\s*([^)]*?)\s*\)", path.read_text(encoding="utf-8")
            )]
        for reference in references:
            url = urlsplit(reference)
            if url.scheme or url.netloc or not url.path:
                continue
            decoded = unquote(url.path)
            target = ((ROOT / decoded.lstrip("/")) if decoded.startswith("/")
                      else path.parent / decoded).resolve()
            if target.is_dir():
                target /= "index.html"
            checked += 1
            if target not in public_paths:
                errors.append(f"{relative}: missing public target {reference}")

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(1)
    pages = sum(p.suffix == ".html" for p in files)
    print(f"Validated {pages} HTML pages, {len(files)} public files, and {checked} local references.")
    return files


if __name__ == "__main__":
    validate()
