from eats.serializers import UserSerializer

# this is adding a new ‘user’ field with the user’s 
# serialized data when a token is generated.
def my_jwt_response_handler(token, user=None, request=None):
  return{
    'token': token,
    'user': UserSerializer(user, context={'request': request}).data
  }