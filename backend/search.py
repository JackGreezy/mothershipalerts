import requests
import random
import time

from bs4 import BeautifulSoup
from datetime import datetime
from show import Show, Shows 
from mongo_utils import get_show_urls_from_mongo, save_shows_to_mongo, remove_old_shows

month_year_map = {
    1: 2025, 2: 2025, 3: 2025, 4: 2025, 5: 2025, 6: 2025,
    7: 2025, 8: 2025, 9: 2025, 10: 2024, 11: 2024, 12: 2024
}

user_agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64)',
]

def fetch_url(url):
    headers = {
        'User-Agent': random.choice(user_agents)
    }
    response = requests.get(url, headers=headers)
    
    if response.status_code == 429:  # Handle rate-limiting error
        print("Rate limited. Slowing down.")
        time.sleep(60)  # Sleep for 60 seconds and retry
        return fetch_url(url)
    
    return response

def newShowCheck(response):
    #Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(response.content, 'lxml')

    shows = Shows()
    
    #list of urls from our database we already have saved
    urls = get_show_urls_from_mongo()

    print(len(urls))
    
    #check to see if link is in the list of shows we already have
    for ol_element in soup.find_all('ol', class_='EventCardGrid_eventCardGrid__PUXxP'):
        for li in ol_element.find_all('li', recursive=False):
            a_tag = li.find('a', class_='EventCard_linkButton__9_Cv3')
            if a_tag['href'] not in urls:
                url = a_tag['href'] if a_tag else 'No URL found'
                #then we have a new show!
                #collect title
                h3_tag = li.find('h3')
                title = h3_tag.text if h3_tag else 'No title found'
                #collect date
                date_tag = li.find('div', class_='h6')
                date = date_tag.text if date_tag else 'No date found'
                ul_tag = li.find('ul', class_='EventCard_detailsWrapper__s0qUH')
                #collect time and room
                time, room = None, None
                if ul_tag:
                    li_items = ul_tag.find_all('li')
                    if len(li_items) > 1:
                        time = li_items[0].text  # Extract the time from the first <li>
                        room = li_items[1].text  # Extract the room info from the second <li>
                formatted_date = combine_date_time(date,time)
                #collect image
                img_tag = li.find('img')
                image_url = img_tag['src'] if img_tag else 'No image found'
                #collect description
                descr_tag = li.find('div', class_='EventCard_description__MdFEK EventCard_eventInfo__oo_VE body-copy small')
                description = descr_tag.text if descr_tag else 'No Description Found'

                #create show object
                show = Show(title=title, formatted_date=formatted_date, room=room, url=url, image_url=image_url, description=description)
                #add show to list of shows
                shows.add_show(show)
    #save list of shows to mongoDB
    if shows.get_all_shows():  # Check if the list of shows is not empty
        save_shows_to_mongo(shows.get_all_shows())  # Pass the list of shows to MongoDB
        print("New Shows added!")
    else:
        print("No New Shows found!")



def combine_date_time(date_str, time_str):
    # Combines the date and time strings and adds the correct year
    date_format = "%A, %b %d"  # Example: Thursday, Oct 3
    time_format = "%I:%M %p"   # Example: 10:00 PM
    
    # Parse date and time separately
    parsed_date = datetime.strptime(date_str, date_format)
    parsed_time = datetime.strptime(time_str, time_format).time()
    
    # Manually set the year to 2024, and adjust to 2025 if the date is January
    year = month_year_map[parsed_date.month]
    
    # Combine parsed date and time into a single datetime object with the correct year
    combined_datetime = datetime(year, parsed_date.month, parsed_date.day, 
                                 parsed_time.hour, parsed_time.minute)
    
    return combined_datetime


def updateMonthYear(thisMonth):
    month_year_map[thisMonth] += 1 
    print("Here is updated Month/Year map: "+ month_year_map)






