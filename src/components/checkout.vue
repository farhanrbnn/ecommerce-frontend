<template>
  <div class="checkout">
    <b-navbar class="mb-5" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/" id="brand">GamersCrib</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item><router-link to="/cart"><b-img v-bind:src="require('@/assets/cart-logo.png')" fluid alt="Fluid image"></b-img></router-link></b-nav-item>
        <b-nav-item><router-link to="/login"><p id="router">Login</p></router-link></b-nav-item>
      </b-navbar-nav>
      </b-collapse>
     </b-navbar>
     <b-container>
      <b-row>
        <b-col md="6">
          <h4>BILLING DETAILS</h4>
          <div class=" mt-4">
            <b-form inline>
              <label class="sr-only" for="first-name">First Name</label>
             <b-form-input
              id="first-name"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="First Name"
              ></b-form-input>
              <label class="sr-only" for="last-name">Last Name</label>
             <b-form-input
              id="last-name"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Last Name"
              ></b-form-input>
            </b-form>
            <b-form-textarea
              class="mt-3"
              id="textarea"
              placeholder="Address"
              max-rows="3"
            ></b-form-textarea>
            <b-form-select class="mt-3" v-model="prov_id">
            <b-form-select-option v-for="(prov, idx) in provinsi" :key="idx" :value="prov.id">{{ prov.nama }}</b-form-select-option>
        </b-form-select>

        <b-form-select class="mt-3" v-model="kota_id">
            <b-form-select-option v-for="(kot, idx) in kota" :key="idx" :value="kot.id">{{ kot.nama }}</b-form-select-option>
        </b-form-select>

        <b-form-select class="mt-3" v-model="kec_id">
            <b-form-select-option v-for="(kec, idx) in kecamatan" :key="idx" :value="kec.id">{{ kec.nama }}</b-form-select-option>
        </b-form-select>

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
import axios from 'axios'
import regex from '../utils/regex'
import toInteger from '../utils/toInteger'
import grandTotal from '../utils/grandTotal'

export default {
  name: 'checkout',
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
