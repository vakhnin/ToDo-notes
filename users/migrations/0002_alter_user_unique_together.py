# Generated by Django 3.2.14 on 2023-08-17 07:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='user',
            unique_together={('username',)},
        ),
    ]
