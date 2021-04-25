<template>
  <div id="register">
    <headerWeb />
    <div class="d-flex container justify-content-center"> 
    <div id="form">
      <b-card>
        <h2>Register</h2>
        <b-form-group id="input-group-1" label="Full Name" label-for="input-1">
          <b-form-input id="input-1" placeholder="full name" v-model="fullName" autocomplete="off" required></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="email" label-for="input-2">
          <b-form-input id="input-2" placeholder="email" v-model="email" autocomplete="off" required></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="username" label-for="input-3">
          <b-form-input id="input-3" placeholder="username" v-model="userName" autocomplete="off" required></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="Password" label-for="input-4">
         <b-form-input id="input-4" type="password" placeholder="password" v-model="password" autocomplete="off" required></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-5" label="re-enter password" label-for="input-5">
          <b-form-input id="input-5" type="password" placeholder="re-enter password" v-model="confirmPassword" autocomplete="off" required></b-form-input>
        </b-form-group>
        <b-button class="mt-3" variant="primary" @click="postData">Submit</b-button>
      </b-card>
    </div>
  </div>
</div>
</template>

<script>
import headerWeb from '@/components/headerWeb'
import DataService from '../urlApp/user'

export default {
  name: 'register',
  components: {
    headerWeb
  },
  data () {
    return {
      fullName: '',
      email: '',
      userName:'',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    postData () {
      let data = {
        name: this.fullName,
        userName: this.userName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      }
      
      DataService.post('user/register', data)
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
  margin-top: 50px;
  /*margin: 0 auto;*/
  width: 500px;
}

</style>
