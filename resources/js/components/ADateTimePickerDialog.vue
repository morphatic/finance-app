<template>
  <v-dialog
    ref="dialog"
    v-model="showDialog"
    persistent
    width="300"
  >
    <template #activator="{ attrs, on }">
      <v-text-field
        :value="formattedDatetime"
        v-bind="attrs"
        dense
        outlined
        readonly
        single-line
        v-on="on"
      />
    </template>
    <v-card>
      <v-tabs
        v-model="tab"
        centered
        grow
      >
        <v-tab><v-icon>{{ icons.calendar }}</v-icon></v-tab>
        <v-tab><v-icon>{{ icons.clock }}</v-icon></v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-date-picker
            v-model="date"
            full-width
            @change="tab = 1"
          />
        </v-tab-item>
        <v-tab-item>
          <v-time-picker
            v-model="adjustedTime"
            full-width
            use-seconds
            @change="$refs.dialog.save()"
          />
        </v-tab-item>
      </v-tabs-items>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary--lighten4"
          @click="cancel"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="$refs.dialog.save()"
        >
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mdiCalendar, mdiClock } from '@mdi/js'
  import { add, format } from 'date-fns'
  export default {
    name: 'ADateTimePickerDialog',
    props: {
      value: {
        type: String,
        default: (new Date()).toISOString(),
      },
    },
    data () {
      return {
        date: this.value.substr(0, 10),
        icons: {
          calendar: mdiCalendar,
          clock: mdiClock,
        },
        originalValue: this.value,
        showDialog: false,
        tab: 0,
        time: this.value.substr(11, 8),
      }
    },
    computed: {
      // adjustment necessary because the timepicker does not adjust for timezone automatically
      adjustedTime: {
        get () {
          // convert UTC to a local time string and extract the bits necessary for the picker
          return (new Date(this.datetime)).toTimeString().substr(0, 8)
        },
        set (val) {
          // use the value currently set in the picker to construct a (wrong) UTC datetime
          const d = new Date(this.date + 'T' + val + 'Z')
          // adjust it for the timezone of the user and use the time part to set the time to be stored
          this.time = add(d, { minutes: d.getTimezoneOffset() }).toISOString().substr(11, 8)
        }
      },
      datetime () {
        return this.date + 'T' + this.time + 'Z'
      },
      formattedDatetime () {
        return format(new Date(this.datetime), "d MMM, y 'at' h:mm a")
      },
    },
    mounted () {
      const d = (new Date()).getTimezoneOffset()
    },
    watch: {
      datetime (val) {
        this.$emit('input', val)
      },
    },
    methods: {
      cancel () {
        // reset the datetime to it's original value
        this.date = this.originalValue.substr(0, 10)
        this.time = this.originalValue.substr(11, 8)
        // close the dialog
        this.showDialog = false
      }
    },
  }
</script>
