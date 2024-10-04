class Show:
    def __init__(self, title, formatted_date, room, url, image_url, description):
        self.title = title
        self.formatted_date = formatted_date
        self.room = room
        self.url = url
        self.image_url = image_url
        self.description = description

        def __repr__(self):
            return f"Show(title='{self.title}', date='{self.date}')"

# Define the 'Shows' class to hold a list of 'Show' objects
class Shows:
    def __init__(self):
        self.show_list = []

    def add_show(self, show):
        self.show_list.append(show)
    
    def get_all_shows(self):
        return self.show_list

    def __repr__(self):
        return f"Shows: {self.show_list}"
    
        

