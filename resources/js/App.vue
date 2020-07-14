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
    <v-content>

    </v-content>
  </v-app>
</template>

<script>
  import NotificationMenu from '@/js/components/NotificationMenu'
  export default {
    name: 'App',
    components: {
      NotificationMenu,
    },
  }
</script>

<style lang="sass">
.theme--light.v-application
  background-color: #f5f6fa
</style>
