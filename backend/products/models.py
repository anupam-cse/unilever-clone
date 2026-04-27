from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
    brand_name = models.CharField(max_length=100) # যেমন: Dove, Lux
    name = models.CharField(max_length=200)       # যেমন: Dove Fresh Moisture
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    image_url = models.URLField(max_length=500, blank=True) # আপাতত শুধু ইমেজের লিঙ্ক দিব

    def __str__(self):
        return f"{self.brand_name} - {self.name}"