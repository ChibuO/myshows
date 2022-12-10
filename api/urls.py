from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('shows/', views.getShows, name="shows"),
    path('filter/', views.getFilteredShows, name="filter-shows"),
    #path('shows/create/', views.createShow, name="create-show"),
    #path('shows/<str:primary_key>/update/', views.updateShow, name="update-show"),
    #path('shows/<str:primary_key>/delete/', views.deleteShow, name="delete-show"),
    path('platforms/', views.getPlatforms, name="platform"),
    path('platforms/create/', views.createPlatform, name="create-platform"),
    path('shows/<str:primary_key>/', views.getShow, name="show"),
]