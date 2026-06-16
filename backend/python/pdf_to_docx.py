import sys
import os
try:
    from pdf2docx import Converter
except ImportError:
    print("ERROR: pdf2docx library not installed. Run: pip install pdf2docx")
    sys.exit(1)

def convert_pdf_to_docx(pdf_file, docx_file):
    try:
        if not os.path.exists(pdf_file):
            print(f"ERROR: Input file not found: {pdf_file}")
            sys.exit(1)

        cv = Converter(pdf_file)
        cv.convert(docx_file, start=0, end=None)
        cv.close()
        print("SUCCESS")
    except Exception as e:
        print(f"ERROR: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python pdf_to_docx.py input.pdf output.docx")
        sys.exit(1)
    
    convert_pdf_to_docx(sys.argv[1], sys.argv[2])
