<template>
  <div class="pagamento">
    <DxPopup
      :visible.sync="modal"
      :drag-enabled="false"
      :close-on-outside-click="false"
      :show-title="true"
      width="auto"
      height="auto"
      title="Adicionar Pagamento"
    >
      <DxLoadPanel
        :position="{ of: 'body' }"
        :visible.sync="loading"
        :close-on-outside-click="false"
        message="Processando, aguarde..."
        shading-color="rgba(0,0,0,0.4)"
      />
      <form @submit.prevent="adicionarPagamento">
        <DxForm
          ref="form"
          :form-data="formData"
          :focus-state-enabled="true"
          :items="formulario"
          :col-count="3"
          label-location="top"
        />
      </form>
    </DxPopup>
  </div>
</template>

<script>
import { DxForm } from 'devextreme-vue'
import { DxLoadPanel } from 'devextreme-vue/load-panel'
import { DxPopup } from 'devextreme-vue/popup'
import notify from 'devextreme/ui/notify'

export default {
  components: {
    DxForm,
    DxLoadPanel,
    DxPopup
  },
  props: {
    mostrar: {
      type: [Boolean, String, Object],
      default: false
    },
    tituloSelecionado: {
      type: Object,
      default: null
    }
  },
  watch: {
    modal (valor) {
      if (!valor) {
        this.$emit('fechar')
      }
    },
    mostrar (value) {
      this.modal = value

      if (value) {
        this.instancia.updateData('titulo', this.tituloSelecionado.id)
      }
    }
  },
  mounted () {
    this.carregar()
  },
  data () {
    return {
      titulo: null,
      modal: false,
      loading: false,
      formData: {}
    }
  },
  methods: {
    validaLimite (e) {
      if (!this.titulo) return false
      return this.titulo.saldo >= e.value
    },
    validaSaldo (e) {
      if (e.value === null) return true
      const conta = this.$store.state.contas.filter(f => f.id === e.value)[0]
      return conta.saldo - this.formData.valor >= 0
    },
    async carregar () {
      this.titulo = null
      await this.$store.dispatch('loadContas')
      await this.$store.dispatch('loadTitulosPendentes')
    },
    alterarTitulo (e) {
      if (e.value === null) return
      this.titulo = this.$store.state.titulosPendentes.filter(f => f.id === e.value)[0]
      this.instancia.updateData('valor', this.titulo.saldo)
    },
    async adicionarPagamento () {
      this.loading = true
      try {
        await this.axios.post('/financeiro/pagamentos/', this.formData)
        this.carregar()
        this.instancia.resetValues()
        this.modal = false
        notify('Pagamento efetuado', 'success', 3000)
      } catch (err) {
        notify(`Erro ao salvar o pagamento. ${err}.`, 'error', 5000)
      }
      this.loading = false
    }
  },
  computed: {
    instancia () {
      return this.$refs.form.instance
    },
    formulario () {
      return [
        {
          dataField: 'titulo',
          editorType: 'dxSelectBox',
          editorOptions: {
            dataSource: {
              store: this.$store.state.titulosPendentes,
              paginate: true
            },
            valueExpr: 'id',
            displayExpr: 'titulo_display',
            onValueChanged: this.alterarTitulo,
            readOnly: true
          },
          validationRules: [
            { type: 'required', message: 'O título é obrigatório' }
          ],
          colSpan: 2
        },
        {
          dataField: 'data',
          editorType: 'dxDateBox',
          editorOptions: {
            dateSerializationFormat: 'yyyy-MM-dd'
          },
          validationRules: [
            { type: 'required', message: 'A data é obrigatória' }
          ],
          colSpan: 1
        },
        {
          dataField: 'valor',
          editorType: 'dxNumberBox',
          editorOptions: {
            format: {
              type: 'fixedPoint',
              precision: 2
            }
          },
          validationRules: [
            { type: 'required', message: 'O valor é obrigatório' },
            {
              type: 'custom',
              message: 'O valor ultrapassa o valor do título',
              validationCallback: this.validaLimite
            }
          ],
          colSpan: 1
        },
        {
          dataField: 'conta',
          editorType: 'dxSelectBox',
          editorOptions: {
            dataSource: {
              store: this.$store.state.contas,
              paginate: true
            },
            valueExpr: 'id',
            displayExpr: 'descricao'
          },
          validationRules: [
            { type: 'required', message: 'A conta é obrigatório' },
            {
              type: 'custom',
              message: 'A conta selecionada não possui saldo',
              validationCallback: this.validaSaldo
            }
          ],
          colSpan: 1
        },
        {
          colSpan: 3,
          itemType: 'button',
          buttonOptions: {
            text: 'Pagar',
            useSubmitBehavior: true,
            horizontalAlignment: 'Right',
            verticalAlignment: 'Bottom',
            elementAttr: {
              class: 'btn-submit'
            }
          }
        }
      ]
    }
  }
}
</script>

<style>
.btn-submit {
  width: 200px;
  font-size: 1.2em;
  margin-top: 80px;
}
</style>
