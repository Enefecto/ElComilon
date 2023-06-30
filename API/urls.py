from django.urls import path
from API import views

urlpatterns = [
    path('users/', views.UserApi),
    path('users/<int:id>/', views.UserApi),
    path('products/', views.ProductsApi),
    path('products/<int:id>/', views.ProductsApi),
]