from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET'])
def product_list(request):
    products = Product.objects.all() # ডাটাবেস থেকে সব প্রোডাক্ট নিয়ে আসলাম
    serializer = ProductSerializer(products, many=True) # JSON-এ কনভার্ট করলাম
    return Response(serializer.data) # রিঅ্যাক্টকে পাঠিয়ে দিলাম