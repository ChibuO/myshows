#for restful API
# if we go to /notes and send GET request, we get all endpoints
# if /notes + POST, creates post (instead of /notes/create)
# same with /notes/<id> + GET, PUT, DELETE
# basically only 2 routes

#showing this with shows

from api.models import Show
from api.serializers import ShowSerializer
from rest_framework.response import Response

def getShowsList(request):
    shows = Show.objects.all()
    #can't simply pass in shows (a list/query-set of python objects)
    #need to serialize - turn python objects into JSON format
    serializer = ShowSerializer(shows, many=True) #many - serialize multiple objects
    return Response(serializer.data)

def filterShows(request):
    method = request.GET.get('type')
    shows = Show.objects.all()
    if method:
        if method == "Completed":
            shows = Show.objects.filter(completed=True)
        elif method == "Incomplete":
            shows = Show.objects.filter(completed=False)
        elif method != "None":
            shows = Show.objects.filter(platform=method)
    
    serializer = ShowSerializer(shows, many=True)
    return Response(serializer.data)


def createShow(request):
    data = request.data
    show = Show.objects.create(
        name=data['name'],
        platform=data['platform'],
        started=data['started'],
        completed=data['completed']
    )
    serializer = ShowSerializer(show, many=False)
    return Response(serializer.data)

def getShowDetail(request, primary_key):
    shows = Show.objects.get(id=primary_key)
    serializer = ShowSerializer(shows, many=False) #many - serialize one object
    return Response(serializer.data)

def updateShow(request, primary_key):
    data = request.data
    show = Show.objects.get(id=primary_key)
    #pass in instance of note we're updating and the new data
    serializer = ShowSerializer(instance=show, data=data)

    #could do all this manually, but serializer is faster
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

def deleteShow(request, primary_key):
    show = Show.objects.get(id=primary_key)
    show.delete()
    return Response("Show was deleted!")