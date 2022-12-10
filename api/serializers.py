from rest_framework.serializers import ModelSerializer
from .models import Show
from .models import Platform

class ShowSerializer(ModelSerializer):
    class Meta:
        model = Show
        fields = '__all__'

class PlatformSerializer(ModelSerializer):
    class Meta:
        model = Platform
        fields = '__all__'