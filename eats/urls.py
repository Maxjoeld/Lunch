from django.urls import path
from . import views

urlpatterns = [
  path('', views.index),
  path('api/list', views.get_rest_list),
  path('api/view', views.FoodList.as_view()),
]