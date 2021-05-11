<template>
  <div id="purchasedAccept">
    <headerWeb />
    <b-container>
      <b-img id="img" v-bind:src="require('@/assets/purchased.svg')"></b-img>
      <h2 class="mt-5">Thank you ! this is not an actual purchased. This website is for my portofolio project. </h2>
      <h2 class="mt-3">
       <router-link id="card" to="/">
        Go Home
       </router-link>
      </h2>
    </b-container>
  </div>
</template>

<script>
import headerWeb from '@/components/headerWeb'

export default {
  name: 'purchasedAccept',
  components: {
    headerWeb
  }
}
</script>

<style scoped>
#img {
  margin-top: 20px;
  width: 500px;
}

</style>