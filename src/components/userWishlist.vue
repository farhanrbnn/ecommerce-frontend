<template>
  <div id="userWhislist">
    <header-web />
    <b-container class="mt-5">
      <h5 v-if="wishlist.length == 0">Your wishlist is empty</h5>
      <h5 v-if="wishlist.length != 0">Wishlist</h5>
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
      itemId: ''
    }
  },
  created () {
    DataService.get('user/wishlist/'+this.jwtDecode)
    .then((res) => {
      this.wishlist = res.data.data
      
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

</style>
