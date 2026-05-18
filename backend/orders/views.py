from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Order, OrderItem
from .serializers import OrderSerializer
from cart.models import Cart


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    try:
        cart = Cart.objects.get(user=request.user)
    except Cart.DoesNotExist:
        return Response(
            {"error": "Cart is empty"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not cart.items.exists():
        return Response(
            {"error": "Cart is empty"},
            status=status.HTTP_400_BAD_REQUEST
        )

    required_fields = [
        'full_name',
        'phone',
        'email',
        'address',
        'city',
        'postal_code'
    ]

    for field in required_fields:
        if not request.data.get(field):
            return Response(
                {"error": f"{field} is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

    order = Order.objects.create(
        user=request.user,
        full_name=request.data.get('full_name'),
        phone=request.data.get('phone'),
        email=request.data.get('email'),
        address=request.data.get('address'),
        city=request.data.get('city'),
        postal_code=request.data.get('postal_code'),
        payment_method=request.data.get('payment_method', 'cod'),
        notes=request.data.get('notes', ''),
        total_price=cart.total_price
    )

    for cart_item in cart.items.all():
        OrderItem.objects.create(
            order=order,
            product=cart_item.product,
            product_name=cart_item.product.name,
            product_image=str(cart_item.product.image),
            price=cart_item.product.price,
            quantity=cart_item.quantity
        )

    cart.items.all().delete()

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    orders = Order.objects.filter(user=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_detail(request, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)
    except Order.DoesNotExist:
        return Response(
            {"error": "Order not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = OrderSerializer(order)
    return Response(serializer.data)