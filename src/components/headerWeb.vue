<template>
		<b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/" id="brand">GamersCrib</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="jwt"><router-link to="/cart"><b-img v-bind:src="require('@/assets/cart-logo.png')" fluid alt="Fluid image"></b-img></router-link></b-nav-item>
        <b-nav-item v-if="!jwt" v-show="true"><router-link to="/login"><p id="router">Login</p></router-link></b-nav-item>
         <b-nav-item-dropdown v-if="jwt" text="Account" right>
          <b-dropdown-item href="http://localhost:8080/account/order-history">Order History</b-dropdown-item>
          <b-dropdown-item href="http://localhost:8080/account/wishlist">My Whistlist</b-dropdown-item>
          <b-dropdown-item href="#" @click="removeAuth">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      </b-collapse>
     </b-navbar>		
	
</template>

<script>
export default {
	name: 'header',
  data () {
    return{
      jwt: null
    }
  },
  created () {
    this.jwt = this.$cookies.get('jwt')
  },
  methods: {
    removeAuth () {
      this.$cookies.remove('jwt')
      this.$router.push('/login')
    }
  }
}
	
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

#description {
  text-align: justify;
}

#router {
  font-size: 20px;
  margin-bottom: 0;
  color: white;
}

#brand {
  font-family: 'Krona One', sans-serif;

}

#product-image {
  width: 300px;
  height: 300px;

}

#content {
  margin-top: 100px;
}

#label {
  color: #bbbfca;
}
	
</style>