<template>
  <DxChart
    id="chart"
    :rotated="true"
    :data-source="$store.state.graficoValorTitulos"
    title="Valores de titulos em aberto"
  >
    <DxTooltip
      :enabled="true"
      :shared="true"
      :customize-tooltip="customizeTooltip"
    />
    <DxLabel :visible="true"/>
    <DxSeries
    type="bar"
    name="Saldos"
    color="#EE0000"
    />
    <DxLegend :visible="true"/>
  </DxChart>
</template>

<script>
import DxChart, {
  DxLegend,
  DxSeries,
  DxTooltip,
  DxLabel
} from 'devextreme-vue/chart'

export default {
  components: {
    DxChart,
    DxLabel,
    DxLegend,
    DxSeries,
    DxTooltip
  },
  mounted () {
    this.$store.dispatch('loadGraficoValorTitulos')
  },
  methods: {
    customizeTooltip (pointInfo) {
      return {
        html: `
        <div>
          <div class='tooltip-header'>
          ${pointInfo.argumentText}
          </div>
          <div class='tooltip-body'>
          <div class='series-name'>Saldo: </div>
          <div class='value-text'>${pointInfo.points[0].valueText}
        </div>
        `
      }
    }
  }
}
</script>
<style>
#chart{
  height: 300px;
}
</style>
