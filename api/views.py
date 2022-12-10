from platform import platform
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Platform, Show
from .serializers import ShowSerializer, PlatformSerializer
from .utils import *
from .filters import ShowFilter

# Create your views here.

#function based view, done RESTfully for shows but not platforms
@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/shows/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of shows'
        },
        {
            'Endpoint': '/shows/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single show object'
        },
        {
            'Endpoint': '/shows/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new show with data sent in post request'
        },
        {
            'Endpoint': '/shows/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing show with data sent in post request'
        },
        {
            'Endpoint': '/shows/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting show'
        },
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
def getShows(request):
    if request.method == 'GET':
        return getShowsList(request)

    if request.method == 'POST':
        return createShow(request)

@api_view(['GET'])
def getFilteredShows(request):
    return filterShows(request)

@api_view(['GET', 'PUT', 'DELETE'])
def getShow(request, primary_key):
    if request.method == 'GET':
        return getShowDetail(request, primary_key)

    if request.method == 'PUT':
        return updateShow(request, primary_key)

    if request.method == 'DELETE':
        return deleteShow(request, primary_key)

@api_view(['GET'])
def getPlatforms(request):
    platforms = Platform.objects.all()
    #can't simply pass in shows (a list/query-set of python objects)
    #need to serialize - turn python objects into JSON format
    serializer = PlatformSerializer(platforms, many=True) #many - serialize multiple objects
    return Response(serializer.data)

@api_view(['POST']) #put for updating, post for creating
def createPlatform(request):
    data = request.data
    platforms = Platform.objects.all()
    #check if platform doesn't already exist
    if not platforms.filter(name=data['name']).exists():
        platform = Platform.objects.create(
            name=data['name'],
            color=data['color']
        )
        serializer = PlatformSerializer(platform, many=False)
        return Response(serializer.data)
    else:
        print(f"{data['name']} already exists")
        return Response()