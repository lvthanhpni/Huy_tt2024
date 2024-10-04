from django.shortcuts import render, get_object_or_404
from .models import Topic, News

# Create your views here.

def index(request):
  topic = Topic.objects.all()
  news = News.objects.all()
  return render(request, "home/index.html", {"topics": topic, "news": news})