"""
Base settings to build other settings files upon.
"""

import environ
from django.utils.translation import gettext_lazy as _

ROOT_DIR = environ.Path(__file__) - 3  # (smbh_website/config/settings/base.py - 3 = smbh_website/)
APPS_DIR = ROOT_DIR.path('smbh_website')

env = environ.Env()

# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = env('DJANGO_SECRET_KEY', default='IqTqkaLcVro75uGopAwuKwUgNEwk7ReSCtUTReGKZBsVxV03FZCLAUwkzDwVpCQn')

READ_DOT_ENV_FILE = env.bool('DJANGO_READ_DOT_ENV_FILE', default=False)
if READ_DOT_ENV_FILE:
    # OS environment variables take precedence over variables from .env
    env.read_env(str(ROOT_DIR.path('.env')))


# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = env.bool('DJANGO_DEBUG', False)
# Local time zone. Choices are
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# though not all of them may be available with every OS.
# In Windows, this must be set to your system time zone.
# Asia/Tehran
TIME_ZONE = 'UTC'
# https://docs.djangoproject.com/en/dev/ref/settings/#language-code
LANGUAGE_CODE = 'en-us'
LANGUAGES = [
    ('fa', _('Persian')),
    ('en', _('English')),
]
# Translition
LOCALE_PATHS = [
    # Root
    str(ROOT_DIR),
    # My Apps
    str(APPS_DIR.path('locale'))
]

# https://docs.djangoproject.com/en/dev/ref/settings/#site-id
SITE_ID = 1
# https://docs.djangoproject.com/en/dev/ref/settings/#use-i18n
USE_I18N = True
# https://docs.djangoproject.com/en/dev/ref/settings/#use-l10n
USE_L10N = True
# https://docs.djangoproject.com/en/dev/ref/settings/#use-tz
USE_TZ = True


# DATABASES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#databases

DATABASES = {
    'default': env.db('DATABASE_URL', default='postgres:///smbh_website'),
}
DATABASES['default']['ATOMIC_REQUESTS'] = True


# URLS
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#root-urlconf
ROOT_URLCONF = 'config.urls'
# https://docs.djangoproject.com/en/dev/ref/settings/#wsgi-application
WSGI_APPLICATION = 'config.wsgi.application'


# APPS
# ------------------------------------------------------------------------------
DJANGO_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 'django.contrib.humanize', # Handy template tags
    'django.contrib.admin',
]
THIRD_PARTY_APPS = [
    'crispy_forms',

    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    # DRF
    'rest_framework',
    # OAuth 2
    'oauth2_provider',

    # Utilities
    # Django Taggit
    'taggit',
    # Django Ckeditor
    'ckeditor',
    'ckeditor_uploader',
    # Django Analytical
    'analytical',
    # Django filters
    'django_filters',
]
LOCAL_APPS = [
    'smbh_website.users.apps.UsersAppConfig',

    # My Apps
    'app',
    'blog',
]
# https://docs.djangoproject.com/en/dev/ref/settings/#installed-apps
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS


# MIGRATIONS
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#migration-modules
MIGRATION_MODULES = {
    'sites': 'smbh_website.contrib.sites.migrations'
}


# AUTHENTICATION
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#authentication-backends
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]
# https://docs.djangoproject.com/en/dev/ref/settings/#auth-user-model
AUTH_USER_MODEL = 'users.User'
# https://docs.djangoproject.com/en/dev/ref/settings/#login-redirect-url
# https://docs.djangoproject.com/en/dev/ref/settings/#logout-redirect-url
LOGIN_REDIRECT_URL = 'Users:redirect'
# https://docs.djangoproject.com/en/dev/ref/settings/#login-url
LOGIN_URL = 'account_login'


# LOGIN_URL = 'Login'


# PASSWORDS
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#password-hashers
PASSWORD_HASHERS = [
    # https://docs.djangoproject.com/en/dev/topics/auth/passwords/#using-argon2-with-django
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
    'django.contrib.auth.hashers.BCryptPasswordHasher',
]
# https://docs.djangoproject.com/en/dev/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# MIDDLEWARE
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',

    # Active Translition For Project
    'django.middleware.locale.LocaleMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# STATIC
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#static-root
CDN = (environ.Path(ROOT_DIR) - 1).path('CDN')
STATIC_ROOT = str(CDN.path('static'))
# https://docs.djangoproject.com/en/dev/ref/settings/#static-url
STATIC_URL = '/static/'
# https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#std:setting-STATICFILES_DIRS
STATICFILES_DIRS = [
    # Users
    str(APPS_DIR.path('users/static')),
    # My Apps
    str(APPS_DIR.path('app/static')),
    str(APPS_DIR.path('blog/static')),

]
# https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#staticfiles-finders
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # other finders..
]


# MEDIA
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#media-root
MEDIA_ROOT = str(CDN.path('media'))
# https://docs.djangoproject.com/en/dev/ref/settings/#media-url
MEDIA_URL = '/media/'


