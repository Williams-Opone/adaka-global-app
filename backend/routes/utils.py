# backend/utils.py
from flask_mail import Message
from extensions import mail

def send_newsletter_blast(subscribers, asset_name):
    # Get all emails as a list
    email_list = [s.email for s in subscribers]
    
    if not email_list:
        return

    msg = Message(
        subject="New Arrival: " + asset_name + " is now available!",
        sender="your-email@yourdomain.com",
        bcc=email_list,  # BCC is essential for newsletters
        html=f"""
        <h1>New Drop at ADAKA GLOBAL</h1>
        <p>Hello! We've just added <strong>{asset_name}</strong> to our inventory.</p>
        <p>Check out our latest arrivals at our website.</p>
        <br/>
        <p>Best regards,<br/>The Adaka Global Team</p>
        """
    )
    mail.send(msg)