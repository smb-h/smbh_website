from django.urls import path, include
from .views import (comment_thread, comment_delete)


app_name = 'Comments'

urlpatterns = [

    path('<id>', comment_thread, name='thread'),
    path('<id>/Delete'), comment_delete, name='delete')

]
