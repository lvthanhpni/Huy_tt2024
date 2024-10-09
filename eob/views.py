from typing import Any
from django.shortcuts import render, get_object_or_404
from .models import Topic, News
from django.views.generic import TemplateView, FormView
from .forms import RegisterForm, LoginForm
from django.urls import reverse_lazy

# Create your views here.

class IndexView(TemplateView):
  template_name = "home/index.html"

  def get_context_data(self, **kwargs) :
    context = super().get_context_data(**kwargs)
    context['topics'] = Topic.objects.all()
    context['news'] = News.objects.all()
    return context 

class UserRegisterView(FormView):
  template_name = "home/registry.html"
  form_class = RegisterForm
  success_url = reverse_lazy('success')

  def form_valid(self, form):
    organization = form.cleaned_data['organization']
    name = form.cleaned_data['name']
    phone_number = form.cleaned_data['phone_number']
    email = form.cleaned_data['email']
    password = form.cleaned_data['password']
    confirm_password = form.cleaned_data['confirm_password']
    return super().form_valid(form)
  
class UserLoginView(FormView):
  template_name = "home/login.html"
  form_class = LoginForm
  success_url = ""

  def form_valid(self, form):
    email = form.cleaned_data['email']
    password = form.cleaned_data['password']
    return super().form_valid(form)