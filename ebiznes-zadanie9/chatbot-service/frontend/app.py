import streamlit as st
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_URL = os.getenv("API_URL", "http://localhost:8000")

st.set_page_config(
    page_title="AI Chat Assistant",
    page_icon="💬",
    layout="centered"
)

st.title("AI Chat Assistant")
st.write("Enter your message below to chat with the AI assistant.")

if "messages" not in st.session_state:
    st.session_state.messages = []

def send_message_to_api(message):
    try:
        response = requests.post(
            f"{API_URL}/api/chat/send",
            json={"message": message},
            headers={"Content-Type": "application/json"}
        )
        response.raise_for_status()
        return response.json()["response"]
    except requests.exceptions.RequestException as e:
        st.error(f"Error communicating with the API: {str(e)}")
        return None

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("Type your message here..."):
    with st.chat_message("user"):
        st.markdown(prompt)
    
    st.session_state.messages.append({"role": "user", "content": prompt})
    
    with st.spinner("AI is thinking..."):
        response_text = send_message_to_api(prompt)
    
    if response_text:
        with st.chat_message("assistant"):
            st.markdown(response_text)
        
        st.session_state.messages.append({"role": "assistant", "content": response_text})