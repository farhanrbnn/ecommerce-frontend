<template>
  <div id="details">
    <headerWeb />
    <b-container  id="content" >
      <b-row v-if="datas" class="justify-content-md-center">
        <b-col cols="12">
          <b-card>
            <b-row>
              <b-col cols="4">
                <img id="product-image" :src="datas.picture">
              </b-col>
              <b-col cols="8">
                <h3>{{datas.name}}</h3>
                <b-row>
                   <h4 id="label" class="mr-3">price</h4>
                   <h4>Rp.{{datas.price}}</h4>
                </b-row>
                <b-row class="mt-3">
                  <b-col cols="4">
                    <label for="amount">Jumlah</label>
                    <b-form-spinbutton id="amount" min="1" v-model="value" max="100"></b-form-spinbutton>
                  </b-col>
                  <b-col cols="8" class="d-flex justify-content-end align-items-center">
                    <p v-if="this.datas.quantity > 5">
                      <strong>In-Stock</strong>
                    </p>
                    <p id="remaining-stock" v-if="this.datas.quantity <= 5 && this.datas.quantity != 0">
                      <strong>
                        remaining stock < 5 !
                      </strong>
                    </p>
                     <p id="remaining-stock" v-if="this.datas.quantity === 0">
                      <strong>
                        Out of Stock !
                      </strong>
                    </p>
                  </b-col>
                </b-row>
                <b-row class="mt-3 mb-3">
                  <b-col>
                    <h5>description</h5>
                    <p>{{datas.description}}</p>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-button size="md" @click="addWishlist" variant="danger" class="mt-3">
                  <b-icon icon="heart-fill"></b-icon>
                </b-button>
                <b-button v-if="this.datas.quantity > 0" class="mt-3" @click="addCart" variant="primary" >Add to Cart</b-button>
                <b-button v-if="this.datas.quantity > 0" class="mt-3" @click="buyNow"  variant="primary">Buy Now</b-button>

                <b-button disabled v-if="this.datas.quantity === 0" class="mt-3" @click="addCart" variant="primary" >Add to Cart</b-button>
                <b-button disabled v-if="this.datas.quantity === 0" class="mt-3" @click="buyNow"  variant="primary">Buy Now</b-button>

              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row style="margin-top: 100px;">
        <b-col cols=12>
          <h3>Related Products</h3>
        </b-col>
      </b-row>
      <b-row  class="d-flex justify-content-lg-center">
        <b-col v-for="(arr, index) in itemByCat" :key="index" v-if="itemByCat.length <= 4" cols="3">
          <b-card @click="relatedClick(arr._id)" :img-src="arr.picture" :title="arr.name">
            <b-card-text>
              Rp. {{arr.price}}
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
     </b-container>
   </div>
</template>
<script>
/* eslint-disable */

import headerWeb from '@/components/headerWeb'
import DataService from '../urlApp/user'
import regex from '../utils/regex'
import toInteger from '../utils/toInteger'
import orderUpdate from '../utils/orderUpdate'
import Swal from 'sweetalert2'


export default {
  name: 'details',
  props: ['userId'],
  components: {
    headerWeb
  },
  data () {
    return {
      datas: null,
      url: '/items/' + this.userId,
      relatedUrl: 'items/related/' + this.userId,
      value: 1,
      category: null,
      itemByCat: null,
      jwt: null,
      hide: true
    }
  },
  async created () {
    this.jwt = this.$cookies.get('jwt')
    await DataService.get(this.url)
      .then((res) => {
        let apiData = res.data.data
        apiData.price = regex(apiData.price)

        this.datas = apiData
        this.category = apiData.category
      })
      .catch((err) => {
        alert('error when fetching API' + err)
      })

    await DataService.get(this.relatedUrl)
      .then((res) => {
        const apiData = res.data.data

        for (let i = 0; i < apiData.length; i++) {
          const priceRegex = regex(apiData[i].price)
          apiData[i].price = priceRegex
        }

        this.itemByCat = apiData
      })
      .catch((err) => {
        alert('error when fetching API' + err)
      })

  },
  computed:{
    jwtDecode () {
      const jwt = this.$cookies.get('jwt')
      const decodedJwt = JSON.parse(atob(jwt.split('.')[1]))

      return decodedJwt.id

    }
  },
  methods: {
    addWishlist () {
      const url = 'user/wishlist'

      if(this.jwt){
        const data = {
          item:this.userId,
          user: this.jwtDecode
        }
        
        try {
          DataService.post(url, data)
          .then((res) => {
             this.$notify({
                group: 'cart',
                text: 'Success add item to wishlist',
                type: 'success'
              })
          })
          .catch((err) => {
            this.$notify({
              group: 'cart',
              text: 'Failed add item to wishtlist',
              type: 'warn'
            })
          })
        } catch (err) {
          console.log(err)
        }

      } else {
        Swal.fire({
          title:'info',
          text:'you need to login first',
          icon:'info',
          showConfirmButton: false,
          timer: 1000
        })
        .then(() => {
          this.$router.push('/login')
        })
      }
      
    },
    buyNow () {
      let priceInt = toInteger(this.datas.price)
      let total = this.value * priceInt

      let order = {
        picture: this.datas.picture,
        product: this.datas.name,
        price: this.datas.price,
        id: this.userId,
        quantity: this.value,
        subTotal: total
      }

      if (this.jwt) {
        const data = {
          itemid: this.userId,
          quantity: this.value,
          subtotal: total,
          user: this.jwtDecode
        }

        DataService.post('user/cart', data)
        .then((res) => {
          const msg = res.data.message

          if(msg){
            this.$notify({
              group: 'cart',
              text: 'success add item to cart',
              type: 'success'
            })

            this.$router.push('/cart')
          } else {
            this.$notify({
              group: 'cart',
              text: 'failed add item to cart',
              type: 'warn'
            })
          }
        })
        .catch((err) => {
          this.$notify({
            group: 'cart',
            text: err,
            type: 'warn'
          })
        })
      
      } else {
        Swal.fire({
          title:'info',
          text:'you need to login first',
          icon:'info',
          showConfirmButton: false,
          timer: 1000
        })
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
    addCart () {
      let priceInt = toInteger(this.datas.price)
      let total = this.value * priceInt

      if(this.jwt){
        const data = {
          itemid: this.userId,
          quantity: this.value,
          subtotal: total,
          user: this.jwtDecode
        }

        DataService.post('user/cart', data)
        .then((res) => {
          const msg = res.data.message

          if(msg){
            this.$notify({
              group: 'cart',
              text: 'success add item to cart',
              type: 'success'
            })
          } else {
            this.$notify({
              group: 'cart',
              text: 'failed add item to cart',
              type: 'warn'
            })
          }
        })
        .catch((err) => {
          this.$notify({
            group: 'cart',
            text: err,
            type: 'warn'
          })
        })
      }else{
        Swal.fire({
          title:'info',
          text:'you need to login first',
          icon:'info',
          showConfirmButton: false,
          timer: 1000
        })
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
    authLogout () {
      this.$cookies.remove('jwt')
      this.$router.push('/login')
    }
  }
}

</script>

<style>
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

#remaining-stock {
  color: red;
}

</style>
