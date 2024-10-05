import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Email Credentials (should be stored securely, e.g., environment variables)
SMTP_SERVER = 'mail.privateemail.com'
SMTP_PORT = 465
USERNAME = 'alerts@mothershipalerts.com'
PASSWORD = 'your-email-password'  # Ideally, store this securely (e.g., environment variables)

# Function to create an email message
def create_email(to_email, subject, body):
    msg = MIMEMultipart()
    msg['From'] = USERNAME
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    return msg

# Function to send an email
def send_email(to_email, subject, body):
    try:
        # Set up the server with your email credentials
        server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)
        server.login(USERNAME, PASSWORD)

        # Create the email content
        msg = create_email(to_email, subject, body)

        # Send the email
        server.sendmail(USERNAME, to_email, msg.as_string())
        print(f"Email sent successfully to {to_email}")
        
        # Close the server connection
        server.quit()
    except Exception as e:
        print(f"Error sending email: {str(e)}")

# Function to notify subscribers about a new show
def notify_subscribers(subscribers, show_details):
    # Your email credentials (update these with your privateemail.com account)
    smtp_server = "mail.privateemail.com"
    smtp_port = 587  # This may vary depending on your email provider's settings
    sender_email = "alerts@mothershipalerts.com"
    sender_password = "your_email_password"

    # Subject for the email
    subject = "New Comedy Mothership Show Released!"

    # Loop through all subscribers and send the email
    for email in subscribers:
        try:
            # Create the email content
            msg = MIMEMultipart()
            msg['From'] = sender_email
            msg['To'] = email
            msg['Subject'] = subject

            # Create the body of the email
            body = f"""
            Hi there,

            A new show has been released on Comedy Mothership. Get your tickets before they sell out!

            Details:
            {show_details}

            Best,
            Comedy Mothership Alerts Team
            """

            # Attach the body to the email
            msg.attach(MIMEText(body, 'plain'))

            # Send the email
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()  # Secure the connection
                server.login(sender_email, sender_password)  # Login to your email server
                text = msg.as_string()  # Convert the message to a string
                server.sendmail(sender_email, email, text)  # Send the email

            print(f"Email sent successfully to {email}")

        except Exception as e:
            print(f"Failed to send email to {email}. Error: {e}")