import Vue from 'vue'
import Crud from '@/components/Crud.vue'
import TituloPagamento from '@/components/titulos/Pagamento.vue'
import DetalhePagamento from '@/components/titulos/Detalhes.vue'
import ChartOne from '@/components/dashboard/ChartOne.vue'
import ChartTwo from '@/components/dashboard/ChartTwo.vue'
import ChartThree from '@/components/dashboard/ChartThree.vue'
import ChartFour from '@/components/dashboard/ChartFour.vue'

Vue.component('app-crud', Crud)
Vue.component('app-titulo-pagamento', TituloPagamento)
Vue.component('app-detalhe-pagamento', DetalhePagamento)
Vue.component('chart-one', ChartOne)
Vue.component('chart-two', ChartTwo)
Vue.component('chart-three', ChartThree)
Vue.component('chart-four', ChartFour)
