from rest_framework import routers

from financeiro.views import FornecedorViewSet, ContaViewSet, TituloViewSet, PagamentoViewSet

rotas = routers.DefaultRouter()
rotas.register('fornecedores', FornecedorViewSet)
rotas.register('contas', ContaViewSet)
rotas.register('titulos', TituloViewSet)
rotas.register('pagamentos', PagamentoViewSet)

urlpatterns = rotas.urls
