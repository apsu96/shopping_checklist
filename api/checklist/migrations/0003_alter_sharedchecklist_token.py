# Generated by Django 4.2.4 on 2023-10-12 22:51

import checklist.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0002_sharedchecklist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sharedchecklist',
            name='token',
            field=models.CharField(default=checklist.models.generate_random_token, max_length=64, unique=True),
        ),
    ]
