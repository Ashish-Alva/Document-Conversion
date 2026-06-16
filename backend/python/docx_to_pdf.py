import sys
import mammoth
from xhtml2pdf import pisa
import os

def convert_docx_to_pdf(input_file, output_file):
    try:
        if not os.path.exists(input_file):
            print(f"ERROR: Input file not found: {input_file}")
            sys.exit(1)

        # Step 1: DOCX → HTML
        with open(input_file, "rb") as docx_file:
            result = mammoth.convert_to_html(docx_file)
            html = result.value

        # Optional: add basic styling
        html_content = f"""
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {{ font-family: Arial, sans-serif; padding: 20px; }}
                h1, h2, h3 {{ color: #333; }}
                p {{ margin: 10px 0; }}
            </style>
        </head>
        <body>
            {html}
        </body>
        </html>
        """

        # Step 2: HTML → PDF
        with open(output_file, "wb") as pdf_file:
            pisa_status = pisa.CreatePDF(html_content, dest=pdf_file)

        if pisa_status.err:
            print("ERROR: PDF generation failed during HTML to PDF step")
            sys.exit(1)

        print("SUCCESS")

    except Exception as e:
        print(f"ERROR: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python docx_to_pdf.py input.docx output.pdf")
        sys.exit(1)
    
    convert_docx_to_pdf(sys.argv[1], sys.argv[2])
