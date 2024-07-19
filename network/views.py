from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
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

def current_user(request):
    user = request.user
    return JsonResponse({
        'username': user.username
    })

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
        
def update_post(request, post_id):
    if request.method == "PUT":

        post = get_object_or_404(Post, id=post_id)

        if request.user != post.author:
            return JsonResponse({'error': 'Did you make this post? Wuit touching stuff that aint yours!'})

        body_unicode = request.body.decode('utf-8')
        request_data = json.loads(body_unicode)
        post_body = request_data.get('body')

        post_info = {
            'author': request.user,
            'author_username': request.user.username,
            'body': post_body
        }

        form = PostForm(post_info, instance=post)

        if form.is_valid():
            form.save()
            return JsonResponse({'message': 'Success!'}, status=200)
        else:
            return JsonResponse({'errors': form.errors}, status=400)
        
def home(request):
    try:
        posts = Post.objects.all().order_by("-time")
        posts_list = []
        for post in posts:
            post_dict = model_to_dict(post)
            post_dict['liked_by'] = [user.username for user in post.liked_by.all()] # these would not work with model to dict idk why
            post_dict['time'] = post.time # these would not work with model to dict idk why
            posts_list.append(post_dict)
        return JsonResponse(posts_list, safe=False)
    except Post.DoesNotExist:
        return JsonResponse({'error': 'Posts not found'}, status=404)
    
@login_required
def following_feed(request):
    try:
        user = request.user
        following_users = user.following.all()

        posts = Post.objects.filter(author__in=following_users).order_by("-time")
        posts_list = []
        for post in posts:
            post_dict = model_to_dict(post)
            post_dict['liked_by'] = [user.username for user in post.liked_by.all()] # these would not work with model to dict idk why
            post_dict['time'] = post.time # these would not work with model to dict idk why
            posts_list.append(post_dict)
        return JsonResponse(posts_list, safe=False)
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
    user_dict['followers'] = [follower.username for follower in user.followers.all()]
    user_dict['following'] = [following.username for following in user.following.all()]
    posts_dict = [model_to_dict(post, fields=[field.name for field in post._meta.fields]) for post in posts]
    for post_dict, post in zip(posts_dict, posts):
        post_dict['liked_by'] = [user.username for user in post.liked_by.all()]
        post_dict['time'] = post.time
    return user, user_dict, posts_dict

def view_profile(request, username):
    user, user_dict, posts_dict = get_user_data(username)
    if user is None:
        data = {'error': 'User not found'}
    else:
        data = {
            'username': user_dict['username'],
            'followers': user_dict['followers'],
            'following': user_dict['following'],
            'posts': posts_dict
        }
    return JsonResponse(data)