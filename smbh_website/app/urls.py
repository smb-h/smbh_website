from django.urls import path, include, re_path

from django.views.generic import TemplateView


# NameSpace
app_name = 'App'


urlpatterns = [

    path('', TemplateView.as_view(template_name='react.html')),
    path('Profile/', TemplateView.as_view(template_name='react.html')),
    path('Contact', TemplateView.as_view(template_name='react.html')),
    path('Dashboard/', TemplateView.as_view(template_name='react.html')),

    # DRF API
    path('API/', include('app.api.urls')),

]
