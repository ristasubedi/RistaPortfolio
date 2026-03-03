import os
import time
from google import genai
from pinecone import Pinecone
from ingest import process_documents # Reuses your Phase 1 code

# 1. Setup Keys
GEMINI_KEY = "AIzaSyB9Ev0FxxjfxEwLrEBAnKDtfZqnph3WRzE"
PINECONE_KEY = "pcsk_3zrs3o_SVjWtpS7gP34H6HSaSpX42bs14Emk3bhfafg83ukLc2SrizUyvgNyeRoG1o2UVe"
# Find this in your Pinecone dashboard under the 'rista-portfolio' index
PINECONE_HOST = "https://rista-portfolio-ulbt37p.svc.aped-4627-b74a.pinecone.io"

# Initialize
client = genai.Client(api_key=GEMINI_KEY)
pc = Pinecone(api_key=PINECONE_KEY)
index = pc.Index(host=PINECONE_HOST)

def upload_to_pinecone():
    # --- STEP 1: DEBUG MODELS (Optional but recommended) ---
    print("Checking available embedding models...")
    for m in client.models.list():
        if 'embedContent' in m.supported_actions:
            print(f"-> Available: {m.name}")

    # --- STEP 2: PROCESS DOCS ---
    chunks = process_documents()
    print(f"\nTotal chunks to process: {len(chunks)}")
    
    vectors = []
    # Using the NEW supported model name
    target_model = "gemini-embedding-001" 

    for i, chunk in enumerate(chunks):
        try:
            content = chunk.page_content
            
            result = client.models.embed_content(
                model=target_model,
                contents=content
            )
            
            vectors.append({
                "id": f"chunk_{i}",
                "values": result.embeddings[0].values,
                "metadata": {"text": content}
            })
            
            # Add this tiny delay to respect the Free Tier 100/min limit
            time.sleep(0.6) 

            if i % 20 == 0:
                print(f"✅ Processed {i}/{len(chunks)}...")
                
        except Exception as e:
            print(f"❌ Error on chunk {i}: {e}")
            return # Stop if we hit a dimension mismatch or model error

    # --- STEP 3: UPSERT ---
    if vectors:
        print(f"Upserting {len(vectors)} vectors to Pinecone...")
        index.upsert(vectors=vectors)
        print("🚀 DATABASE POPULATED!")

if __name__ == "__main__":
    upload_to_pinecone()