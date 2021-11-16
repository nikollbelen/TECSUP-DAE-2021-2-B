from rest_framework import serializers
from .models import Prestamo


class PrestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestamo
        fields = ('id', 'codigo', 'libro', 'usuario', 'fecPrestamo', 'fecDevolucion')

    def create(self, validated_data):
        """
        Create and return a new `Prestamo` instance, given the validated data.
        """
        return Prestamo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Prestamo` instance, given the validated data.
        """
        instance.codigo = validated_data.get('codigo', instance.codigo)
        instance.libro = validated_data.get('libro', instance.libro)
        instance.usuario = validated_data.get('usuario', instance.usuario)
        instance.fecPrestamo = validated_data.get('fecPrestamo', instance.fecPrestamo)
        instance.fecDevolucion = validated_data.get('fecDevolucion', instance.fecDevolucion)
        instance.save()
        return instance