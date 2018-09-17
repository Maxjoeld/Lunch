from django.shortcuts import render
from django.http import JsonResponse
from .models import Restaurant
from .serializers import RestaurantSerializer
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics

# def signup_view(request):
#   form = UserCreationForm()
#   return render(request, 'accounts/signup.html', {'form': form })

def index(request):
  rest_list = Restaurant.objects.order_by('-pub_date')
  context = {'rest_list': rest_list}
  return render(request, 'food/index.html', context)

#rest api end point
def get_rest_list(request):
  """
  Returns Json list of all restaurants
  """
  if request.method == "GET":
    rest_list = Restaurant.objects.order_by('-pub_date')
    serializer = RestaurantSerializer(rest_list, many=True)
    return JsonResponse(serializer.data, safe=False)

class FoodList(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    # permission_classes = (IsAdminUser,)

