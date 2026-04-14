import requests

task = input("What do you want to do?: ")

response = requests.post("http://localhost:4000/api/infer", json={"prompt": task, "os": "Manjaro"})

print(response.json())