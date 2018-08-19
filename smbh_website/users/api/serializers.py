from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from rest_framework.serializers import (
                                            CharField,
                                            # EmailField,
                                            HyperlinkedIdentityField,
                                            ModelSerializer,
                                            SerializerMethodField,
                                            ValidationError,
                                        )
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from django.db.models import Q


User = get_user_model()


# User Create
class UserCreateSerializer(ModelSerializer):
    # email = EmailField(label='Email Address')
    # password = CharField(style={'input_type': 'password'}, write_only=True)
    password2 = CharField(style={'input_type': 'password'}, write_only=True, label='Confirm Password')
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'password2',
        ]
        extra_kwargs = {"password":
                            {
                                "write_only": True,
                                'style':{'input_type': 'password'},
                                # "error_messages": {"required": "Give yourself a username"}
                            },
                        # 'password2':
                        #     {'write_only': True}
                        }

    # Validate the whole data here or in seprate functions
    # def validate(self, data):
    #     username = data['username']
    #     username_qs = User.objects.filter(username=username)
    #     if username_qs.exists():
    #         raise ValidationError('This Username has already been taken.')
    #     email = data['email']
    #     email_qs = User.objects.filter(email=email)
    #     if email_qs.exists():
    #         raise ValidationError("This Email address has already been registered.")
    #     return data

    # def validate_email(self, value):
    #     email = value
    #     qs = User.objects.filter(email=email)
    #     if qs.exists():
    #         raise ValidationError("This Email Address Has Already Been Registered.")
    #     return value

    def validate_password(self, value):
        data = self.get_initial()
        password2 = data.get("password2")
        password = value
        if password != password2:
            raise ValidationError("The Password does not match.")
        try:
            # validate the password and catch the exception
            errors = {}
            validate_password(password=password, user=User)

        # the exception raised here is different than serializers.ValidationError
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise ValidationError(errors)

        return value


    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        user_obj = User(
                username = username,
                email = email,
                is_active = False,
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
    # username = CharField()
    # email = EmailField(label='Email Address')
    ID = CharField(label = 'User', help_text = 'Username Or Email Address Or Phone Number')
    token = CharField(allow_blank=True, read_only=True)
    class Meta:
        model = User
        fields = [
            # 'username',
            # 'email',
            'ID',
            'password',
            'token'
        ]
        extra_kwargs = {"password":
                            {
                                "write_only": True,
                                'style':{'input_type': 'password'},
                            },
                        # 'username':
                        #     {'help_text': '', 'required': False, 'allow_blank': True},

                            }
        
    def validate(self, data):
        user_obj = None
        identity = data.get('ID')
        password = data.get('password')
        user = User.objects.filter(
            Q(username = identity) |
            Q(email = identity) |
            Q(phone = identity)
        ).distinct()

        if user.exists() and user.count() == 1 :
            user_obj = user.first()
        else :
            raise ValidationError('This User is not valid.')

        if user_obj :
            if not user_obj.check_password(password):
                # raise ValidationError('Incorrect credentials.')
                raise ValidationError('This User is not valid.')

        data['token'] = 'SOME RANDOM TOKEN'
        return data


# Group
class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ("name", )



