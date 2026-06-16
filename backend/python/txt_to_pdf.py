import sys
import os
try:
    from reportlab.lib.pagesizes import letter
    from reportlab.pdfgen import canvas
except ImportError:
    print("ERROR: reportlab library not installed. Run: pip install reportlab")
    sys.exit(1)

def convert_txt_to_pdf(input_path, output_path):
    try:
        if not os.path.exists(input_path):
            print(f"ERROR: Input file not found: {input_path}")
            sys.exit(1)

        # Read and normalize line endings
        with open(input_path, "r", encoding="utf-8", errors="replace") as f:
            text = f.read()

        # Normalize ALL line ending variants → \n
        text = text.replace("\r\n", "\n").replace("\r", "\n")

        # Strip any remaining non-printable control chars (except \n and \t)
        import re
        text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)

        c = canvas.Canvas(output_path, pagesize=letter)
        width, height = letter

        x = 50
        y = height - 50
        c.setFont("Helvetica", 10)

        lines = text.split("\n")

        for line in lines:
            if y < 50:
                c.showPage()
                y = height - 50
                c.setFont("Helvetica", 10)
            
            # Simple word wrap or truncation
            c.drawString(x, y, line[:100]) # Basic truncation for safety
            y -= 15

        c.save()
        print("SUCCESS")

    except Exception as e:
        print(f"ERROR: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python txt_to_pdf.py input.txt output.pdf")
        sys.exit(1)
    
    convert_txt_to_pdf(sys.argv[1], sys.argv[2])
