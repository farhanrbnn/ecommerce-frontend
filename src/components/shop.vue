<template>
  <div class="shop">
      <headerWeb />
     <b-container class="mt-5">
      </b-overlay>
       <div id="sidenav">
        <h4>Category</h4>
        <b-form-select v-model="selected">
         <b-form-select-option :value="cat" v-for="(cat, index) in categoryList" :key="index">{{ cat }}</b-form-select-option>
        </b-form-select>
       <b-button class="mt-3" variant="primary" @click="select">Select</b-button>
       </div>
       <div id="main">
         <h1>shopping page</h1>
          <b-overlay v-if="this.datas == null" id="overlay" :show="show" :opacity="opacity" rounded="lg">
          </b-overlay>
        <b-row  v-for="(arr, index) in chunk" :key="index" class="mb-5 justify-content-md-center">
          <b-col cols="3" v-for="(data, index) in arr" :key="index" md>
          <router-link id="card" :to="{name:'details', params: {userId: data._id}}">
            <b-card :img-src="data.picture" :title="data.name" style="max-width: 15rem;">
              <b-card-text>
                Rp. {{data.price}}
              </b-card-text>
            </b-card>
            </router-link>
          </b-col>
        </b-row>
       </div>
     </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import headerWeb from '@/components/headerWeb'
import DataService from '../urlApp/user'
import regex from '../utils/regex'

export default {
  name: 'shop',
  components: {
    headerWeb
  },
  data () {
    return {
      datas: null,
      category: null,
      selected: null,
      opacity:0.85,
      show:true
    }
  },
  created () {
    DataService.get('/items')
      .then((res) => {
        let apiData = res.data.data
        let categoryArr = []

        for (let i = 0; i < apiData.length; i++) {
          let priceRegex = regex(apiData[i].price)
          apiData[i].price = priceRegex

          categoryArr.push(apiData[i].category)
          categoryArr.sort()
        }

        this.datas = apiData
        this.show = false
        this.category = categoryArr
      })
      .catch((err) => {
        alert('error when fetching API: ' + err)
      })
  },
  methods: {
    select () {
      let postCat = {
        category: this.selected
      }

      if (this.selected === 'All') {
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
            alert('error when fetching API: ' + err)
          })
      }

      DataService.post('/items/category', postCat)
        .then((res) => {
          let apiData = res.data.data

          for (let i = 0; i < apiData.length; i++) {
            let priceRegex = regex(apiData[i].price)
            apiData[i].price = priceRegex
          }
          this.datas = apiData
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    chunk () {
      let chunkedArr = []
      let array = this.datas

      if (array) {
        for (let i = 0; i < array.length; i++) {
          let last = chunkedArr[chunkedArr.length - 1]

          if (!last || last.length === 4) {
            chunkedArr.push([array[i]])
          } else {
            last.push(array[i])
          }
        }
      }
      return chunkedArr
    },
    categoryList () {
      let array = this.category
      let categoryArr = ['All']

      if (array) {
        for (let i = 0; i < array.length; i++) {
          let j = i + 1

          if (j <= array.length) {
            if (array[i] !== array[j]) {
              categoryArr.push(array[i])
            }
          }
        }
      }
      return categoryArr
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

#router {
  font-size: 20px;
  margin-bottom: 0;
  color: white;
}

#overlay {
  margin-top: 200px;
}

#brand {
  font-family: 'Krona One', sans-serif;

}

#sidenav {
  height: 50%;
  width: 160px;
  position: fixed;
  z-index: 1;
  top: 100px;
  left: 350px;
  /*background-color: #E6E6E6;*/
  background-color: white;
  /*overflow-x: hidden; */
  padding-top: 40px;
  border-radius: 10px;
}

#navbar {
  padding-bottom: 50px;

}

#main {
  margin-left: 160px; /* Same as the width of the sidebar */
  padding: 0px 10px;
}

#card {
  color: black;
}
</style>
