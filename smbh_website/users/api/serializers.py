from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework.serializers import (
                                            CharField,
                                            EmailField,
                                            HyperlinkedIdentityField,
                                            ModelSerializer,
                                            SerializerMethodField,
                                            ValidationError
                                        )
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions


User = get_user_model()


# User Create
class UserCreateSerializer(ModelSerializer):
    email = EmailField(label='Email Address')
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'password2',
        ]
        extra_kwargs = {"password":
                            {"write_only": True},
                        'password2':
                            {'write_only': True}
                        }

    def validate(self, data):
        username = data['username']
        username_qs = User.objects.filter(username=username)
        if username_qs.exists():
            raise ValidationError('This Username has already been taken.')
        email = data['email']
        email_qs = User.objects.filter(email=email)
        if email_qs.exists():
            raise ValidationError("This Email address has already been registered.")
        return data


    def validate_password(self, value):
        data = self.get_initial()
        password2 = data.get("email2")
        password = value
        if password != password2:
            raise ValidationError("The Password does not match.")
        try:
            # validate the password and catch the exception
            validate_password(password=password, user=User)

        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        # return super(validate_password, self).validate(data)
        return value


    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user_obj = User(
                username = username,
                email = email
            )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data



# User Detail
class UserDetailSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'phone',
            'birth_date',
            'first_name',
            'last_name'
        ]
        read_only_fields = ['username',]



# User Login
class UserLoginSerializer(ModelSerializer):
    username = CharField()
    email = EmailField(label='Email Address')
    token = CharField(allow_blank=True, read_only=True)
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'token'
        ]
        extra_kwargs = {"password":
                            {"write_only": True}
                            }
    def validate(self, data):
        # email = data['email']
        # user_qs = User.objects.filter(email=email)
        # if user_qs.exists():
        #     raise ValidationError("This user has already registered.")
        return data



# Group
class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ("name", )
