from rest_framework import serializers
from .models import Fornecedor, Conta, Titulo, Pagamento


class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = '__all__'


class ContaSerializer(serializers.ModelSerializer):
    saldo = serializers.DecimalField(
        max_digits=15,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = Conta
        fields = '__all__'


class TituloSerializer(serializers.ModelSerializer):
    fornecedor_display = serializers.SerializerMethodField('_fornecedor')
    saldo = serializers.DecimalField(
        max_digits=15,
        decimal_places=2,
        read_only=True
    )
    pago = serializers.BooleanField(
        read_only=True
    )

    titulo_display = serializers.CharField(
        max_length=255,
        read_only=True
    )

    detalhe_pagamentos = serializers.SerializerMethodField('_detalhe_pagamentos')

    def _fornecedor(self, obj: Titulo):
        return FornecedorSerializer(obj.fornecedor).data

    def _detalhe_pagamentos(self, obj: Titulo):
        pagamentos = obj.pagamento_set.all()
        return PagamentoSerializer(pagamentos, many=True).data

    class Meta:
        model = Titulo
        fields = '__all__'


class PagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagamento
        fields = '__all__'
