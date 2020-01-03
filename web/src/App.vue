<template>
  <v-app id="app">
    <v-navigation-drawer
      color="#ECF3FF"
      :touchless="true"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list
        dense
        flat
      >
        <v-list-item
          v-for="item in $router.options.routes"
          :key="item.text"
          :to="item.path"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title id="listaT">
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="#1D3C78"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        class="ml-0 pl-4"
      >
        <span id="titulo" class="hidden-sm-and-down"><strong>Hifuzion Financeiro</strong></span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null
    }
  }
}
</script>
<style>
#titulo {
  font-size: 30px;
}
#listaT{
  font-size: 15px;
  height:25px;
  padding: 3px;
}
</style>
