from django.db.models import Sum
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Fornecedor, Conta, Titulo, Pagamento
from .serializers import FornecedorSerializer, ContaSerializer, TituloSerializer, PagamentoSerializer


class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all().order_by('pk')
    serializer_class = FornecedorSerializer

    @action(methods=['get'], detail=False)
    def gastos(self, request, pk=None):
        gastos = []
        for f in Fornecedor.objects.all():
            titulos = f.titulo_set.all()
            gasto = sum([t.valor for t in titulos])
            if gasto == 0:
                continue
            pago = gasto - sum([t.saldo for t in titulos])
            gastos.append(dict(
                fornecedor=f.nome,
                gasto=gasto,
                pago=pago
            ))

        return Response(gastos)


class ContaViewSet(viewsets.ModelViewSet):
    queryset = Conta.objects.all().order_by('pk')
    serializer_class = ContaSerializer


class TituloViewSet(viewsets.ModelViewSet):
    queryset = Titulo.objects.all().order_by('pk')
    serializer_class = TituloSerializer

    @action(methods=['get'], detail=False)
    def agenda(self, request, pk=None):
        dados = [
                    dict(
                        text=f'Vencimento {v.get("total", 0)}',
                        startDate=v.get('vencimento'),
                        endDate=v.get('vencimento'),
                        tipo=2
                    )
                    for v in Titulo.objects.all().values('vencimento').annotate(total=Sum('valor'))
                ] + [
                    dict(
                        text=f'Pagamento {p.get("total", 0)}',
                        startDate=p.get('data'),
                        endDate=p.get('data'),
                        tipo=1
                    )
                    for p in Pagamento.objects.all().values('data').annotate(total=Sum('valor'))
                ]
        return Response(dados)

    @action(methods=['get'], detail=False)
    def pendentes(self, request, pk=None):
        return Response(
            TituloSerializer([titulo for titulo in Titulo.objects.all() if not titulo.pago], many=True).data
        )


class PagamentoViewSet(viewsets.ModelViewSet):
    queryset = Pagamento.objects.all().order_by('pk')
    serializer_class = PagamentoSerializer
