from django.urls import path

from . import views

urlpatterns = [
    path('',views.prestamo_list),
    path('<int:pk>',views.prestamo_detail)
]