import sys
import os
try:
    from pdf2image import convert_from_path
except ImportError:
    print("ERROR: pdf2image library not installed. Run: pip install pdf2image")
    sys.exit(1)

def convert_pdf_to_image(input_path, output_path, target_format):
    try:
        if not os.path.exists(input_path):
            print(f"ERROR: Input file not found: {input_path}")
            sys.exit(1)

        # Convert only the first page for simplicity in this MVP
        pages = convert_from_path(input_path, first_page=1, last_page=1)
        
        if pages:
            pages[0].save(output_path, target_format.upper())
            print("SUCCESS")
        else:
            print("ERROR: No pages found in PDF")
            sys.exit(1)

    except Exception as e:
        print(f"ERROR: {str(e)}")
        if "poppler" in str(e).lower():
            print("TIP: Poppler is required for pdf2image. Install it on your system.")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python pdf_to_image.py input.pdf output.jpg jpg")
        sys.exit(1)
    
    convert_pdf_to_image(sys.argv[1], sys.argv[2], sys.argv[3])
