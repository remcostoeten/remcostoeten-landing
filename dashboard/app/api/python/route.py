import os

def handler(request):
input_text = request.get_json().get("text")
output_text = input_text.replace("a", "")
return { "statusCode": 200, "body": output_text }
