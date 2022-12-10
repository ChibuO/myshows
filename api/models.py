from django.db import models

# Create your models here.

class Show(models.Model):
    name = models.CharField(max_length=50)
    platform = models.CharField(max_length=50)
    started = models.DateField()
    completed = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Platform(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=10)

    def __str__(self):
        return self.name
