<template>
  <v-card>
    <v-card-title class="pa-0">
      <v-row align="center">
        <v-col v-if="isNew" class="text-h5 py-6 pl-10 font-weight-bold">
          Add Balance Entry
        </v-col>
        <v-col
          v-else
          class="pa-0"
        >
          <v-row
            align="center"
            class="px-8"
            @mouseover="isHovering = !isEditing"
            @mouseleave="isHovering = false"
          >
            <v-col class="py-3" cols="8" md="4" style="line-height: 1.25">
              <span class="font-weight-bold">{{ entry.label }}</span><br>
              <span class="grey--text text--darken-2" style="font-size: .75rem;">
                {{ format(new Date(entry.date), "d MMM, y 'at' h:mm a") }}
              </span>
            </v-col>
            <v-spacer class="d-none d-md-flex" />
            <v-col
              v-if="isHovering"
              class="px-0"
              cols="1"
            >
              <v-btn
                class="primary--text text-decoration-underline"
                text
                x-small
                @click="isEditing = true"
              >
                Edit
              </v-btn>
            </v-col>
            <v-col
              v-if="isHovering"
              class="px-0"
              cols="1"
            >
              <v-btn
                class="primary--text text-decoration-underline"
                text
                x-small
                @click="deleteEntry"
              >
                Delete
              </v-btn>
            </v-col>
            <v-col
              v-html="formatValue(entry.value)"
              cols="4"
              md="3"
              class="py-0 text-right"
              style="font-size: 1rem; font-weight: 600;"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card-title>
    <div v-if="isNew || isEditing">
    <v-divider />
    <v-card-text class="px-8">
      <an-entry-form ref="entryForm" v-model="entry" />
    </v-card-text>
    <v-divider />
    <v-card-actions class="px-8 py-6">
      <v-spacer />
      <v-btn
        class="px-6"
        color="primary lighten-4 primary--text text--lighten-1"
        :elevation="0"
        large
        @click="cancel"
      >
        Cancel
      </v-btn>
      <v-btn
        class="px-6"
        color="primary white--text"
        :elevation="0"
        large
        @click="update"
      >
        {{ isNew ? 'Save' : 'Update' }} Entry
      </v-btn>
    </v-card-actions>
    </div>
  </v-card>
</template>

<script>
  import { format } from 'date-fns'
  import { clone } from '@/js/utilities'
  import AnEntryForm from '@/js/components/AnEntryForm'
  export default {
    name: 'AnEntryCard',
    components: {
      AnEntryForm,
    },
    props: {
      isNew: {
        type: Boolean,
        default: false,
      },
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
        isEditing: false,
        isHovering: false,
        entry: clone(this.value),
        originalEntry: clone(this.value),
      }
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
      cancel () {
        this.entry = this.originalEntry
        this.isEditing = false
        this.$emit('cancel', true)
      },
      deleteEntry () {
        this.$store.dispatch('deleteEntry', this.entry.id)
      },
      format,
      formatValue (val) {
        if (val < 0) {
          return '<span>- $ ' + Math.abs(val).toFixed(2) + '</span>'
        } else {
          return '<span class="success--text">+ $ ' + parseFloat(val).toFixed(2) + '</span>'
        }
      },
      resetForm () {
        if (typeof this.$refs.entryForm !== 'undefined') {
          this.$refs.entryForm.resetForm()
        }
      },
      update () {
        if (this.isEditing) {
          this.$store.dispatch('updateEntry', this.entry)
          this.isEditing = false
        } else {
          this.$emit('done', true)
        }
      },
    },
  }
</script>
