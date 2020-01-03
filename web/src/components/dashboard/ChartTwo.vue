<template>
  <DxChart
    id="chart"
    :data-source="$store.state.graficoGastoFornecedor"
    @pointClick="onPointClick"
  >
   <DxTitle
      text="Contas Fornecedores"
      subtitle="Gastos e Pagamentos"
    />
     <DxCommonSeriesSettings
      argument-field="fornecedor"
      type="bar"
      hover-mode="allArgumentPoints"
      selection-mode="allArgumentPoints"
      range-value1-field="start"
      range-value2-field="end"
      bar-overlap-group="fornecedor"
      color="#b7b5e0"
    >
    <DxLabel :visible="false"/>
    </DxCommonSeriesSettings>

     <DxSeries
      value-field="gasto"
      name="Gastos"
      color="#6495ED"
      type="bar"
    />
    <DxSeries
      value-field="pago"
      name="Pagos"
      color="#000080"
    />
    <DxLegend :visible="true"/>

  </DxChart>
</template>

<script>
import DxChart, {
  DxCommonSeriesSettings,
  DxLabel,
  DxSeries,
  DxTitle,
  DxLegend
} from 'devextreme-vue/chart'

export default {
  components: {
    DxChart,
    DxTitle,
    DxCommonSeriesSettings,
    DxLabel,
    DxSeries,
    DxLegend
  },
  mounted () {
    this.$store.dispatch('loadGraficoGastoFornecedor')
  },
  methods: {
    onPointClick ({ target }) {
      target.select()
    }
  }
}
</script>
<style>
#chart {
    height: 440px;
}
</style>
