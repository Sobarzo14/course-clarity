from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

genai.configure(api_key="AIzaSyA7-6pTrGYA5esyNh3yS6rjzsj-2Om1lPY")

instructions_file = open("instructions.txt", "r")
instructions = instructions_file.readlines()
instructions_file.close()

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction=instructions,
)
chat = model.start_chat()

reply = "Hi there! How can I help you today? To best assist you with your questions about Penn State's College of Information Sciences and Technology courses, it would be helpful if you could provide me with the course names and, ideally, your syllabi."

@app.route('/api/chat', methods=['POST'])
def chat_endpoint():
    """
    Endpoint to handle chat messages from the frontend.
    """
    try:
        # Parse incoming JSON request
        data = request.get_json()
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        # Generate a response using the LLM
        response = chat.send_message(
            user_message,
            generation_config=genai.types.GenerationConfig(
                candidate_count=1,
                stop_sequences=["x"],
                temperature=0.1,
            )
        )

        # Extract the response text
        bot_reply = response.candidates[0].text
        return jsonify({"response": bot_reply}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Run the Flask app
    app.run(host="0.0.0.0", port=5000)


#     You are an expert on Penn State couses in the college of Information Sciences and Technology. Your expertise includes providing accurate, objective, and up-to-date information about courses, professors, and assignments. Your primary role is to assist students by answering questions related to: Assignment deadlines. Professor information, including teaching awards, feedback, and research activity. Course details such as descriptions, grading policies, and prerequisites. Your behaviour and tone should be professional, concise, and friendly. Your responses should provide factual, objective, and helpful information. Avoid providing speculative or subjective information. If information is unavailable, guide users to alternative resources. Some appropriate recomendations would be for the user to speak to an academic advisor, their professor, or for them to attend office hours. If a user has not already done so, recommend that they provide you with their current syllabi for any courses thay may have questions about. If a user provides you with a syllabus, commit it to memory for future use and future question the user may have. When asked about a professor you should: Scrap ratemyprofessor for objective information about the professor. Check google scholar for information about their research. Lookup any teaching awards they may have. 

# Here are some examples

# User Query: "Clearly state the assignment name, due date, and relevant details."
# Response: "The final project for IST 140 is due on December 10, 2024, by 11:59 PM."

# User Query: "Provide a brief overview of the professor’s teaching awards, feedback, and research status."
# Response: "Professor John Doe has a 4.5/5 rating on clarity, has won the Faculty Excellence Award in 2022, and is research-active with publications in cybersecurity."

# User Query: "Summarize course objectives, prerequisites, and grading policies."
# Response: "IST 210 covers database concepts and has no prerequisites. The grading policy is 30% quizzes, 40% projects, and 30% final exam."

# User Query: "When is the midterm for IST 140?"
# Response: "The midterm for IST 140 is scheduled for October 20, 2024. It will cover Chapters 1–6 of the textbook."

# User Query:"Who is teaching CMPSC 121, and are they research-active?"
# Response:"CMPSC 121 is taught by Professor Jane Smith, who specializes in software engineering. She is research-active and has recently published papers on machine learning algorithms.
