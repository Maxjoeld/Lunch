from django.shortcuts import render
from django.http import JsonResponse
from .models import Restaurant
from .serializers import RestaurantSerializer
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken


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

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)