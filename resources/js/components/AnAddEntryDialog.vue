<template>
  <v-dialog
    v-model="showDialog"
    persistent
    width="700"
  >
    <template #activator="{ attrs, on }">
      <v-btn
        v-bind="attrs"
        class="ml-3"
        color="primary"
        v-on="on"
      >
        <v-icon>{{ icons.add }}</v-icon>
        Add Entry
      </v-btn>
    </template>
    <an-entry-card
      v-model="entry"
      :isNew="true"
      @cancel="cancel"
      @done="save"
    />
  </v-dialog>
</template>

<script>
  import { mdiPlus } from '@mdi/js'
  import { clone } from '@/js/utilities'
  import AnEntryCard from '@/js/components/AnEntryCard'
  export default {
    name: 'AnAddEntryDialog',
    components: {
      AnEntryCard,
    },
    props: {
      value: {
        type: Object,
        default: () => ({
          id: 0,
          label: '',
          date: (new Date()).toISOString(),
          value: 0,
        }),
      },
    },
    data() {
      return {
        entry: clone(this.value),
        icons: {
          add: mdiPlus,
        },
        showDialog: false,
      }
    },
    methods: {
      cancel () {
        this.showDialog = false
      },
      save () {
        this.$emit('save', this.entry)
        this.showDialog = false
      },
    },
  }
</script>
