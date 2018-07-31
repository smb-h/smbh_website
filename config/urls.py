from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.i18n import i18n_patterns

from django.conf.urls.static import static
from django.conf import settings

from django.views import defaults as default_views



# app_name = ''

urlpatterns = [

    # Utils
    path('ckeditor/', include('ckeditor_uploader.urls')),

]

# Translition
prefix_default_language = False
urlpatterns += i18n_patterns(

    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    

    # My Apps
    path('', include('app.urls', namespace='App')),
    path('Blog/', include('blog.urls', namespace='Blog')),
    
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]