# TEMPLATES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#templates
TEMPLATES = [
    {
        # https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-TEMPLATES-BACKEND
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # https://docs.djangoproject.com/en/dev/ref/settings/#template-dirs
        'APP_DIRS': True,
        'DIRS': [
            # Root
            str(APPS_DIR.path('templates')),
            # Errors
            str(APPS_DIR.path('templates/errors')),
            # Apps
            str(APPS_DIR.path('app/templates')),
            str(APPS_DIR.path('blog/templates')),
            str(APPS_DIR.path('users/templates')),

        ],
        'OPTIONS': {

            # Debugging Complex Templates
            'string_if_invalid': 'INVALID EXPRESSION: %s',

            # https://docs.djangoproject.com/en/dev/ref/settings/#template-loaders
            # https://docs.djangoproject.com/en/dev/ref/templates/api/#loader-types
            # https://docs.djangoproject.com/en/dev/ref/settings/#template-context-processors
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                # Translition for each Request Context
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
# http://django-crispy-forms.readthedocs.io/en/latest/install.html#template-packs
CRISPY_TEMPLATE_PACK = 'bootstrap4'


# FIXTURES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#fixture-dirs
FIXTURE_DIRS = (
    str(APPS_DIR.path('fixtures')),
)


# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
# EMAIL_BACKEND = env('DJANGO_EMAIL_BACKEND', default='django.core.mail.backends.smtp.EmailBackend')
# Local Test
EMAIL_BACKEND = env('DJANGO_EMAIL_BACKEND', default='django.core.mail.backends.console.EmailBackend')


# ADMIN
# ------------------------------------------------------------------------------
# Django Admin URL.
ADMIN_URL = 'admin/'
# https://docs.djangoproject.com/en/dev/ref/settings/#admins
ADMINS = [
    ("""smbh""", 'xsmbhx@yahoo.com'),
]
# https://docs.djangoproject.com/en/dev/ref/settings/#managers
MANAGERS = ADMINS


# django-allauth
# ------------------------------------------------------------------------------
ACCOUNT_ALLOW_REGISTRATION = env.bool('DJANGO_ACCOUNT_ALLOW_REGISTRATION', True)
# https://django-allauth.readthedocs.io/en/latest/configuration.html
ACCOUNT_AUTHENTICATION_METHOD = 'username'
# https://django-allauth.readthedocs.io/en/latest/configuration.html
ACCOUNT_EMAIL_REQUIRED = True
# https://django-allauth.readthedocs.io/en/latest/configuration.html
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
# https://django-allauth.readthedocs.io/en/latest/configuration.html
ACCOUNT_ADAPTER = 'smbh_website.users.adapters.AccountAdapter'
# https://django-allauth.readthedocs.io/en/latest/configuration.html
SOCIALACCOUNT_ADAPTER = 'smbh_website.users.adapters.SocialAccountAdapter'


# Django CKeditor
# ------------------------------------------------------------------------------

# CKEDITOR_BASEPATH = str(STATIC_ROOT) + "/Packages/ckeditor/ckeditor"
CKEDITOR_UPLOAD_PATH = "Uploads/"
CKEDITOR_IMAGE_BACKEND = 'pillow'
CKEDITOR_RESTRICT_BY_USER = True
CKEDITOR_RESTRICT_BY_DATE = True

# python manage.py generateckeditorthumbnails

# Ckeditor Config
CKEDITOR_CONFIGS = {
    'ck_blog': {
        # 'skin': 'moono-dark',
        # 'skin': 'office2013',
        'skin': 'moono-lisa',
        'toolbar_Basic': [
            ['Source', '-', 'Bold', 'Italic']
        ],
        'toolbar_YourCustomToolbarConfig': [
            {'name': 'document', 'items': ['Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates']},
            {'name': 'clipboard', 'items': ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
            {'name': 'editing', 'items': ['Find', 'Replace', '-', 'SelectAll']},
            {'name': 'forms',
             'items': ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton',
                       'HiddenField']},
            '/',
            {'name': 'basicstyles',
             'items': ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
            {'name': 'paragraph',
             'items': ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-',
                       'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl',
                       'Language']},
            {'name': 'links', 'items': ['Link', 'Unlink', 'Anchor']},
            {'name': 'insert',
             'items': ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']},
            '/',
            {'name': 'styles', 'items': ['Styles', 'Format', 'Font', 'FontSize']},
            {'name': 'colors', 'items': ['TextColor', 'BGColor']},
            {'name': 'tools', 'items': ['Maximize', 'ShowBlocks']},
            {'name': 'about', 'items': ['About']},
            '/',  # put this to force next toolbar on new line
            {'name': 'yourcustomtools', 'items': [
                # put the name of your editor.ui.addButton here
                'Preview',
                'Maximize',

            ]},
        ],
        'toolbar': 'YourCustomToolbarConfig',  # put selected toolbar config here
        # 'toolbarGroups': [{ 'name': 'document', 'groups': [ 'mode', 'document', 'doctools' ] }],
        # 'height': 291,
        # 'width': '100%',
        # 'filebrowserWindowHeight': 725,
        # 'filebrowserWindowWidth': 940,
        # 'toolbarCanCollapse': True,
        # 'mathJaxLib': '//cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS_HTML',
        'tabSpaces': 4,
        'extraPlugins': ','.join([
            'uploadimage', # the upload image feature
            # your extra plugins here
            'ajax',
            'div',
            'autolink',
            'autoembed',
            'codesnippet',
            'embedsemantic',
            'autogrow',
            'devtools',
            'widget',
            'lineutils',
            'clipboard',
            'dialog',
            'dialogui',
            'elementspath',
            # 'uploadfile',
            'uploadwidget',
        ]),
    }
}



# django-compressor
# ------------------------------------------------------------------------------
# Django Css/JS Compressor
# https://django-compressor.readthedocs.io/en/latest/quickstart/#installation
INSTALLED_APPS += ['compressor']
STATICFILES_FINDERS += ['compressor.finders.CompressorFinder']



# Django Rest Framework
# ------------------------------------------------------------------------------
REST_FRAMEWORK = {
    # Authentication
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
    ),
    # Permissions
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}

# OAuth 2
OAUTH2_PROVIDER = {
    # this is the list of available scopes
    'SCOPES': {'read': 'Read scope', 'write': 'Write scope', 'groups': 'Access to your groups'}
}




# ------------------------------------------------------------------------------
