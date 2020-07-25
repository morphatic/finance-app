<template>
  <v-alert
    class="info text-center mt-6"
    dark
    dense
  >
    <v-progress-circular
      class="white--text mr-2"
      indeterminate
      size="20"
      width="3"
    />
    We're loading your balance entries. Sit tight.
  </v-alert>
</template>

<script>
  export default {
    name: 'TheLoadingEntriesAlert',
  }
</script>

<style lang="sass">
.v-application
  .v-alert.warning
    border: 1px solid var(--v-info-darken2) !important
</style>
