<template>
  <v-container
    class="my-0 mx-auto py-0"
    style="max-width: 800px;"
  >
    <v-row
      align="center"
      justify="center"
      :style="{ height: ['xs', 'sm'].includes($vuetify.breakpoint.name) ? '190px' : '120px' }"
    >
      <v-col class="text-h5 white--text" cols="6" md="8">
        Your Balance
        <span class="d-none d-md-inline">
          <an-add-entry-dialog @save="save" />
          <a-csv-dialog />
        </span>
      </v-col>
      <v-col cols="6" md="4">
        <v-row>
          <v-col
            class="pb-0 text-uppercase grey--text text-right"
            style="font-size: .75rem; font-weight: 600;"
          >
            Total Balance
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pt-1 success--text text-h4 text-right"
          >
            ${{ Math.floor(balance) }}.<span class="text-h6">{{ (balance % 1).toFixed(2).toString().substr(-2) }}</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="d-md-none text-center" cols="12">
        <an-add-entry-dialog @save="save" />
        <a-csv-dialog />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ACSVDialog from '@/js/components/ACSVDialog'
  import AnAddEntryDialog from '@/js/components/AnAddEntryDialog'
  export default {
    name: 'BalanceHeader',
    components: {
      'a-csv-dialog': ACSVDialog,
      AnAddEntryDialog,
    },
    props: {
      balance: {
        type: Number,
        default: 0,
      },
    },
    data: () => ({
      showCSVDialog: false,
      showEntryDialog: false,
    }),
    methods: {
      save (entry) {
        this.$store.dispatch('addEntry', entry)
      },
    },
  }
</script>
