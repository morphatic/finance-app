<template>
  <v-container
  class="my-0 mx-auto py-0"
  style="max-width: 800px;"
  >

    <template v-for="e in groupedEntries">
      <v-row
        v-if="e.type === 'sub'"
        class="mt-8"
        :key="e.sub + e.date"
      >
        <v-col
          class="pl-4 text-uppercase grey--text text--darken-2"
          style="font-size: .875rem; font-weight: 600;"
        >
          {{ e.date }}
        </v-col>
        <v-col class="d-none d-md-flex" />
        <v-col
          v-html="formatValue(e.value)"
          class="text-uppercase grey--text text--darken-2 text-right pr-8"
          style="font-weight: 600;"
        />
      </v-row>
      <an-entry-card
        v-else
        class="mb-4"
        :value="e"
        :key="e.id"
      />
    </template>
  </v-container>
</template>

<script>
  import { differenceInCalendarDays, format } from 'date-fns'
  import AnEntryCard from '@/js/components/AnEntryCard'
  export default {
    name: 'TheEntriesList',
    components: {
      AnEntryCard,
    },
    props: {
      entries: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      groupedEntries () {
        let day, daydex, diff
        return this.entries.reduce((grp, e, i) => {
          // are we on a new date?
          const date = format(new Date(e.date), 'y-MM-dd')
          if (date !== day) {
            // yes, create a new date subheader
            day = date
            daydex = grp.length
            diff = differenceInCalendarDays(new Date(), new Date(e.date))
            const label = diff === 0 ? 'Today' : diff === 1 ? 'Yesterday' : format(new Date(e.date), 'EEE, d MMM')
            grp.push({
              type: 'sub',
              date: label,
              value: parseFloat(e.value),
            })
          } else {
            // no, update the total for the current date
            grp[daydex].value += parseFloat(e.value)
          }
          grp.push({ type: 'entry', ...e })
          return grp
        }, [])
      },
    },
    methods: {
      formatValue (val) {
        if (parseFloat(val) < 0) {
          return '<span class="negative">- $ ' + Math.abs(val).toFixed(2) + '</span>'
        } else {
          return '<span class="success--text">+ $ ' + parseFloat(val).toFixed(2) + '</span>'
        }
      }
    }
  }
</script>
