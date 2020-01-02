from django.contrib import admin
from .models import Fornecedor, Conta, Titulo, Pagamento

admin.site.register(Fornecedor)
admin.site.register(Conta)
admin.site.register(Titulo)
admin.site.register(Pagamento)