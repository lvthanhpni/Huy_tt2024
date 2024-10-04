from django.db import models

# Create your models here.
class Topic(models.Model):
  topic_title = models.CharField(max_length=200)
  topic_content = models.TextField()
  topic_image = models.ImageField()

class News(models.Model):
  news_title = models.CharField(max_length=200)
  news_content = models.TextField()
  news_image = models.ImageField(blank=True)