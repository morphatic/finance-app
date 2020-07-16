<template>
  <div>
    <template v-for="(e, i) in groupedEntries">
      <v-row v-if="e.type === 'sub'" :key="i">
        <v-col>{{ e.label }}</v-col>
        <v-spacer />
        <v-col v-html="formatValue(e.value)" />
      </v-row>
      <an-entry-card :entry="e" :key="i" />
    </template>
  </div>
</template>

<script>
  import { differenceInCalendarDays, format } from 'date-fns'
  export default {
    name: 'TheEntriesList',
    props: {
      entries: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      groupedEntries () {
        let day, daydex
        this.entries.reduce((grp, e, i) => {
          const today = (new Date()).toISOString().substr(0, 10)
          // are we on a new date?
          const date = e.date.substr(0, 10)
          if (date !== day) {
            // yes, create a new date subheader
            day = date
            daydex = grp.length
            let label
            if (day === today) {
              label = 'Today'
            } else if (differenceInCalendarDays(new Date(today), new Date(day)) === 1) {
              label = 'Yesterday'
            } else {
              label = format(new Date(day), 'EEE, d MMM')
            }
            grp.push({
              type: 'sub',
              date: label,
              value: e.value,
            })
          } else {
            // no, update the total for the current date
            grp[daydex].value += e.value
          }
          grp.push({ type: 'entry', ...e })
          return grp
        }, [])
      },
    },
    methods: {
      formatValue (val) {
        if (val < 0) {
          return '<span class="negative">- $ ' + Math.abs(val) + '</span>'
        } else {
          return '<span class="positive">+ $ ' + val + '</span>'
        }
      }
    }
  }
</script>
