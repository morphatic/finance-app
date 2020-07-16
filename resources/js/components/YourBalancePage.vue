<template>
  <v-row class="pa-0 ma-0">
    <v-col class="ma-0 pa-0 secondary" cols="12">
      <the-balance-header :balance="balance" />
    </v-col>
    <v-col class="py-0" cols="12">
      <v-alert
        v-if="isUploading"
      >
        <v-progress-circular
          indeterminate
          width="2"
        />
        We're uploading {{ uploadCount }} balance entries. Sit tight.
      </v-alert>
      <the-entries-list :entries="visibleEntries" />
    </v-col>
  </v-row>
</template>

<script>
import TheEntriesList from '@/js/components/TheEntriesList'
import TheBalanceHeader from '@/js/components/TheBalanceHeader'
  export default {
    name: 'YourBalancePage',
    components: {
      TheEntriesList,
      TheBalanceHeader,
    },
    data () {
      return {
        entries: [],
        entriesPerPage: 100,
        isUploading: false,
        page: 1,
        user: this.$store.state.user,
      }
    },
    computed: {
      balance () {
        return this.entries.reduce((bal, e) => bal + e, 0)
      },
      visibleEntries () {
        const start = (this.page - 1) * this.entriesPerPage
        const end = start + this.entriesPerPage
        return this.entries.slice(start, end)
      }
    },
    mounted () {
      // populate entries from API
    },
  }
</script>
