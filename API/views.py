from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from API.models import Users, Productos
from API.serializers import UsersSerializer,ProductsSerializer


@csrf_exempt
def UserApi(request, id=0):
    if request.method == 'GET': 
        users = Users.objects.all()
        users_serializer = UsersSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)
        
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        users_serializer = UsersSerializer(data=user_data)
        if users_serializer.is_valid():
            users_serializer.save()
            return JsonResponse('Added Successfully', safe=False)
        return JsonResponse('Failed to add', safe=False)
    
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        users = Users.objects.get(UserId=user_data['UserId'])
        users_serializer = UsersSerializer(users, data=user_data)
        if users_serializer.is_valid():
            users_serializer.save()
            return JsonResponse('Update Successfully', safe=False)
        return JsonResponse('Failed to update', safe=False)
    
    elif request.method == 'DELETE':
        user = Users.objects.get(UserId=id)
        user.delete()
        return JsonResponse('DELETE', safe=False)

@csrf_exempt
def ProductsApi(request, id=0):
    if request.method == 'GET': 
        products = Productos.objects.all()
        products_serializer = ProductsSerializer(products, many=True)
        return JsonResponse(products_serializer.data, safe=False)
        
    elif request.method == 'POST':
        product_data = JSONParser().parse(request)
        products_serializer = ProductsSerializer(data=product_data)
        if products_serializer.is_valid():
            products_serializer.save()
            return JsonResponse('Added Successfully', safe=False)
        return JsonResponse('Failed to add', safe=False)
    
    elif request.method == 'PUT':
        product_data = JSONParser().parse(request)
        product = Productos.objects.get(ProductId=product_data['ProductId'])
        products_serializer = ProductsSerializer(product, data=product_data)
        if products_serializer.is_valid():
            products_serializer.save()
            return JsonResponse('Update Successfully', safe=False)
        return JsonResponse('Failed to update', safe=False)
    
    elif request.method == 'DELETE':
        product = Productos.objects.get(ProductId=id)
        product.delete()
        return JsonResponse('DELETE', safe=False)