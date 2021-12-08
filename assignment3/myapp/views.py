from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required

import random
from datetime import datetime, timezone

from . import models
from . import forms

# Create your views here.
def index(request):
    context = {
        "title": "Spence Tac Toe",
    }
    return render(request, "index.html", context=context)

@login_required(redirect_field_name="/")
def play(request):
    return render(request, "play.html")

def record_win_view(request):
    if request.method == 'POST':
        wins = models.WinsModel.objects.all()
        wins.wins += 1
        wins.save()

def leaderboards(request):
    context = {
        "title": "Spence Tac Toe",
    }
    return render(request, "leaderboards.html", context=context)

@login_required(redirect_field_name="/")
def chat(request):
    return render(request, "chat.html")

@login_required(redirect_field_name="/")
def room(request, room_name):
    return render(request, "room.html", {
        'room_name': room_name
    })

@login_required(redirect_field_name="/")
def comment_view(request, sugg_id):
    if request.method == "POST":
        form = forms.CommentForm(request.POST)
        if form.is_valid() and request.user.is_authenticated:
            form.save(request, sugg_id)
            return redirect("/chat/")
    else:
        form = forms.CommentForm()

    context = {
        "title": "Spence Tac Toe",
        "sugg_id": sugg_id,
        "form": form,
    }
    return render(request, "comment.html", context=context)

@login_required(redirect_field_name="/")
def suggestion_view(request):
    if request.method == "POST":
        form = forms.SuggestionForm(request.POST, request.FILES)
        if form.is_valid() and request.user.is_authenticated:
            form.save(request)
            return redirect("/chat/")
    else:
        form = forms.SuggestionForm()

    context = {
        "title": "Spence Tac Toe",
        "form": form
    }
    return render(request, "suggestion.html", context=context)

def logout_view(request):
    logout(request)
    return redirect("/")

def register_view(request):
    if request.method == "POST":
        form = forms.RegistrationForm(request.POST)
        if form.is_valid():
            form.save(request)
            return redirect("/login/")
    else:
        form = forms.RegistrationForm()

    context = {
        "title": "Registration Page",
        "form": form,
    }
    return render(request,"registration/register.html", context=context)

def suggestions_view(request):
    suggestion_objects = models.SuggestionModel.objects.all()
    suggestion_list = {}
    suggestion_list["suggestions"] = []
    for sugg in suggestion_objects:
        comment_objects = models.CommentModel.objects.filter(suggestion=sugg)
        temp_sugg = {}
        temp_sugg["suggestion"] = sugg.suggestion
        temp_sugg["id"] = sugg.id
        temp_sugg["author"] = sugg.author.username
        temp_sugg["date"] = sugg.published_on.strftime("%Y-%m-%d")
        if sugg.image:
            temp_sugg["image"] = sugg.image.url
            temp_sugg["image_desc"] = sugg.image_description
        else:
            temp_sugg["image"] = ""
            temp_sugg["image_desc"] = ""
        temp_sugg["comments"] = []
        for comm in comment_objects:
            temp_comm = {}
            temp_comm["comment"] = comm.comment
            temp_comm["id"] = comm.id
            temp_comm["author"] = comm.author.username
            time_diff = datetime.now(timezone.utc) - comm.published_on
            time_diff_s =  time_diff.total_seconds()
            if time_diff_s < 60:
                temp_comm["date"] = "published " + str(int(time_diff_s)) + "s"
            else:
                time_diff_m = divmod(time_diff_s, 60)[0]
                if time_diff_m < 60:
                    temp_comm["date"] = str(int(time_diff_m)) + "m"
                else:
                    time_diff_h = divmod(time_diff_m, 60)[0]
                    if time_diff_h < 24:
                        temp_comm["date"] = str(int(time_diff_h)) + "h"
                    else:
                        temp_comm["date"] = comm.published_on.strftime("%Y-%m-%d")
            temp_sugg["comments"] += [temp_comm]
        suggestion_list["suggestions"] += [temp_sugg]

    return JsonResponse(suggestion_list)
