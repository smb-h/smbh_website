from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework.views import APIView

from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView

from rest_framework.permissions import (
                                            AllowAny,
                                            IsAuthenticated,
                                            IsAdminUser,
                                            IsAuthenticatedOrReadOnly
                                        )
from app.api.permissions import IsOwnerOrReadOnly
from .serializers import (
                            UserCreateSerializer,
                            UserDetailSerializer,
                            UserLoginSerializer,
                            GroupSerializer
                        )
# OAuth 2
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope



User = get_user_model()


# User Create
class UserCreateAPIView(CreateAPIView):
    # queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]


# User Detail
class UserDetailAPIView(RetrieveAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    lookup_field = 'slug'


# User Login
class UserLoginAPIView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]


# Group List
class GroupListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated, TokenHasScope]
    required_scopes = ['groups']
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
