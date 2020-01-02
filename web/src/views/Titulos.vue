<template>
  <div class="titulos">
    <app-titulo-pagamento
      :mostrar="mostrarPagamento"
      :tituloSelecionado="tituloSelecionado"
      @fechar="fecharPagamento"
    />
    <app-crud
      ref="grid"
      url="/financeiro/titulos/"
      :colunas="colunas"
      :formulario="formulario"
      :acoes="acoes"
      @selecionou="tituloSelecionado = $event"
      mestre-detalhe="app-detalhe-pagamento"
    />
  </div>
</template>

<script>
import notify from 'devextreme/ui/notify'

export default {
  data () {
    return {
      mostrarPagamento: false,
      tituloSelecionado: null
    }
  },
  async created () {
    await this.$store.dispatch('loadFornecedores')
  },
  methods: {
    getFornecedores (options) {
      return {
        store: this.$store.state.fornecedores,
        paginate: true
      }
    },
    fecharPagamento () {
      this.mostrarPagamento = false
      this.$refs.grid.atualizar()
    }
  },
  computed: {
    acoes () {
      const self = this
      return [
        {
          location: 'before',
          widget: 'dxButton',
          options: {
            icon: 'check',
            text: 'Adicionar Pagamento',
            onClick (e) {
              if (self.tituloSelecionado === null) {
                notify('Selecione um título para adicionar o pagamento', 'warning', 3000)
                return
              }

              if (self.tituloSelecionado.pago) {
                notify('Título já esta pago. VAZA', 'warning', 3000)
                return
              }
              self.mostrarPagamento = true
            }
          }
        }
      ]
    },
    colunas () {
      return [
        {
          dataField: 'id',
          caption: '#',
          width: 50
        },
        {
          dataField: 'data',
          dataType: 'date'
        },
        {
          dataField: 'numero_documento'
        },
        {
          dataField: 'vencimento',
          dataType: 'date'
        },
        {
          dataField: 'valor',
          format: {
            type: 'fixedPoint',
            precision: 2
          }
        },
        {
          dataField: 'saldo',
          format: {
            type: 'fixedPoint',
            precision: 2
          }
        },
        {
          dataField: 'fornecedor',
          lookup: {
            dataSource: this.getFornecedores,
            displayExpr: 'nome',
            valueExpr: 'id'
          }
        }
      ]
    },
    formulario () {
      return [
        {
          dataField: 'data',
          editorOptions: {
            dateSerializationFormat: 'yyyy-MM-dd'
          },
          validationRules: [
            { type: 'required', message: 'A data é obrigatória' }
          ]
        },
        {
          dataField: 'numero_documento',
          validationRules: [
            { type: 'required', message: 'O documento é obrigatório' }
          ]
        },
        {
          dataField: 'vencimento',
          editorOptions: {
            dateSerializationFormat: 'yyyy-MM-dd'
          },
          validationRules: [
            { type: 'required', message: 'O vencimento é obrigatório' }
          ]
        },
        {
          dataField: 'valor',
          editorOptions: {
            format: {
              type: 'fixedPoint',
              precision: 2
            }
          },
          validationRules: [
            { type: 'required', message: 'O valor é obrigatório' }
          ]
        },
        {
          dataField: 'fornecedor',
          validationRules: [
            { type: 'required', message: 'O fornecedor é obrigatório' }
          ],
          colSpan: 2
        }
      ]
    }
  }
}
</script>
