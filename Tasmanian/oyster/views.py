import os
from wsgiref.types import FileWrapper
from django.shortcuts import redirect, render
from django.core.mail import send_mail
from django.conf import settings
from .models import Querie


# Create your views here.
def index(request):
    
    return render(request,"hello.html")

def reserve(request):
    
    return render(request,"reserve.html")

def recepie(request):
    
    return render(request,"recepie.html")

def boomer(request):    
    return render(request,"boomer-bay.html")

def pipelay(request):    
    return render(request,"pipelay-lagoon.html")

def duckbay(request):    
    return render(request,"duck-bay.html")


def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        new_Querie = Querie(name = name, email= email,message=message )
        new_Querie.save()

        send_mail(
                "Query Received",
                "We received your request we will get back to you shortly.",
                "programmerme100@gmail.com",
                [email],
                fail_silently=False,
            ) 
    
    context = {}
    return render(request,"contact-us.html",context)

def about(request):    
    return render(request,"about.html")

def retail(request):    
    return render(request,"retail.html")
def wholesale(request):    
    return render(request,"wholesale.html")
def restaurant(request):    
    return render(request,"Restaurant.html")
def export(request):    
    return render(request,"export.html")
def result(request): 
    if request.method =='get':
        return redirect("result.html")   
    return render(request,"result.html")


