
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("current_user", views.current_user, name="current_user"),
    path("home", views.home, name="home"),
    path("submit-post", views.submit_post, name="submit_post"),
    path("view-profile/<str:username>/", views.view_profile, name="view_profile"),
    path("following-feed", views.following_feed, name="following_feed")
]
