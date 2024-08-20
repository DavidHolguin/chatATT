import openai
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY

def get_chatgpt_response(message, context):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": context},
            {"role": "user", "content": message}
        ]
    )
    return response.choices[0].message['content']