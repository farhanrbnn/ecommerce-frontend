<template>
  <div class="checkout">
    <headerWeb />
<<<<<<< HEAD
     <b-container>
=======
     <b-container class="mt-5">
>>>>>>> 2f7c7f5b70807bc99bf4474e98ec994be76cac69
      <b-row>
        <b-col md="6">
          <h4>BILLING DETAILS</h4>
          <div class=" mt-4">
            <b-form>    
             <p class="d-flex align-items-left mb-2">Nama Lengkap</p>
             <b-form-input
              id="first-name"
              label="First Name"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Full Name"
              ></b-form-input>
            </b-form>

            <div class="mt-4">
              <p class="d-flex align-items-left mb-2">Address</p>
              <b-form-textarea
                id="textarea"
                placeholder="Address"
                max-rows="3"
              ></b-form-textarea>
            </div>

            <div class="mt-4">
              <p class="d-flex align-items-left mb-2">Provinsi</p>
              <b-form-select v-model="prov_id">
                <b-form-select-option v-for="(prov, idx) in provinsi" :key="idx" :value="prov.id">{{ prov.nama }}</b-form-select-option>
               </b-form-select>
             </div>

            <div class="mt-4">
              <p class="d-flex align-items-left mb-2">Kota</p>
              <b-form-select v-model="kota_id">
                <b-form-select-option v-for="(kot, idx) in kota" :key="idx" :value="kot.id">{{ kot.nama }}</b-form-select-option>
              </b-form-select>
            </div>

            <div class="mt-4">
              <p class="d-flex align-items-left mb-2">Kecamatan</p>
              <b-form-select v-model="kec_id">
                <b-form-select-option v-for="(kec, idx) in kecamatan" :key="idx" :value="kec.id">{{ kec.nama }}</b-form-select-option>
              </b-form-select>
            </div>

            <div class="mt-4">
              <p class="d-flex align-items-left mb-2">Kode Pos</p>
             <b-form-input
              id="kode-pos"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Kode Pos"
              ></b-form-input>
            </div>

             <div class="mt-4">
              <p class="d-flex align-items-left mb-2">Email</p>
             <b-form-input
              id="email"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Email"
              type="email"
              autocomplete="off"
              ></b-form-input>
            </div>

            <b-button class="mt-5" variant="primary">Submit</b-button>
        <!-- <p> {{kecamatan}}</p> -->
          </div>
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
</template>

<script>
import headerWeb from '@/components/headerWeb'
import axios from 'axios'
import regex from '../utils/regex'
import toInteger from '../utils/toInteger'
import grandTotal from '../utils/grandTotal'

export default {
  name: 'checkout',
  components: {
    headerWeb
  },
  data () {
    return {
      orders: null,
      provinsi: null,
      kota: null,
      kecamatan: null,
      prov_id: null,
      kota_id: null,
      kec_id: null
    }
  },
  created () {
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
    }
 }, 
 asyncComputed: {
  kotaRegion: {
    get () {
      return axios.get('https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=' + this.prov_id)
      .then((res) => this.kota = res.data.kota_kabupaten)
    }
  },
  kecamatanRegion: {
    get () {
      return axios.get('https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=' + this.kota_id)
      .then((res) => this.kecamatan = res.data.kecamatan)
    }
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
</style>
