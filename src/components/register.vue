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
           <span class="error" v-if="msg.email">{{msg.email}}</span>
        </b-form-group>
        <b-form-group id="input-group-3" label="username" label-for="input-3">
          <b-form-input id="input-3" placeholder="username" v-model="userName" autocomplete="off" required></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="Gender" label-for="input-4">
          <b-form-select id="input-4" v-model="selected" :options="options"></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-5" label="Password" label-for="input-5">
         <b-form-input id="input-5" :type="type" placeholder="password" v-model="password" autocomplete="off" required></b-form-input>
          <font-awesome-icon class="eye-icon" @click="toggleIcon" :icon="icon" />
        </b-form-group>
        <b-form-group id="input-group-6" label="re-enter password" label-for="input-6">
          <b-form-input id="input-6" type="password" placeholder="re-enter password" v-model="confirmPassword" autocomplete="off" required></b-form-input>
           <span class="error" v-if="msg.password">{{msg.password}}</span>

        </b-form-group>
        <b-button class="mt-3" variant="primary" @click="postData">Submit</b-button>
      </b-card>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */

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
      userName: '',
      password: '',
      confirmPassword: '',
      selected:null,
      type: 'password',
      icon: 'eye',
      options:[
        {value:'male', text:'male'},
        {value:'female', text:'female'}
        ],
      msg: []
    }
  },
  watch: {
    email (value) {
      this.email = value
      this.validateEmail(value)
    },
    confirmPassword (value) {
      this.confirmPassword = value
      this.validatePassword(value)
    }
  },
  methods: {
    validateEmail (value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg['email'] = ''
      } else {
        this.msg['email'] = 'Invalid Email Address'
      }
    },
    validatePassword (value) {
      const password = this.password

      if (value !== password) {
        this.msg['password'] = "password doesn't match"
      } else {
        this.msg['password'] = ''
      }
    },
    toggleIcon() {
      if (this.type === 'password'){
        this.type = 'text'
        this.icon = 'eye-slash'
      } else {
        this.type = 'password'
        this.icon = 'eye'
      }
    },
    postData () {
      let data = {
        name: this.fullName,
        userName: this.userName,
        email: this.email,
        gender: this.selected,
        password: this.password,
        confirmPassword: this.confirmPassword
      }

      console.log(data)

      DataService.post('user/register', data)
        .then((res) => {
          console.log(res.data)
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
.error {
  color:red;
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
