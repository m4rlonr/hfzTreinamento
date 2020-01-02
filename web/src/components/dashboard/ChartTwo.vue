<template>
  <DxChart
    id="chart"
    :rotated="true"
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
      color="#c3a2cc"
      :corner-radius= 10
    />
    <DxSeries
      value-field="pago"
      name="Pagos"
      color="#b7b5e0"
      :corner-radius= 10
    />
    <DxLegend :visible="true"/>
    <DxExport :enabled="false"/>

  </DxChart>
</template>

<script>
import DxChart, {
  DxCommonSeriesSettings,
  DxLabel,
  DxExport,
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
    DxExport,
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
