<template>
  <div>
    <h1>{{ message }} I am the index page.</h1>
    <p v-if="res">{{ res }}</p>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-console */

import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  async asyncData({ $axios }) {
    try {
      const res = await $axios.$get('/api/hello')
      console.log(res)
      return res
    } catch (e) {
      console.log('error in here', e)
    }
  },

  data() {
    return {
      message: 'Hello!',
      res: null,
    }
  },
})
</script>
