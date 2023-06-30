from django.db import models

class Users(models.Model):
    UserId = models.AutoField(primary_key=True)
    UserName = models.CharField(max_length=255)
    UserEmail = models.EmailField()
    UserAddress = models.CharField(max_length=255)
    UserPhone = models.IntegerField()
    UserPassword = models.CharField(max_length=255)
    UserTypeId = models.IntegerField(default = 0)

class Productos(models.Model):
    ProductId = models.AutoField(primary_key=True)
    ProductTitle = models.CharField(max_length=255)
    ProductPrice = models.IntegerField()
    ProductType = models.CharField(max_length=255)