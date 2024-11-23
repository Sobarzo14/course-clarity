import google.generativeai as genai

instructions_file = open("instructions.txt", "r")
instructions = instructions_file.readlines()
instructions_file.close()

genai.configure(api_key="AIzaSyA7-6pTrGYA5esyNh3yS6rjzsj-2Om1lPY")
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction=instructions,
)
chat = model.start_chat()

reply = "Hi there! How can I help you today? To best assist you with your questions about Penn State's College of Information Sciences and Technology courses, it would be helpful if you could provide me with the course names and, ideally, your syllabi."

while True:
    prompt = input('\n\n' + reply + '\n\n')
    response = chat.send_message(
        "" + prompt,
        generation_config=genai.types.GenerationConfig(
            candidate_count=1,
            stop_sequences=["x"],
            temperature=0.1,
        ),
    )
    reply = response.text
