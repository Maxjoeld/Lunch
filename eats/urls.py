from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import current_user, UserList

urlpatterns = [
  path('', views.index),
  path('api/list', views.get_rest_list),
  path('api/view', views.FoodList.as_view()),
  path('current_user/', current_user),
  path('users/', UserList.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)