<template>
  <div class="contas">
    <app-crud
      url="/financeiro/contas/"
      :colunas="colunas"
      :formulario="formulario"
    />
  </div>
</template>

<script>
export default {
  computed: {
    colunas () {
      return [
        {
          dataField: 'id',
          caption: '#',
          width: 50
        },
        {
          dataField: 'descricao'
        },
        {
          dataField: 'saldo_inicial',
          dataType: 'number',
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
        }
      ]
    },
    formulario () {
      return [
        {
          dataField: 'descricao',
          colSpan: 2,
          validationRules: [
            { type: 'required', message: 'A descrição é obrigatório' }
          ]
        },
        {
          dataField: 'saldo_inicial',
          colSpan: 1,
          validationRules: [
            { type: 'required', message: 'O saldo inicial é obrigatório' }
          ],
          editorType: 'dxNumberBox',
          editorOptions: {
            mode: 'number',
            showClearButton: true,
            format: {
              type: 'fixedPoint',
              precision: 2
            }
          }
        }
      ]
    }
  }
}
</script>
