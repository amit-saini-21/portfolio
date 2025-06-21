from flask import Flask, render_template, request
from pymongo import MongoClient
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
app = Flask(__name__)


app.secret_key = os.environ.get('SECRET_KEY')
MONGO_URI=os.environ.get('URI')
SENDGRID_API_KEY=os.environ.get('MAIL')

client = MongoClient(MONGO_URI)
db = client['portfolio_contacts']
collection = db['port_contact']


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        subject = request.form.get("subject")
        message = request.form.get("message")


        collection.insert_one({
            "name": name,
            "email": email,
            "subject": subject,
            "message": message
        })
        send_email_via_sendgrid(name, email, subject, message)
        return "success", 200  # Just return text for JS to read
    return render_template("index.html")

def send_email_via_sendgrid(name, email, subject, message):
    try:
        content = f'''
        Hello Amit,

You have received a new message through your portfolio contact form.

Details:

Name: {name} 

Email: {email}

Subject: {subject} 

Message:
    {message}

This message was sent through the contact form on your portfolio website.

Regards,  
Your Portfolio Bot 💼

'''

        message = Mail(
            from_email='sumitsainisumit502@gmail.com',
            to_emails='deepakdee234paksharma@gmail.com',
            subject='New Contact Form Submission',
            plain_text_content=content
        )

        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
    except Exception as e:
        print(f"SendGrid Error: {e}")

if __name__ == "__main__":

    app.run(debug=False)

