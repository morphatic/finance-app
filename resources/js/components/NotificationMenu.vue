<template>
  <v-toolbar-items class="pt-4">
    <div v-if="isLoggedIn">
      <v-badge
        :content="notifications.length"
        :value="notifications.length"
        overlap
      >
        <v-btn
          class="mr-0 pr-0"
          icon
          small
        >
          <img :src="icons.alarm" alt="notifications" />
        </v-btn>
      </v-badge>
      <v-btn
        class="text-capitalize font-weight-bold pl-0"
        style="color: #74798c;letter-spacing: normal;"
        text
      >
        <v-avatar
          class="ml-1 mr-3"
          size="32"
        >
          <img
            :alt="user.name"
            :src="user.avatar"
          >
        </v-avatar>
        {{ user.name }}
      </v-btn>
    </div>
    <v-btn v-else>
      <!-- this button would link to an actual login form -->
      Login
    </v-btn>
  </v-toolbar-items>  
</template>

<script>
  import alarm from '@/images/alarm.svg'
  export default {
    name: 'NotificationMenu',
    data() {
      return {
        icons: {
          alarm,
        },
        isLoggedIn: true, // placeholder; to be replaced by robust authentication system
        notifications: [], // displays a badge over the notifications icon, if non-zero
        user: this.$store.state.user
      }
    },
  }
</script>
