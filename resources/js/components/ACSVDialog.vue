<template>
  <v-dialog
    v-model="showDialog"
    persistent
    width="700"
  >
    <template #activator="{ attrs, on }">
      <v-btn
        v-bind="attrs"
        class="ml-3 pl-2"
        color="primary"
        v-on="on"
      >
        <v-icon class="mr-2">{{ icons.upload }}</v-icon>
        Import CSV
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="pa-0">
        <v-row align="center">
          <v-col class="text-h5 py-6 pl-10 font-weight-bold">
            Import Balance Entries
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider />
      <v-card-text class="px-8">
        TBD
      </v-card-text>
      <v-divider />
      <v-card-actions class="px-8 py-6">
        <v-spacer />
        <v-btn
          class="px-6"
          color="primary lighten-4 primary--text text--lighten-1"
          :elevation="0"
          large
          @click="showDialog = false"
        >
          Cancel
        </v-btn>
        <v-btn
          class="px-6"
          color="primary white--text"
          :elevation="0"
          large
          @click="showDialog = false"
        >
          Import
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mdiUpload } from '@mdi/js'
  export default {
    name: 'ACSVDialog',
    data: () => ({
      icons: {
        upload: mdiUpload,
      },
      showDialog: false,
    }),
  }
</script>
