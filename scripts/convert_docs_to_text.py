import os
from docx import Document

def convert_docx_to_txt(input_folder, output_folder):
    """
    Converts all .docx files in the input_folder to .txt files in the output_folder.
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(input_folder):
        if filename.endswith(".docx"):
            docx_path = os.path.join(input_folder, filename)
            txt_filename = os.path.splitext(filename)[0] + ".txt"
            txt_path = os.path.join(output_folder, txt_filename)

            try:
                document = Document(docx_path)
                with open(txt_path, "w", encoding="utf-8") as f:
                    for paragraph in document.paragraphs:
                        f.write(paragraph.text + "\n")
                print(f"Converted '{filename}' to '{txt_filename}'")
            except Exception as e:
                print(f"Error converting '{filename}': {e}")

if __name__ == "__main__":
    input_dir = "/home/rosie/projects/fae-intelligence/knowledge-assets/Document"
    output_dir = "/home/rosie/projects/fae-intelligence/knowledge-assets/Converted_Documents"
    convert_docx_to_txt(input_dir, output_dir)