<template>
  <div class="detalhes-pagamentos">
    <DxDataGrid
      ref="grid"
      :data-source="dataSource"
      :columns="colunas"
      :show-borders="true"
      :hover-state-enabled="true"
      :row-alternation-enabled="true"
      :column-auto-width="true"
    />
  </div>
</template>

<script>
import DxDataGrid from 'devextreme-vue/data-grid'

export default {
  components: {
    DxDataGrid
  },
  props: {
    dados: {
      type: [String, Array, Object],
      default: null
    }
  },
  computed: {
    dataSource () {
      return this.dados.data.detalhe_pagamentos
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
          dataField: 'valor',
          format: {
            type: 'fixedPoint',
            precision: 2
          }
        },
        {
          dataField: 'conta',
          lookup: {
            dataSource: this.$store.state.contas,
            valueExpr: 'id',
            displayExpr: 'descricao'
          }
        }
      ]
    }
  },
  mounted () {
    this.$store.dispatch('loadContas')
  }
}
</script>
