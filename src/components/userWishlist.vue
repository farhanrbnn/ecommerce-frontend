<template>
  <div id="userWhislist">
    <header-web />
      <b-overlay :show="show" :opacity="opacity" rounded="sm">
        <b-container class="mt-5">
          <h3 class="mb-5">Wishlist</h3>
          <b-img id="img" v-if="showImg" v-bind:src="require('@/assets/wishlist.svg')"></b-img>
          <h3 class="mt-5" v-if="wishlist.length == 0">Your wishlist is empty</h3>
          <b-card v-if="wishlist" v-for="(data, idx) in wishlist" :key="idx">
            <b-row>
              <b-col md="4">
                <b-card-img id="picture":src="data.item.picture" alt="Image" class="rounded-0"></b-card-img>
              </b-col>
              <b-col class="d-flex justify-content-start">
                <h5>{{data.item.name}}</h5>
              </b-col>
            </b-row>  
            <b-row>
              <b-col class="d-flex justify-content-end align-items-end">
                <b-button class="mt-3" @click="goTo(data.item._id)" variant="primary" >Go to product page</b-button>
              </b-col>
            </b-row>    
         </b-card>
       </b-container>
      </b-overlay>
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
      wishlist:'',
      itemId: '',
      show: true,
      showImg: null,
      opacity: 1
    }
  },
  created () {
    DataService.get('user/wishlist/'+this.jwtDecode)
    .then((res) => {
      this.wishlist = res.data.data

      // show illustration image
      if (this.wishlist.length > 1) {
        this.showImg = false      
      }

      if (this.wishlist.length === 0) {
        this.showImg = true
      }

      // loading
      this.show = false

      for(let i = 0; i < this.wishlist.length; i++){
        this.itemId = this.wishlist[i].item._id
      }
    })
    .catch((err) => {
      console.log(err)
    })

  },
  methods: {
    goTo (id) {
      this.$router.push('/shop/'+id)
    }
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
#picture {
  max-width: 10rem; 
  height: auto;
}

#img {
  margin-top: 20px;
  width: 500px;
}

</style>
