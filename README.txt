My Shows Website

This website is built with a React frontend and a Django + SQLite backend.
The Django REST API is also used the the application isn't entirely RESTful.
It is meant to be used as a record of the TV shows that a user has watched.

To start:
Go into the directory for the django project, type "python manage.py runserver"

How to Use
To add a a show, click "Add New". All details must be entered in order to add a show.
Users enter in the show's name, the platform they watched it on, the day they started watching, and if they completed the show.
If you select "Other" for the platform, ypu can enter in the platform name and it will be added to the platform list upon submission.

To delete a show or edit it's details, hover over it and click on the pencil icon.
If a show is completed, an eye icon appears after the started date.

Double clicking a show displays information about the show retrieved from the TV Maze API.
THe API will find the closest match for the show. If a show has a reboot, the latest version will be shown.
If the title given isn't a perfect match, then the API returns the 10 closest matches that can be view by clicking on the arrows on the image.
If the API can't find anything, a notification will pop up and a message will be shown.
Double-click outside the box to exit.

Users can also sort the shows and filter by complteion.

How it Works
"http://127.0.0.1:8000" is included in package.json as a proxy.
The React frontend is placed inside the django folder.
The frontend has a state manager (showState.js) that stores the list of shows, list of platforms, selected show, and fill/sort methods.
To get the shows list, getShows is called, which uses fetch to send a GET request to /api/shows/
In django, getShows() is called (myapi/views.py, myapi/utils.py) which returns all the shows in the database.
This is the same for getPlatforms().

When a new show is created, createShow() is called, which sends a POST request to /api/shows/, this time with a json dictionary in the body.
This goes to createShow() in myapi which adds the new show to the database.
This is the same for createPlatform().

Deleting a show -> deleteShow()
Editing a show -> updateShow() -> json dictionary with new data updates the entry in the database

The sortShows() method takes in the list given and returns a sorted list. getSorted() is used to return the correct sorting method.
getFiltered() sends a GET request to /api/filter/?type=<>. The type indicates how the data should be filtered.
In myapi/views, getFilteredShows() returns the filtered data.

The TV Maze API is used to get details on any tv show in it's database. 
In ShowDetailPage.js, axios is used to send a get request to http://api.tvmaze.com/search/shows?q=<>
The data returned is checked for accuracy and displayed.

Possible Improvements:
- Add media sizes
- Find out why it's not updating immediately every time

To Fix CORS Problem:
Add the allowed urls to CORS_ALLOWED_ORIGINS list

To Integrate React Frontend into Django Project (already done):
Reference: https://www.youtube.com/watch?v=F9o4GSkSo40&ab_channel=DennisIvy
- Make sure the react folder is inside the django project folder
- Run "npm run build" in the React folder
- Need to connect to the index.html file in the build version sort
    - In settings.py (djangoo project), add " BASE_DIR / 'ms_frontend/build' " to DIRS in TEMPLATES
- in urls.py in the base directory:
    - import TemplateView ->for rendering template (class-based) without calling a view
    - add " path('', TemplateView.as_view(template_name='index.html')) "
    - add staticfilesdir in settings.py

References:
https://www.youtube.com/watch?v=tYKRAXIio28&ab_channel=DennisIvy
https://www.youtube.com/watch?v=zDwgTRkPkF4&t=5344s&ab_channel=TheFullStackJunkie