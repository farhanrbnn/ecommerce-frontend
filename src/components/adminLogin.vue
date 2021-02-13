<template>
  <div class="login">
    <b-navbar class="mb-5" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/" id="brand">GamersCrib</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item><b-img v-bind:src="require('@/assets/cart-logo.png')" fluid alt="Fluid image"></b-img></b-nav-item>
        <b-nav-item><router-link to="/login"><p id="router">Login</p></router-link></b-nav-item>
      </b-navbar-nav>
      </b-collapse>
     </b-navbar>
     <b-row>
      <b-col class="d-flex align-items-center justify-content-center" md="6">
        <h1 id="brand">GamersCrib</h1>
      </b-col>
      <b-col class="d-flex align-items-left" md="6">
        <b-container>
          <div id="form">
            <h2 class="mb-3">Admin Log In</h2>
            <b-form-group id="input-group-1" label="Email" label-for="input-1">
              <b-form-input autocomplete="off" id="input-1" placeholder="Enter Your Email" v-model="email"></b-form-input>
            </b-form-group>      
            <b-form-group id="in put-group-2" label="Password" label-for="input-2">
               <b-form-input autocomplete="off" id="input-2" placeholder="Enter Your Password" v-model="password"></b-form-input>
            </b-form-group>
           <b-button class="mt-3" variant="primary" @click="postData">Submit</b-button>
          </div>
        </b-container>
      </b-col>
     </b-row>
  </div>
</template>

<script>
import DataService from '../web_service/services'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    postData () {
      let data = {
        email: this.email,
        password: this.password
      }

      DataService.create('/user/auth', data)
        .then((res) => {
          this.$cookies.set('jwt', res.data.token, '1h')

          if (res.data.status === '404') {
            this.$notify({
              group: 'auth',
              text: 'Incorrect e-mail or password',
              type: 'warn'
            })
          } else {
            this.$notify({
              group: 'auth',
              text: 'login successfull',
              type: 'success'
            })

            this.$router.push('/shop')
          }
        })
        .catch((err) => {
          alert(err)
        })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

#form {
 margin-top: 100px;
  width: 500px;
}

#brand {
  font-family: 'Krona One', sans-serif;

}
#router {
  font-size: 20px;
  margin-bottom: 0;
  color: white;
}

</style>
