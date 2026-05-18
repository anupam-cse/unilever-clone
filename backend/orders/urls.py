from django.urls import path
from .views import place_order, my_orders, order_detail

urlpatterns = [
    path('place/', place_order, name='place-order'),
    path('my-orders/', my_orders, name='my-orders'),
    path('<int:order_id>/', order_detail, name='order-detail'),
]