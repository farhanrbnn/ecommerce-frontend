<template>
  <div class="homepage">
     <headerWeb />
     <b-container class="px-0" fluid>
      <b-img id="home-img" v-bind:src="require('@/assets/home-pic.jpg')" fluid alt="Fluid image"></b-img>
      <h1 class="centered">{{ pic }}</h1>
      <b-button id="button_center" variant="light"><router-link to="/shop"><p id="router-shop">Shop Now</p></router-link></b-button>
      <b-container>
        <div id="home-content">
        <h2 class="pb-3">Store at a Glance</h2>
        <b-row class="justify-content-md-center">
          <b-col v-for="(data, index) in datas" :key="index" v-if="index<=3" md>
            <router-link id="card" :to="{name:'details', params: {userId: data._id}}">
            <b-card :img-src="data.picture" img-alt="Image" img-top :title="data.name" style="max-width: 15rem;">
              <b-card-text>
                  Rp. {{data.price}}
              </b-card-text>
            </b-card>
            </router-link>
          </b-col>
        </b-row>
      </div>
      </b-container>
      <b-container>
        <h3 class="py-5">{{quote}}</h3>
      </b-container>
     </b-container>
  </div>
</template>

<script>
/* eslint-disable */

import headerWeb from '@/components/headerWeb'
import DataService from '../urlApp/user'
import regex from '../utils/regex'

export default {
  name: 'homepage',
  components: {
    headerWeb
  },
  data () {
    return {
      pic: 'UPGRADE YOUR GAMING NEEDS',
      quote: '- every gamer needs a good gear -',
      datas: null,
      index: 0
    }
  },
  created () {
    DataService.get('/items')
      .then((res) => {
        let apiData = res.data.data

        for (let i = 0; i < apiData.length; i++) {
          let priceRegex = regex(apiData[i].price)

          apiData[i].price = priceRegex
        }

        this.datas = apiData
      })
      .catch((err) => {
        alert('error when catching API' + err)
        console.log(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

h3 {
  font-family: 'Krona One', sans-serif;

}

.centered {
  font-family: 'Krona One', sans-serif;
  font-size: 45px;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#home-img {
  opacity: 0.8;
}
#brand {
  font-family: 'Krona One', sans-serif;

}
#button_center {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 90px;
  transform: translate(-50%, -50%);
}

#router {
  font-size: 20px;
  margin-bottom: 0;
  color: white;
}

#router-shop {
  color: black;
  margin-bottom: 0;
}

#home-content {
  margin-top: 30px;
}

#card {
  color: black;
}

#card-title {

}
</style>
