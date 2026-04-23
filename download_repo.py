import urllib.request
import zipfile
import io
import os
import shutil

url = "https://github.com/jckdvs4/Resume-Website/archive/refs/heads/main.zip"
print(f"Downloading {url}...")

try:
    # Use a user agent to avoid 403 Forbidden
    req = urllib.request.Request(
        url, 
        data=None, 
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    )
    
    with urllib.request.urlopen(req) as response:
        data = response.read()
        print(f"Downloaded {len(data)} bytes.")
        with zipfile.ZipFile(io.BytesIO(data)) as z:
            print("Extracting...")
            z.extractall(".")
            print("Extraction successful.")
            
    # Check for the expected directory
    if os.path.exists("Resume-Website-main"):
        print("Found extracted directory 'Resume-Website-main'.")
        # Move contents to current directory
        for item in os.listdir("Resume-Website-main"):
            s = os.path.join("Resume-Website-main", item)
            d = os.path.join(".", item)
            if os.path.exists(d):
                if os.path.isdir(d):
                    shutil.rmtree(d)
                else:
                    os.remove(d)
            shutil.move(s, d)
        os.rmdir("Resume-Website-main")
        print("Moved contents to current directory.")
            
except Exception as e:
    print(f"Error: {e}")
