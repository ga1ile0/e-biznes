import random

CONVERSATION_OPENINGS = [
    "Welcome! How can I assist you today with your shopping needs?",
    "Hello there! I'm here to help with any questions about our products.",
    "Greetings! Looking for something specific in our shop today?",
    "Hi! I'd be happy to help you find what you're looking for in our store.",
    "Good day! How may I assist you with our product selection?"
]

CONVERSATION_CLOSINGS = [
    "Thank you for chatting with us today. Feel free to return if you have more questions!",
    "I hope I've been helpful. Have a great shopping experience!",
    "If you need anything else, don't hesitate to ask. Have a wonderful day!",
    "Thank you for your interest in our products. Is there anything else you'd like to know?",
    "I'm glad I could assist you today. Come back anytime for more help!"
]

def get_random_opening():
    return random.choice(CONVERSATION_OPENINGS)

def get_random_closing():
    return random.choice(CONVERSATION_CLOSINGS)

def is_greeting(message):
    greeting_phrases = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy"]
    message_lower = message.lower()
    return any(phrase in message_lower for phrase in greeting_phrases)

def is_farewell(message):
    farewell_phrases = ["bye", "goodbye", "see you", "farewell", "thanks", "thank you", "that's all", "exit", "quit"]
    message_lower = message.lower()
    return any(phrase in message_lower for phrase in farewell_phrases)