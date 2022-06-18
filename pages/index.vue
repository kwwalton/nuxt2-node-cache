<template>
  <div>
    <h1>I am the index page.</h1>
    <hr />
    <p v-if="resVar">Response: {{ resVar }}.</p>
    <hr />
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
      // NOTE: this puts the data into the component, if you just return the res, you get a property for each letter in the string
      return { resVar: res }
    } catch (e) {
      console.error('error in here', e)
    }
  },

  data() {
    return {}
  },
})
</script>
