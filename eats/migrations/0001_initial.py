# Generated by Django 2.0.7 on 2018-07-12 22:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('address', models.TextField()),
                ('photo', models.ImageField(blank=True, null=True, upload_to='food/photos/')),
                ('menu', models.TextField()),
                ('tags', models.CharField(max_length=200)),
                ('pub_date', models.DateTimeField(auto_now_add=True)),
                ('writer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
