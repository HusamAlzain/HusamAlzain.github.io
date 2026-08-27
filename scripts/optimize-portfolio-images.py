from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "public" / "images"

for source_name in ("rayah-edtech.jpg", "fraud-detection.jpg"):
    source = IMAGE_DIR / source_name
    target = source.with_suffix(".webp")
    with Image.open(source) as image:
        image = image.convert("RGB")
        image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=78, method=6)
        print(f"{source.name}: {source.stat().st_size // 1024} KB -> {target.name}: {target.stat().st_size // 1024} KB")
