# Generated by Django 4.0.5 on 2022-06-27 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='platform',
            name='color',
            field=models.CharField(default='#40c416', max_length=10),
        ),
    ]
