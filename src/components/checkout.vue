<template>
  <b-overlay :show="show" :opacity="opacity" rounded="sm">
  <div class="checkout">
    <headerWeb />
     <b-container class="mt-5" id="content">
      <b-row>
        <b-col md="6">
          <h4>BILLING DETAILS</h4>
          <div class=" mt-4" v-if="this.userAddress.length == 0">
            <div class="mt-4">
              <p class="d-flex align-items-left mb-2">Address</p>
              <b-form-textarea
                v-model="address"
                id="textarea"
                placeholder="Address"
                max-rows="3"
              ></b-form-textarea>
            </div>

            <div class="mt-4">
              <p class="d-flex align-items-left mb-2">Provinsi</p>
              <b-form-select v-model="prov_id">
                <b-form-select-option v-for="(prov, idx) in provinsi" :key="idx" :value="prov">{{ prov.nama }}</b-form-select-option>
               </b-form-select>
             </div>

            <div class="mt-4">
              <p class="d-flex align-items-left mb-2">Kota</p>
              <b-form-select v-model="kota_id">
                <b-form-select-option v-for="(kot, idx) in kota" :key="idx" :value="kot">{{ kot.nama }}</b-form-select-option>
              </b-form-select>
            </div>

            <div class="mt-4">
              <p class="d-flex align-items-left mb-2">Kecamatan</p>
              <b-form-select v-model="kec_id">
                <b-form-select-option v-for="(kec, idx) in kecamatan" :key="idx" :value="kec">{{ kec.nama }}</b-form-select-option>
              </b-form-select>
            </div>

            <div class="mt-4">
              <p class="d-flex align-items-left mb-2">Kode Pos</p>
             <b-form-input
              id="kode-pos"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Kode Pos"
              v-model="kodePos"
              ></b-form-input>
            </div>
        <!-- <p> {{kecamatan}}</p> -->
          </div>
          <div class="mt-4" v-if="this.userAddress">
            <b-card v-for="(data, idx) in userAddress" :key="idx">
              <h5>your address</h5>
              <div class="row">
                <div class="col-md-12">
                  <p>{{data.address}}</p>                  
                </div>
              </div>
            </b-card>
          </div>

          <b-button class="mt-5" variant="primary" @click="post">Submit</b-button>
        </b-col>
        <b-col md="6">
          <h4 class="mb-4">ORDER SUMMARY</h4>
          <div id="order-summary">
          <div id="order-list">
            <b-row>
              <b-col sm="6">
                <p>product</p>
                <div v-if="orders" v-for="(data, idx) in orders" :key="idx">
                  <p>{{data.product}}</p>
                </div>
                <div class="mt-3">
                  <h5>Grand Total :  </h5>
                </div>
              </b-col>
              <b-col sm="6">
                <p>subtotal</p>
                <div v-if="orders" v-for="(data, idx) in orders" :key="idx">
                <p> Rp.{{data.subTotal}} </p>
                </div>
                <div class="mt-3">
                  <h5> Rp. {{grandTotal}} </h5>
                </div>
              </b-col>
            </b-row>
          </div>
          </div>
        </b-col>
      </b-row>
     </b-container>
  </div>
        </b-overlay>

</template>


<script>
import headerWeb from '@/components/headerWeb'
import axios from 'axios'
import regex from '../utils/regex'
import toInteger from '../utils/toInteger'
import grandTotal from '../utils/grandTotal'
import DataService from '../urlApp/user'
import Swal from 'sweetalert2'


export default {
  name: 'checkout',
  components: {
    headerWeb
  },
  data () {
    return {
      orders: null,
      provinsi: null,
      address: null,
      kota: null,
      kecamatan: null,
      prov_id: null,
      kota_id: null,
      kec_id: null,
      test: null,
      kodePos: null,
      userAddress:'',
      show:true,
      opacity:'1'
    }
  },
  created () {
    DataService.get('user/address/'+this.jwtDecode)
    .then((res) => {
      this.userAddress = res.data.data
      console.log(this.userAddress)
      this.show = false
    })
    .catch((err) => {
      console.log(err)
    })

    axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
      .then((res) => {
        this.provinsi = res.data.provinsi
      })
      .catch((err) => {
        console.log(err)
      })

    let localData = JSON.parse(localStorage.getItem('order'))

    for (let i = 0; i < localData.length; i++) {
      let subTotalRegex = regex(localData[i].subTotal)
      localData[i].subTotal = subTotalRegex
    }

    this.orders = localData
  },
   watch: {
    prov_id (value) {
      this.getKota(value)
    },
    kota_id (value) {
      this.getKecamatan(value)
    }
  },
  methods: {
   getKota(value){
      return axios.get('https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=' + value.id)
      .then((res) => this.kota = res.data.kota_kabupaten )
    },
    getKecamatan (value) {
      return axios.get('https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=' + value.id)
      .then((res) => this.kecamatan = res.data.kecamatan)
    },
    post () {
      try {
        const storageItem = JSON.parse(localStorage.getItem('order'))
      
        let orderItem = []
        let qtyOrder = []
        
        for(let i = 0; i < storageItem.length; i++){
          orderItem.push(storageItem[i].id)
          qtyOrder.push(storageItem[i].quantity)
        }

        const orderData = {
          user:this.jwtDecode,
          item:orderItem,
          total:this.grandTotal
        }

        if(this.userAddress.length === 0){
          const addressData = {
            address: this.address,
            provinsi: this.prov_id.nama,
            kota: this.kota_id.nama,
            kecamatan: this.kec_id.nama,
            kodePos: this.kodePos
          }
          
          DataService.post('user/address', addressData)
          .then((res) => {
            console.log('success')
          })
          .catch((err) => {
            console.log(err)
          })
        }

        DataService.post('user/purchased', orderData)
        .then((res) => {
          const response = res.data

          if(response.status === '200') {
            Swal.fire({
              title:'success',
              text:'your order has been checkout !',
              icon:'success',
              showConfirmButton: false,
              timer: 1500
            })
            .then(() => {
              this.$router.push('/purchased-confirmed')
            })
          } else {
            Swal.fire({
              title:'error',
              text:'something went wrong',
              icon:'error',
              showConfirmButton: false,
              timer: 1500
            })            
          }

        })
        .catch((err) => {
          console.log(err)
        })

      } catch (err) {
        console.log(err)

      }
    }

  },
  computed: {
    grandTotal () {
      let orderData = this.orders
      let arrSubtotal = []

      for (let i = 0; i < orderData.length; i++) {
        let subTotalInt = toInteger(orderData[i].subTotal)
        arrSubtotal.push(subTotalInt)
      }

      let sumTotal = regex(grandTotal(arrSubtotal, 'sum'))
      return sumTotal
    },
    jwtDecode () {
      const jwt = this.$cookies.get('jwt')
      const decodedJwt = JSON.parse(atob(jwt.split('.')[1]))

      return decodedJwt.id

    }
 }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

#router {
  font-size: 20px;
  margin-bottom: 0;
  color: white;
}

#brand {
  font-family: 'Krona One', sans-serif;

}

#order-summary {
  border: 1px solid black;
}

#order-list {
  border-top: 1px solid black;
}

#content {
  height: 100vh;
}

</style>
