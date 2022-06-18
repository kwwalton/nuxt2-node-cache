<template>
  <div>
    <h1>I am the contact page.</h1>
    <p>Example with server middleware caching http call made server-side:</p>
    <hr />
    <p v-if="res">
      Response: {{ res }}. The endpoint returns an object from the cache. If not
      in cache, it will be fetched from the server, then set in cache and
      returned from cache.
    </p>
    <hr />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ContactPage',
  async asyncData({ $axios }) {
    try {
      const res = await $axios.$get('/api/cached')
      // NOTE: this puts the data into the component, an object called 'res' that has a userId, id, title, completed property
      return { res }
    } catch (e) {
      console.error('error in here', e)
    }
  },
})
</script>
