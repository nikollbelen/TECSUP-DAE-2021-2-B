from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # ex: localhost:8080/app/4/5/sumar/
    path('sumar/<int:numero1>/<int:numero2>/', views.sumar, name='sumar')
]
