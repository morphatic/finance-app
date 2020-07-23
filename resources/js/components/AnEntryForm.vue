<template>
  <v-form class="entry-form">
    <v-row>
      <v-col cols="5">
        <span style="font-weight: 600; text-transform: uppercase;font-size: .75rem;">Label</span>
        <v-text-field
          v-model="entry.label"
          dense
          outlined
          placeholder="e.g. Groceries"
          :rules="[v => !!v || 'Descriptive label is required']"
          required
          single-line
          validate-on-blur
        />
      </v-col>
      <v-col cols="4">
        <span style="font-weight: 600; text-transform: uppercase;font-size: .75rem;">Date</span>
        <!-- entry.date should be an ISO 8601 formatted datetime string -->
        <a-date-time-picker-dialog ref="datetimePicker" v-model="entry.date" />
      </v-col>
      <v-col cols="3">
        <span style="font-weight: 600; text-transform: uppercase;font-size: .75rem;">Amount</span>
        <v-text-field
          :value="formattedValue"
          class="amount"
          dense
          outlined
          pattern="^\d+\.\d{2}$"
          :prepend-inner-icon="icons.currency"
          :rules="[
            v => (!!v && !isNaN(v)) || 'Amount should be numeric',
            v => (!!v && +v !== 0) || 'Amount should not be zero',
          ]"
          required
          single-line
          validate-on-blur
          @change="entry.value = parseFloat($event)"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
  import { clone } from '@/js/utilities'
  import { currency } from '@/js/icons'
  import ADateTimePickerDialog from '@/js/components/ADateTimePickerDialog'
  export default {
    name: 'AnEntryForm',
    components: {
      ADateTimePickerDialog,
    },
    props: {
      value: {
        type: Object,
        default: () => ({
          id: 0,
          label: '',
          date: undefined,
          user_id: 1,
          value: 0,
        }),
      },
    },
    data () {
      return {
        icons: {
          currency,
        },
        entry: clone(this.value),
      }
    },
    computed: {
      formattedValue () {
        return parseFloat(this.entry.value).toFixed(2)
      },
    },
    watch: {
      entry: {
        deep: true,
        immediate: true,
        handler (val) {
          this.$emit('input', val)
        },
      },
    },
    methods: {
      resetForm () {
        this.entry = {
          id: 0,
          label: '',
          date: undefined,
          user_id: 1,
          value: 0
        }
        if (typeof this.$refs.datetimePicker !== 'undefined') {
          this.$refs.datetimePicker.resetForm()
        }
      },
      updateValue (val) {
        this.entry.value = parseFloat(val)
      },
    },
  }
</script>

<style>
.entry-form input {
  font-size: .875rem;
}
.amount .v-icon {
  padding-top: 8px;
}
</style>