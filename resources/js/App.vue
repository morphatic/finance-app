<template>
  <v-app>
    <v-app-bar
      app
      flat
      height="70px"
      style="background-color: #fff;"
    >
      <img
        class="ml-5 mr-3 mt-4 mb-4"
        height="40"
        src="../images/logo.svg"
        width="40"
      >
      <v-toolbar-title class="text-h6 pt-1">
        Your<span class="primary--text">Balance</span>
      </v-toolbar-title>
      <v-spacer />
      <notification-menu />
    </v-app-bar>
    <v-main>
      <v-container
        class="pa-0"
        fluid
      >
        <!-- NOTE: If adapted to become a multi-page app, router output would go here -->
        <your-balance-page />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import NotificationMenu from '@/js/components/NotificationMenu'
  import YourBalancePage from '@/js/components/YourBalancePage'
  export default {
    name: 'App',
    components: {
      NotificationMenu,
      YourBalancePage,
    },
    mounted () {
      // load entries from the API
      this.$store.dispatch('loadEntries')
    },
  }
</script>

<style lang="sass">
.theme--light.v-application
  background-color: #f5f6fa
</style>
