import zipfile
import xml.etree.ElementTree as ET
import sys
import os

def check_python_command():
    # This is just a helper to see what we are running on, 
    # but the logic below is standard python
    pass

def extract_text_from_docx(docx_path):
    if not os.path.exists(docx_path):
        print(f"Error: File not found at {docx_path}")
        return

    try:
        with zipfile.ZipFile(docx_path) as z:
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            
            # Namespace map usually required for docx xml
            namespaces = {
                'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
            }
            
            text = []
            # Find all text nodes
            for p in tree.findall('.//w:p', namespaces):
                line = []
                for t in p.findall('.//w:t', namespaces):
                    if t.text:
                        line.append(t.text)
                if line:
                    text.append(''.join(line))
            
            return '\n'.join(text)
    except Exception as e:
        print(f"Error extracting text: {e}")
        return None

if __name__ == "__main__":
    file_path = os.path.join("Resume-Website-main", "Jack Davis Resume 2022v2.docx")
    print(f"Attempting to read: {file_path}")
    content = extract_text_from_docx(file_path)
    if content:
        print("\n--- Extracted Content ---\n")
        print(content)
        print("\n--- End of Content ---\n")
        
        # Save to a file for easier reading later if needed
        with open("resume_content.txt", "w", encoding="utf-8") as f:
            f.write(content)
            print("Saved content to resume_content.txt")
