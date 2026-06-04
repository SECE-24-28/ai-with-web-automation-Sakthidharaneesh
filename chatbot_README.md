# Gemini Chatbot

This is a simple command-line chatbot that uses the Google Gemini API to generate responses.

## Features

- Interactive chat session in your terminal.
- Powered by the `gemini-2.5-flash` model.
- Easy to set up and run.

## Requirements

- Python 3.x
- `google-genai` library

## Setup

1.  **Clone the repository or download the `chatbot.py` script.**

2.  **Install the required Python library:**

    ```bash
    pip install -q google-genai
    ```

3.  **Get your Gemini API Key:**

    - Go to the [Google AI Studio](https://aistudio.google.com/app/apikey) and create an API key.

4.  **Set your API Key:**

    - Open the `chatbot.py` file and replace `"YOUR_API_KEY"` with your actual Gemini API key.

    ```python
    # Replace with your Gemini API Key
    API_KEY = "YOUR_API_KEY"
    ```

## How to Run

1.  Open your terminal or command prompt.
2.  Navigate to the directory where `chatbot.py` is located.
3.  Run the script using Python:

    ```bash
    python chatbot.py
    ```

4.  The chatbot will start, and you can begin typing your messages. Type `exit` to end the conversation.

    ```
    🤖 Gemini Chatbot
    Type 'exit' to stop.

    You: Hello
    Bot: Hello! How can I help you today?
    ```

## Code Overview

The script uses the `google-genai` library to interact with the Gemini API.

- It initializes the Gemini client with your API key.
- It enters a loop to continuously take user input.
- For each input, it calls the `generate_content` method of the Gemini model.
- It prints the bot's response text to the console.
- The loop breaks if the user types `exit`.
