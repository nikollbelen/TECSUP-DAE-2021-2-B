from django.urls import path

from . import views

app_name = 'encuesta'

urlpatterns = [
    # ex: /encuesta/
    path('', views.index, name = 'index'),
    path('enviar', views.enviar, name = 'enviar'),
    path('tarea1', views.operacion1, name = 'operacion1'), 
    path('tarea1_respuesta', views.operacion1_respuesta, name = 'operacion1_respuesta'), 
    path('tarea2', views.operacion2, name = 'operacion2'), 
    path('tarea2_respuesta', views.operacion2_respuesta, name = 'operacion2_respuesta'),
]