import sys
import os
from PIL import Image

def convert_image(input_path, output_path, target_format):
    try:
        if not os.path.exists(input_path):
            print(f"ERROR: Input file not found: {input_path}")
            sys.exit(1)

        image = Image.open(input_path)
        
        # JPEG doesn't support alpha channel (RGBA)
        if target_format.upper() in ["JPG", "JPEG"] and image.mode in ("RGBA", "P"):
            image = image.convert("RGB")
            
        image.save(output_path)
        print("SUCCESS")

    except Exception as e:
        print(f"ERROR: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python image_to_image.py input.png output.jpg jpg")
        sys.exit(1)
    
    convert_image(sys.argv[1], sys.argv[2], sys.argv[3])
