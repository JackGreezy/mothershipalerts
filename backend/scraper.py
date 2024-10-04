import time
from datetime import datetime
import random
import threading
from search import fetch_url, newShowCheck, remove_old_shows, updateMonthYear



url = 'https://comedymothership.com/shows'
thisMonth = 0 


def constantly_ping_and_cleanup():
    while True:
        # Get the current time
        now = datetime.now()

        # If the current time is midnight (or close to it), run the task to remove old shows
        if now.hour == 0 and now.minute == 0:
            #need to make sure this is the right time zone...
            print("It is midnight, removing old shows!")
            remove_old_shows()
            # Sleep for 60 seconds to avoid running the task multiple times in the same minute
            time.sleep(60)
            #if new month then increment year
            if now.month != thisMonth:
                print("It is a new month, updating Month/Year map!")
                updateMonthYear(thisMonth)
        thisMonth = now.month
    

                

        # Collect HTML from the URL
        response = fetch_url(url)

        # Check to see if a new show has been added to the site
        print("Checking for new shows")
        newShowCheck(response)

        # Wait a random time between 10 and 60 seconds to avoid rate limiting
        waitTime = random.uniform(10, 60)
        print("Finished checking for new shows, now waiting: " + str(waitTime)+ " seconds.") 
        time.sleep(waitTime)


# Start the loop
if __name__ == "__main__":
    constantly_ping_and_cleanup()