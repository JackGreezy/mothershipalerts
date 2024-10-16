import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()

# Email Credentials (should be stored securely, e.g., environment variables)
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = os.getenv("SMTP_PORT")
EMAIL = os.getenv("EMAIL")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

# Function to create an email message
def create_email(to_email, subject, body):
    msg = MIMEMultipart()
    msg['From'] = EMAIL
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    return msg

# Function to notify subscribers about a new show
def notify_subscribers(subscribers, show):
    # Subject for the email
    subject = f"{show.formatted_date.month}/{show.formatted_date.day}: {show.title} Tickets Released at Mothership!"

    try:
        # Login to the SMTP server once
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Secure the connection
            server.login(EMAIL, EMAIL_PASSWORD)  # Login to your email server

            # Loop through all subscribers and send the email
            for email in subscribers:
                try:
                    # Create the email content
                    msg = MIMEMultipart()
                    msg['From'] = EMAIL
                    msg['To'] = email
                    msg['Subject'] = subject

                    # Create the body of the email (HTML format)
                    body = f"""
                    <html>
                    <body>
                        <p>Great News,</p>
                        <p>Tickets for <strong>{show.title}</strong> have just been released!</p>

                        <p><strong>Date:</strong> {show.formatted_date.strftime('%A, %B %d, %Y')} at {show.formatted_date.strftime('%I:%M %p')}<br>                        
                        <strong>Room:</strong> {show.room}</p>

                        <p>To purchase tickets, click the link below:<br>
                        <a href="{show.url}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Buy Tickets Now</a></p>

                        <hr>
                         
                        <p>If you no longer wish to receive these emails, you can <a href="{'mothershipalerts.com/unsubscribe'}" style="color: #f44336;">unsubscribe here</a>.</p>

                        <p>Best,<br>
                        Comedy Mothership Alerts Team</p>
                    </body>
                    </html>
                    """

                    # Attach the body to the email
                    msg.attach(MIMEText(body, 'html'))  # Use 'html' for proper HTML formatting

                    # Send the email
                    text = msg.as_string()  # Convert the message to a string
                    server.sendmail(EMAIL, email, text)  # Send the email

                    print(f"Email sent successfully to {email}")

                except Exception as e:
                    print(f"Failed to send email to {email}. Error: {e}")

    except Exception as e:
        print(f"Error connecting to the SMTP server: {e}")
