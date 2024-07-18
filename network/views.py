from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.forms.models import model_to_dict
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
import json

from .models import *


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def submit_post(request):

    if request.method == "POST":
        # decode byte string manually
        body_unicode = request.body.decode('utf-8')
        request_data = json.loads(body_unicode)
        post_body = request_data.get('body')
        
        post_info = {
            'author': request.user,
            'author_username': request.user.username,
            'body': post_body
        }

        form = PostForm(post_info)

        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Success!'}, status=200)
        else:
            return JsonResponse({'errors': form.errors}, status=400)
        
def home(request):
    try:
        posts = Post.objects.values().order_by("-time")
        return JsonResponse(list(posts), safe=False)
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Posts not found'}, status=404)
    
def get_user_data(username):
    try:
        user = get_object_or_404(User, username=username)
    except User.DoesNotExist:
        return None, None, None
    posts = Post.objects.filter(author=user)
    # make user and post instance serializable as dicts
    user_dict = model_to_dict(user)
    posts_dict = [model_to_dict(post) for post in posts]
    return user, user_dict, posts_dict

def view_profile(request, username):
    user, user_dict, posts_dict = get_user_data(username)
    if user is None:
        data = {'error': 'User not found'}
    data = {
        'username': user_dict['username'],
        'followers': user.followers.count(),
        'following': user.following.count(),
        'posts': posts_dict
    }
    return JsonResponse(data)