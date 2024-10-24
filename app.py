import openai

openai.api_key = "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"


completion = openai.ChatCompletion.create(
    model="ft:gpt-3.5-turbo-0125:personal::AJT4aDHu",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)
print(completion.choices[0].message)

