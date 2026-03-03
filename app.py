import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from google import genai
from pinecone import Pinecone
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app) # This allows your HTML file to access the Python API

@app.route('/')
def home():
    # Flask looks for this file inside a folder named "templates"
    return render_template('index.html')


GEMINI_KEY = os.environ.get("GEMINI_KEY")
PINECONE_KEY = os.environ.get("PINECONE_KEY")
PINECONE_HOST = os.environ.get("PINECONE_HOST")

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
    # Use the PORT environment variable provided by Render
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)