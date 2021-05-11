<template>
  <div id="userWhislist">
    <header-web />
    <b-container>
      <h5 v-if="wishlist.length == 0">Your wishlist is empty</h5>
    </b-container>
  </div>
</template>

<script>
import headerWeb from '@/components/headerWeb'
import DataService from '../urlApp/user'

export default {
  name: 'userWihslist',
  components :{
    headerWeb
  },
  data () {
    return {
      wishlist:''
    }
  },
  created () {
    DataService.get('user/wishlist/'+this.jwtDecode)
    .then((res) => {
      this.wishlist = res.data.data.wishlist
    })
    .catch((err) => {
      console.log(err)
    })

  },
  computed: {
    jwtDecode () {
      const jwt = this.$cookies.get('jwt')
      const decode = JSON.parse(atob(jwt.split('.')[1]))

      return decode.id

    }
  }
}
</script>

<style scoped>

</style>
