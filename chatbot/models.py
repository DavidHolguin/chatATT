from django.db import models

class CompanyInfo(models.Model):
    key = models.CharField(max_length=100, unique=True)
    value = models.TextField()

class Service(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()

class ContactInfo(models.Model):
    type = models.CharField(max_length=50)
    value = models.CharField(max_length=200)