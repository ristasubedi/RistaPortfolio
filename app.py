import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from google import genai
from pinecone import Pinecone

app = Flask(__name__)
CORS(app) # This allows your HTML file to access the Python API

@app.route('/')
def home():
    # Flask looks for this file inside a folder named "templates"
    return render_template('index.html')

# Configuration (Best practice: use environment variables)
GEMINI_KEY = "AIzaSyB9Ev0FxxjfxEwLrEBAnKDtfZqnph3WRzE" # Your key
PINECONE_KEY = "pcsk_3zrs3o_SVjWtpS7gP34H6HSaSpX42bs14Emk3bhfafg83ukLc2SrizUyvgNyeRoG1o2UVe" # Your key
PINECONE_HOST = "https://rista-portfolio-ulbt37p.svc.aped-4627-b74a.pinecone.io" # Your host

# Initialize Clients
client = genai.Client(api_key=GEMINI_KEY)
pc = Pinecone(api_key=PINECONE_KEY)
index = pc.Index(host=PINECONE_HOST)

@app.route('/ask', methods=['POST'])
def ask_portfolio():
    data = request.json
    user_query = data.get("query")

    try:
        # STEP 1: Vectorize user query
        res = client.models.embed_content(
            model="models/gemini-embedding-001",
            contents=user_query
        )
        query_vector = res.embeddings[0].values

        # STEP 2: Query Pinecone
        search_results = index.query(
            vector=query_vector,
            top_k=3,
            include_metadata=True
        )

        # STEP 3: Context & Prompt
        context_text = "\n---\n".join([match.metadata['text'] for match in search_results.matches])
        prompt = f"""
        You are a professional AI assistant for Rista Subedi's Portfolio. 
        Use the following context to answer the question. 
        Context: {context_text}
        User Question: {user_query}
        """

        # STEP 4: Generate
        response = client.models.generate_content(
            model="gemini-2.0-flash", 
            contents=prompt
        )

        return jsonify({"answer": response.text})

    except Exception as e:
        print(f"!!! CRASH ERROR: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)