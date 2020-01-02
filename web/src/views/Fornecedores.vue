<template>
  <div class="fornecedores">
    <app-crud
      url="/financeiro/fornecedores/"
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
          dataField: 'nome'
        },
        {
          dataField: 'cpf_cnpj',
          caption: 'CPF / CNPJ'
        },
        {
          dataField: 'email'
        }
      ]
    },
    formulario () {
      return [
        {
          dataField: 'nome',
          validationRules: [
            { type: 'required', message: 'O nome é obrigatório' }
          ]
        },
        {
          dataField: 'cpf_cnpj',
          validationRules: [
            { type: 'required', message: 'O CPF/CNPJ é obrigatório' }
          ]
        },
        {
          dataField: 'email',
          validationRules: [
            { type: 'required', message: 'O email é obrigatório' },
            { type: 'email', message: 'Informe um email válido' }
          ]
        }
      ]
    }
  }
}
</script>
