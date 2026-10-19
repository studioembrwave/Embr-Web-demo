"""Validate and copy only public website files into dist/."""

from pathlib import Path
import shutil

from check_site import ROOT, validate


def main():
    files = validate()
    destination = ROOT / "dist"
    if destination.is_symlink():
        raise SystemExit("Refusing to replace a symlink at dist/.")
    if destination.exists():
        shutil.rmtree(destination)
    destination.mkdir()
    for source in files:
        target = destination / source.relative_to(ROOT)
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
    print(f"Built {len(files)} files into {destination.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
