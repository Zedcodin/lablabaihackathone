from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from IPython.display import Markdown

# Import the generative model related modules
import google.generativeai as genai
import re

# Configure the generative model API key
genai.configure(api_key="")

# Set up the model
generation_config = {
    "temperature": 0.5,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 1000,
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
]

model = genai.GenerativeModel(model_name="gemini-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

app = FastAPI()

# Define the conversation variable
convo = None
new_entries = [
    
] 


name = []  

class PostData(BaseModel):
    user_message: str
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify your frontend origin(s) here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def clean_text(text):
    # Use a regular expression to remove all non-alphanumeric characters and newline characters
    cleaned_text = re.sub(r'[^a-zA-Z0-9\s]', '', text.replace('\n', ''))
    return cleaned_text

@app.post("/chat")
async def chat(data: PostData, request: Request):
        user_message = data.user_message
        print(name)

        
        
        # Initialize the conversation if not already done
        user = 'hi'
        modelres = 'hello'
        history=[
            {"role": "user", "parts": "hi"},
            {"role": "model", "parts": "Hello, I am a christianity bot. I can only help you with christian content."},
            {"role": "user", "parts": "hy"},
            {"role": "model", "parts": "Hello, I am a christianity bot. I can only help you with christian content."},
            {"role": "user", "parts": "hi"},
            {"role": "model", "parts": "Hello, I am a christianity bot. I can only help you with christian content."},
            {"role": "user", "parts": "hy"},
            {"role": "model", "parts": "Hello, I am a christianity bot. I can only help you with christian content."},
            {"role": "user", "parts": "hello"},
            {"role": "model", "parts": "Hello, I am a christianity bot. I can only help you with christian content."},
           
        ] + name
        print(history)

        convo = model.start_chat(history=history)
    
        # Continue the existing conversation
        convo.send_message("I need a brief and short answer to this:" + user_message)

    # Check if the conversation has a last message before accessing its text property
        user = {"role": "user", "parts": user_message}
        modelres = {"role": "model", "parts": clean_text(convo.last.text)}

        new = [
    {"role": "user", "parts": user_message},
    {"role": "model", "parts": convo.last.text},
         ] 
        
        name.append(user)
        name.append(modelres)
        #res = Markdown(convo.last.text)
       
        



        
       
        

    
        return {"response": convo.last.text}
    


@app.get("/test")
async def test_endpoint():
    return {"message": "This is a test endpoint for checking the server status."}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
