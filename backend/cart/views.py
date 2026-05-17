from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, CartItem
from .serializers import CartSerializer
from products.models import Product


# Get user's cart
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


# Add to cart
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response(
            {"error": "Product not found"}, 
            status=status.HTTP_404_NOT_FOUND
        )

    cart, created = Cart.objects.get_or_create(user=request.user)
    
    cart_item, item_created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        defaults={'quantity': quantity}
    )

    if not item_created:
        # যদি আগে থেকে থাকে, quantity বাড়িয়ে দাও
        cart_item.quantity += quantity
        cart_item.save()

    serializer = CartSerializer(cart)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# Update quantity
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item(request, item_id):
    try:
        cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
    except CartItem.DoesNotExist:
        return Response(
            {"error": "Item not found"}, 
            status=status.HTTP_404_NOT_FOUND
        )

    quantity = request.data.get('quantity')
    
    if quantity and int(quantity) > 0:
        cart_item.quantity = quantity
        cart_item.save()
    else:
        cart_item.delete()

    cart = Cart.objects.get(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


# Remove from cart
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, item_id):
    try:
        cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
        cart_item.delete()
    except CartItem.DoesNotExist:
        return Response(
            {"error": "Item not found"}, 
            status=status.HTTP_404_NOT_FOUND
        )

    cart = Cart.objects.get(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


# Clear cart
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    try:
        cart = Cart.objects.get(user=request.user)
        cart.items.all().delete()
    except Cart.DoesNotExist:
        pass

    return Response({"message": "Cart cleared"}, status=status.HTTP_200_OK)