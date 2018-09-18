from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
  path('', views.index),
  path('api/list', views.get_rest_list),
  path('api/view', views.FoodList.as_view()),
  # path(r'^login/$',views.login_view, name="login"),
  # path(r'^signup/$',views.signup_view, name="signup"),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)