from django.contrib import admin

# Register your models here.

from .models import Show, Platform

admin.site.register(Show)
admin.site.register(Platform)