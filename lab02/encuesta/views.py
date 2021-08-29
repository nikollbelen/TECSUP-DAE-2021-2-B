from django.shortcuts import render

# Create your views here.
def index(request):
    context = {
        'titulo': "Formulario",
    }
    return render(request, 'encuesta/formulario.html', context)

def enviar(request):
    context = {
        'titulo': "Respuesta",
        'nombre' : request.POST['nombre'],
        'clave' : request.POST['password'],
        'educacion' : request.POST['educacion'],
        'nacionalidad' : request.POST['nacionalidad'],
        'idiomas' : request.POST.getlist('idiomas'),
        'correo': request.POST['email'],
        'website': request.POST['sitioweb'],
    }
    return render(request, 'encuesta/respuesta.html', context)

def operacion1(request):
    context = {
        'titulo': "Tarea 01",
    }
    return render(request, 'encuesta/tarea1.html', context)

def operacion1_respuesta(request):
    numero1 = request.POST['numero1']
    numero2 = request.POST['numero2']
    operacion = request.POST['operacion']

    respuesta = str(calculo(numero1,numero2,operacion))

    context = {
        'titulo': "Respuesta",
        'numero1' : numero1,
        'numero2' : numero2,
        'operacion' : operacion,
        'resultado' : respuesta,
    }
    return render(request, 'encuesta/tarea1_respuesta.html', context)

def calculo(n1,n2,operacion):
    if operacion == "suma":
        respuesta = int(n1) + int(n2)
    elif operacion == "resta":
        respuesta = int(n1) - int(n2)
    else:
        respuesta = int(n1) * int(n2)

    return respuesta

def operacion2(request):
    context = {
        'titulo' : "Tarea 02",
    }
    return render(request, 'encuesta/tarea2.html', context)


def operacion2_respuesta(request):

    diametro = request.POST['diametro']
    altura = request.POST['altura']
    result = cilindro(diametro,altura)
    context = {
        'titulo' : 'Formulario',
        'diametro' : diametro,
        'altura' : altura,
        'result' : str(result)
    }

    return render(request, 'encuesta/tarea2_respuesta.html', context)

def cilindro(diametro,altura):
    from math import pi
    result = pi * ((float(diametro)/2)*(float(diametro)/2)) * float(altura)
    return result