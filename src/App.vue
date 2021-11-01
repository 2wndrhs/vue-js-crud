<template>
  <v-app>
    <v-app-bar
      app
      dark
      color="primary"
    >
      <div class="d-flex mr-2">
        bezKoder
      </div>
      <v-tabs>
        <v-tab to="/tutorials">
          Tutorials
        </v-tab>
        <v-tab to="/add">
          Add
       </v-tab>
      </v-tabs>  
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  }),
};
</script>
