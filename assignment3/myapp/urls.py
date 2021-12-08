from django.conf.urls import include
from django.urls import path
from django.contrib import admin
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('', views.index),
    path('play/', views.play),
    path('chat/', views.chat),
    path('chat/<str:room_name>/', views.room, name='room'),
    path('leaderboards/', views.leaderboards),
    path('login/', auth_views.LoginView.as_view()),
    path('register/', views.register_view),
    path('logout/', views.logout_view),
    path('suggestions/', views.suggestions_view),
    path('suggestion/', views.suggestion_view),
    path('comment/<int:sugg_id>/', views.comment_view),
]
