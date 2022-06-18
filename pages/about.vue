<template>
  <div>
    <h1>I am the about page.</h1>
    <p>
      Example with server middleware not caching the http call that is made
      server-side:
    </p>
    <hr />
    <p v-if="res">Response: {{ res }}. The endpoint returns an object.</p>
    <hr />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AboutPage',
  async asyncData({ $axios }) {
    try {
      const res = await $axios.$get('/api/not-cached')
      // NOTE: this puts the data into the component, an object called 'res' that has a userId, id, title, completed property
      return { res }
    } catch (e) {
      console.error('error in here', e)
    }
  },
})
</script>
