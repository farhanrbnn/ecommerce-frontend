<template>
  <div id="register">
    <div id="form">
      <h2>Register</h2>
      <b-form-group id="input-group-1" label="First Name" label-for="input-1">
        <b-form-input id="input-1" placeholder="First Name" v-model="firstName" autocomplete="off"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Last Name" label-for="input-2">
        <b-form-input id="input-2" placeholder="Last Name" v-model="lastName" autocomplete="off"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="email" label-for="input-2">
        <b-form-input id="input-2" placeholder="email" v-model="email" autocomplete="off"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Password" label-for="input-4">
        <b-form-input id="input-4" type="password" placeholder="password" v-model="password" autocomplete="off"></b-form-input>
      </b-form-group>
       <b-form-group id="input-group-5" label="re-enter password" label-for="input-5">
        <b-form-input id="input-5" type="password" placeholder="re-enter password" v-model="confirmPassword" autocomplete="off"></b-form-input>
      </b-form-group>
       <b-button class="mt-3" variant="primary" @click="postData">Submit</b-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import DataService from '../urlApp/user'

export default {
  name: 'register',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    postData () {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }

      DataService.create('/post/register', data)
        .then((res) => {
          if (res.data.status === '400') {
            this.email = ''
            this.password = ''
            this.confirmPassword = ''
            this.$notify({
              group: 'auth',
              text: res.data.message,
              type: 'warn'
            })
          } else {
            this.$notify({
              group: 'auth',
              text: 'register successful',
              type: 'success'
            })
            this.$router.push('/login')
          }
        })
        .catch((err) => {
          alert('something went wrong' + err)
        })
    }
  }
}

</script>

<style scoped>
#form {
  margin: 0 auto;
  width: 500px;
}

</style>
