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
        :disabled="$store.state.isUploading"
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
      <v-card-text class="px-8 py-8">
        <span style="font-weight: 600; text-transform: uppercase;font-size: .75rem;">.CSV File</span>
        <v-file-input
          ref="fileInput"
          v-model="csvFile"
          accept="text/csv"
          dense
          outlined
          placeholder="No file selected"
          :prepend-icon="''"
          :rules="[v => !!v || 'CSV File is required']"
          required
          single-line
          style="font-size: .75rem"
          validate-on-blur
          @change="countLines"
        >
          <template #append>
            <v-btn
              class="pa-2 primary--text"
              style="font-size: .75rem; letter-spacing: inherit; margin-top: -6px; text-decoration: underline; text-transform: inherit;"
              text
              @click="$refs.fileInput.$el.getElementsByTagName('input')[0].click()"
            >
              Select File
            </v-btn>
          </template>
        </v-file-input>
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
          @click="importCSV"
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
      csvFile: undefined,
      icons: {
        upload: mdiUpload,
      },
      showDialog: false,
    }),
    methods: {
      countLines () {
        // get local copy of store for use in arrow function
        const store = this.$store
        // if a file has been selected
        if (this.csvFile) {
          // read the text
          this.csvFile.text().then(t => {
            // then count the lines (minus header) and update the store
            store.dispatch('updateCount', t.split('\n').length - 1)
          })
        }
      },
      importCSV () {
        const formData = new FormData()
        formData.append('file', this.csvFile)
        formData.append('user_id', this.$store.state.user.id)
        this.$store.dispatch('uploadEntries', formData)
        this.showDialog = false
      },
    },
  }
</script>
