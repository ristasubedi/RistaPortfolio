from google import genai
from pinecone import Pinecone

# 1. Configuration
GEMINI_KEY = "AIzaSyB9Ev0FxxjfxEwLrEBAnKDtfZqnph3WRzE"
PINECONE_KEY = "pcsk_3zrs3o_SVjWtpS7gP34H6HSaSpX42bs14Emk3bhfafg83ukLc2SrizUyvgNyeRoG1o2UVe"
# Find this in your Pinecone dashboard under the 'rista-portfolio' index
PINECONE_HOST = "https://rista-portfolio-ulbt37p.svc.aped-4627-b74a.pinecone.io"

# 2. Initialize Clients
client = genai.Client(api_key=GEMINI_KEY)
pc = Pinecone(api_key=PINECONE_KEY)
index = pc.Index(host=PINECONE_HOST)

def ask_portfolio(query):
    # STEP 1: Turn the user's question into a vector
    print(f"\n🔍 Searching for: {query}...")
    res = client.models.embed_content(
        model="models/gemini-embedding-001",
        contents=query
    )
    query_vector = res.embeddings[0].values

    # STEP 2: Query Pinecone for the top 3 most relevant chunks
    search_results = index.query(
        vector=query_vector,
        top_k=3,
        include_metadata=True
    )

    # STEP 3: Extract the text from those chunks
    context_text = "\n---\n".join([match.metadata['text'] for match in search_results.matches])

    # STEP 4: Build the "Prompt" for Gemini
    prompt = f"""
    You are a professional AI assistant for Rista Subedi's Portfolio. 
    Use the following context from Rista's resume and project specs to answer the question.
    If the answer isn't in the context, say you don't know, but be polite.

    CONTEXT:
    {context_text}

    USER QUESTION: 
    {query}

    ANSWER:
    """

    # STEP 5: Generate the answer
    response = client.models.generate_content(
        model="models/gemini-2.5-flash", # Using the fast, smart 2.0 Flash model
        contents=prompt
    )

    print("\n🤖 AI RESPONSE:")
    print(response.text)

if __name__ == "__main__":
    while True:
        user_input = input("\nAsk Rista's Bot (or type 'quit'): ")
        if user_input.lower() == 'quit':
            break
        ask_portfolio(user_input)