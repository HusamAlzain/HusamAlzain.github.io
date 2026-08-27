from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "scripts" / "source-images"
OUTPUT_DIR = ROOT / "public" / "images"

for source_name, target_name in (
    ("rayah-edtech.jpg", "rayah-edtech.webp"),
    ("fraud-detection.jpg", "fraud-detection.webp"),
):
    source = SOURCE_DIR / source_name
    target = OUTPUT_DIR / target_name
    with Image.open(source) as image:
        image = ImageOps.fit(image.convert("RGB"), (1600, 1103), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))
        image.save(target, "WEBP", quality=80, method=6)
        print(f"{source.name}: {source.stat().st_size // 1024} KB -> {target.name}: {target.stat().st_size // 1024} KB")
