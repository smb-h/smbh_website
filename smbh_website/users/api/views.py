from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from rest_framework.permissions import (
                                            AllowAny,
                                            IsAuthenticated,
                                            IsAdminUser,
                                            IsAuthenticatedOrReadOnly
                                        )
from app.api.permissions import IsOwnerOrReadOnly
# OAuth 2
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from .serializers import (
                            UserCreateSerializer,
                            UserDetailSerializer,
                            UserLoginSerializer,
                            GroupSerializer
                        )


User = get_user_model()


# User Create
class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]


# User Detail
class UserDetailAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    lookup_field = 'username'


# User Login
class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data = data)
        if serializer.is_valid(raise_exception = True):
            new_data = serializer.data
            return Response(new_data, status = HTTP_200_OK)

        return Response(serializer.errors, status = HTTP_400_BAD_REQUEST)



# Group List
class GroupListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated, TokenHasScope]
    required_scopes = ['groups']
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


