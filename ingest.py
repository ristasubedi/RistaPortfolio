from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

def process_documents():
    # List all the files you want the AI to "know"
    files = [
        "assets/RistaSubedi_Resume.pdf",
        "assets/BetterSafe.pdf",
        "assets/fashionista-spec.pdf"
    ]
    
    all_chunks = []
    
    # Text Splitter settings
    # chunk_size: how many characters per piece
    # chunk_overlap: keeps context between pieces so sentences aren't cut in half
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=100,
        length_function=len
    )

    for file_path in files:
        print(f"Loading {file_path}...")
        try:
            loader = PyPDFLoader(file_path)
            pages = loader.load()
            
            # Split the pages into smaller chunks
            chunks = text_splitter.split_documents(pages)
            all_chunks.extend(chunks)
            print(f"Extracted {len(chunks)} chunks from {file_path}")
        except Exception as e:
            print(f"Error loading {file_path}: {e}")

    return all_chunks

if __name__ == "__main__":
    chunks = process_documents()
    print(f"\nTotal chunks ready for Phase 2: {len(chunks)}")
    # Example: print the first chunk to see what it looks like
    if chunks:
        print("\n--- Example Chunk ---")
        print(chunks[0].page_content)