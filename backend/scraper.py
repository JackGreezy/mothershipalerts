import time
from datetime import datetime, timezone
import random
from search import fetch_url, newShowCheck, updateMonthYear
from mongo_utils import remove_old_shows

url = 'https://comedymothership.com/shows'
thisMonth = 10 

def constantly_ping_and_cleanup():
    thisMonth = datetime.now(timezone.utc).month  # Initialize the current month
    while True:
        # Get the current time
        now = datetime.now(timezone.utc)

        # If the current time is midnight (UTC), run the task to remove old shows
        if now.hour == 0 and now.minute == 0:
            print("It is midnight UTC, removing old shows!")
            remove_old_shows()
            time.sleep(60)  # Sleep for 60 seconds to avoid running the task multiple times

            # If a new month has started, update the month/year map
            if now.month != thisMonth:
                print("It is a new month, updating Month/Year map!")
                updateMonthYear(now.month)
                thisMonth = now.month  # Update the tracked month
        
        # Collect HTML from the URL
        response = fetch_url(url)

        # Check to see if a new show has been added to the site
        # print("Checking for new shows")
        newShowCheck(response)

        # Wait a random time between 10 and 60 seconds to avoid rate limiting
        waitTime = random.uniform(10, 60)
        # print(f"Finished checking for new shows, now waiting: {waitTime:.2f} seconds.") 
        time.sleep(waitTime)



# Start the loop
if __name__ == "__main__":
    constantly_ping_and_cleanup()