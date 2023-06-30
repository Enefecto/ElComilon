from rest_framework import serializers
from API.models import Users, Productos

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'