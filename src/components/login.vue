<template>
  <div class="login">
    <headerWeb />
     <b-row>
      <b-col class="d-flex align-items-center justify-content-center" md="6">
        <h1 id="brand">GamersCrib</h1>
      </b-col>
      <b-col class="d-flex align-items-left" md="6">
        <b-container>
          <div id="form">
            <h2 class="mb-3">Log In</h2>
            <b-form-group id="input-group-1" label="username" label-for="input-1">
              <b-form-input autocomplete="off" required id="input-1" placeholder="Enter Your Username" v-model="userName"></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Password" label-for="input-2">
               <b-form-input :type="type" required autocomplete="off" id="input-2" placeholder="Enter Your Password" v-model="password"></b-form-input>
               <font-awesome-icon class="eye-icon" @click="toggleIcon" :icon="icon" />
            </b-form-group>
           <p>doesnt have an account ? register <span><router-link to="/register">here</router-link></span></p>
           <b-button class="mt-3" variant="primary" @click="postData">Submit</b-button>
          </div>
        </b-container>
      </b-col>
     </b-row>
  </div>
</template>

<script>
/* eslint-disable */

import headerWeb from '@/components/headerWeb'
import DataService from '../urlApp/user'

export default {
  name: 'login',
  components: {
    headerWeb
  },
  data () {
    return {
      type:'password',
      icon: 'eye',
      userName: '',
      password: ''
    }
  },
  methods: {
    toggleIcon() {
      if(this.type === 'password') {
        this.type = 'text'
        this.icon = 'eye-slash'
      } else {
        this.type = 'password'
        this.icon = 'eye'
      }
    },
    postData () {
      let data = {
        userName: this.userName,
        password: this.password
      }

      DataService.post('user/auth', data)
        .then((res) => {
          console.log(res.data)
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

.eye-icon {
   float: right;
  margin-top: -30px;
  margin-right: 10px;
  position: relative;
  z-index: 1;
  cursor:pointer;
}

</style>
