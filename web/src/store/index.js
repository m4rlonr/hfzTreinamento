import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fornecedores: [],
    contas: [],
    titulos: [],
    titulosPendentes: [],
    graficoSaldoContas: [],
    graficoGastoFornecedor: [],
    agendaPagamentos: [],
    loadGastosTitulos: []
  },
  mutations: {
    setFornecedores (state, lista) {
      state.fornecedores = lista
    },
    setContas (state, lista) {
      state.contas = lista
    },
    setTitulos (state, lista) {
      state.titulos = lista
    },
    setTitulosPendentes (state, lista) {
      state.titulosPendentes = lista
    },
    setGraficoSaldoContas (state, lista) {
      state.graficoSaldoContas = lista
    },
    setGraficoGastoFornecedor (state, lista) {
      state.graficoGastoFornecedor = lista
    },
    setAgendaPagamentos (state, lista) {
      state.agendaPagamentos = lista
    }
  },
  actions: {
    loadFornecedores: ({ commit }) => axios
      .get('/financeiro/fornecedores/')
      .then(res => {
        commit('setFornecedores', res.data)
        return res.data
      }),
    loadContas: ({ commit }) => axios
      .get('/financeiro/contas/')
      .then(res => {
        commit('setContas', res.data)
        return res.data
      }),
    loadTitulos: ({ commit }) => axios
      .get('/financeiro/titulos/')
      .then(res => {
        commit('setTitulos', res.data)
        return res.data
      }),
    loadTitulosPendentes: ({ commit }) => axios
      .get('/financeiro/titulos/pendentes/')
      .then(res => {
        commit('setTitulosPendentes', res.data)
        return res.data
      }),
    loadGraficoSaldoContas: ({ commit }) => axios
      .get('/financeiro/contas/')
      .then(
        res => {
          const data = res.data.map(m => ({ arg: m.descricao, val: m.saldo }))
          commit('setGraficoSaldoContas', data)
          return data
        }
      ),
    loadGraficoGastoFornecedor: ({ commit }) => axios
      .get('/financeiro/fornecedores/gastos/')
      .then(
        res => {
          commit('setGraficoGastoFornecedor', res.data)
          return res.data
        }
      ),
    loadAgendaPagamentos: ({ commit }) => axios
      .get('/financeiro/titulos/agenda/')
      .then(
        res => {
          commit('setAgendaPagamentos', res.data.map(m => ({ ...m, startDate: new Date(m.startDate) })))
          return res.data
        }
      ),
    loadGraficoValorTitulos: ({ commit }) => axios
      .get('/financeiro/titulos/')
      .then(
        res => {
          const data = res.data.map(m => ({ arg: m.numero_documento, val: m.saldo }))
          commit('setGraficoValorTitulos', data)
          return data
        }
      )
  },
  modules: {
  }
})
