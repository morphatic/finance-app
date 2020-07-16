<template>
  <v-card>
    <v-card-title>
      <v-row align="center">
        <v-col v-if="isNew" class="text-h5 pl-6 font-weight-bold">
          Add Balance Entry
        </v-col>
        <v-col v-else>
          <v-row
            @mouseover="isHovering = !isEditing"
            @mouseleave="isHovering = false"
          >
            <v-col cols="3">
              <p class="subtitle-1">{{ entry.label }}</p>
              <p class="overline">{{ entry.date }}</p>
            </v-col>
            <v-spacer />
            <v-col
              v-if="isHovering"
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
              cols="2"
              class="subtitle-1 text-right"
            >
              {{ entry.value }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-title>
    <div v-if="isNew || isEditing">
    <v-divider />
    <v-card-text class="px-10">
      <an-entry-form v-model="entry" />
    </v-card-text>
    <v-divider />
    <v-card-actions class="px-10 py-6">
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
        @click="$emit('done', true)"
      >
        {{ isNew ? 'Save' : 'Update' }} Entry
      </v-btn>
    </v-card-actions>
    </div>
  </v-card>
</template>

<script>
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
          date: '',
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
        this.$emit('cancel', true)
      },
    },
  }
</script>
