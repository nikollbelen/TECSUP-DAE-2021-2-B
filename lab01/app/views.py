from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("Respuesta desde la nueva vista!")

def sumar(request, numero1, numero2):
    respuesta = "La suma de " + str(numero1) + " + " + str(numero2) + " = " + str(numero1 + numero2)
    return HttpResponse(respuesta)
