import sys
import os
from PIL import Image

def convert_image_to_pdf(input_path, output_path):
    try:
        if not os.path.exists(input_path):
            print(f"ERROR: Input file not found: {input_path}")
            sys.exit(1)

        file_size = os.path.getsize(input_path)
        if file_size == 0:
            print(f"ERROR: File is empty (0 bytes): {input_path}")
            sys.exit(1)

        # Debug: Check magic numbers
        with open(input_path, "rb") as f:
            header = f.read(10)
            print(f"DEBUG: File header (first 10 bytes): {header.hex()}")

        image = Image.open(input_path)
        
        # Convert to RGB (required for PDF saving if image is RGBA)
        if image.mode in ("RGBA", "P"):
            image = image.convert("RGB")
            
        image.save(output_path, "PDF", resolution=100.0)
        print("SUCCESS")

    except Exception as e:
        print(f"ERROR: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python image_to_pdf.py input.png output.pdf")
        sys.exit(1)
    
    convert_image_to_pdf(sys.argv[1], sys.argv[2])
