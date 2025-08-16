from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Blog

# Serializer for updating user profile
class UpdateUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            "id", "email", "username", "first_name", "last_name",
            "bio", "profile_picture", "job_title",
            "facebook", "youtube", "instagram", "twitter"
        ]


# Serializer for user registration
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "first_name", "last_name", "password"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        username = validated_data["username"]
        first_name = validated_data["first_name"]
        last_name = validated_data["last_name"]
        password = validated_data["password"]

        user = get_user_model().objects.create(
            username=username,
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        user.save()
        return user


# Simple author serializer for Blog
class SimpleAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id','username', 'first_name', 'last_name','profile_picture']


# Blog serializer
class BlogSerializer(serializers.ModelSerializer):
    author = SimpleAuthorSerializer(read_only=True)

    class Meta:
        model = Blog
        fields = [
            'id','title','slug','category','content','author',
            'created_at','updated_at','published_date','is_draft',
            'category','featured_image'
        ]


# User info serializer with posts
class userInfoSerializer(serializers.ModelSerializer):
    author_posts = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = [
            'id','username', 'first_name', 'last_name',
            'profile_picture', "bio", "job_title", "author_posts"
        ]

    def get_author_posts(self, user):
        blogs = Blog.objects.filter(author=user)[:9]
        serializer = BlogSerializer(blogs, many=True)
        return serializer.data
