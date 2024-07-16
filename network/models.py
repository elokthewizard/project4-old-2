from django.contrib.auth.models import AbstractUser
from django.db import models
from django.forms import ModelForm


class User(AbstractUser):
    pass
    bio = models.CharField(max_length=128, blank=True)
    followers = models.ManyToManyField('self', related_name="followed_by", blank=True, symmetrical=False)
    following = models.ManyToManyField('self', related_name="is_following", blank=True, symmetrical=False)

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    author_username = models.CharField(max_length=32)
    body = models.TextField(max_length=128)
    time = models.DateTimeField(auto_now_add=True)
    liked_by = models.ManyToManyField(User, related_name="liked_by", blank=True)

class newPostForm(ModelForm):

    class Meta:
        model = Post
        exclude = ["liked_by"]