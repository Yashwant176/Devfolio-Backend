from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from .models import Blog
from .serializers import (
    UpdateUserProfileSerializer,
    UserRegistrationSerializer,
    BlogSerializer,
    userInfoSerializer
)

# Pagination class
class BlogListPagination(PageNumberPagination):
    page_size = 3


# Blog list with pagination
@api_view(["GET"])
def blog_list(request):
    blogs = Blog.objects.all()
    paginator = BlogListPagination()
    paginated_blogs = paginator.paginate_queryset(blogs, request)
    serializer = BlogSerializer(paginated_blogs, many=True)
    return paginator.get_paginated_response(serializer.data)


# User registration
@api_view(["POST"])
def register_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Update user profile
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UpdateUserProfileSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create blog
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_blog(request):
    user = request.user
    serializer = BlogSerializer(data=request.data, context={'request': request})
    if not serializer.is_valid():
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    serializer.save(author=user)
    return Response(serializer.data)


# Update blog
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_blog(request, pk):
    user = request.user
    blog = get_object_or_404(Blog, id=pk)

    if blog.author != user:
        return Response({"error": "You have to be the author of this blog"}, status=status.HTTP_403_FORBIDDEN)

    data = request.data.copy()

    # Preserve old featured_image if no new file is uploaded
    if not request.FILES.get("featured_image") and blog.featured_image:
        data["featured_image"] = blog.featured_image

    serializer = BlogSerializer(blog, data=data, partial=True, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    print("Serializer errors:", serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete blog
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_blog(request, pk):
    blog = get_object_or_404(Blog, id=pk)
    user = request.user
    if blog.author != user:
        return Response({"error": "You have to be the author of this blog"}, status=status.HTTP_403_FORBIDDEN)
    blog.delete()
    return Response({"message": "Blog Deleted Successfully"}, status=status.HTTP_200_OK)


# Get single blog
@api_view(["GET"])
def get_blog(request, slug):
    blog = get_object_or_404(Blog, slug=slug)
    serializer = BlogSerializer(blog)
    return Response(serializer.data)


# Get current user's username (public)
@api_view(["GET"])
@permission_classes([AllowAny])
def get_username(request):
    if request.user.is_authenticated:
        username = request.user.username
        return Response({"username": username})
    return Response({"username": None})


# Get user info by username (public)
@api_view(["GET"])
@permission_classes([AllowAny])
def get_userinfo(request, username):
    User = get_user_model()
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Exclude invalid fields like 'job_title'
    serializer = userInfoSerializer(user)
    return Response(serializer.data)
