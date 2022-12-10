import django_filters
from .models import *

class ShowFilter(django_filters.FilterSet):
    class Meta:
        model: Show
        fields = '__all__'