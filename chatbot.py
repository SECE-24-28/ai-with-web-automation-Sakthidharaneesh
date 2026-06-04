# Install the new Gemini SDK
!pip install -q google-genai

from google import genai

# Replace with your Gemini API Key
API_KEY = "AQ.Ab8RN6J3uL-hoY8N20MRZeW4ckxqOfRlbpqym03r58WYVmWQeQ"

client = genai.Client(api_key=API_KEY)

print("🤖 Gemini Chatbot")
print("Type 'exit' to stop.\n")

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        print("Goodbye!")
        break

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=user_input
        )


        print("\nBot:", response.text)
        print()

    except Exception as e:
        print("Error:", e)