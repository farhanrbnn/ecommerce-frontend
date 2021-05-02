<template>
  <div id="adminProdukView">
    <b-navbar class="mb-5" toggleable="lg" type="dark" variant="dark">
      <b-button v-b-toggle.sidebar-variant class="mr-3">
        <b-icon icon="chevron-double-right" aria-hidden="true"></b-icon>
      </b-button>
    <b-sidebar id="sidebar-variant" title="Dashboard" bg-variant="dark" text-variant="light" shadow>
      <div class="mt-4">
        <div id="menu" class="d-flex align-items-start py-3">
          <div class="pl-3">
            <router-link to="/admin/home">
              <h4 style="color: white;">Tambah Produk</h4>  
            </router-link>
          </div>
        </div>
        <div id="menu" class="d-flex align-items-start py-3">
          <div class="pl-3">
            <router-link to="/admin/produk">
              <h4 style="color: white;">Produk Toko</h4>
            </router-link>
          </div>
        </div>
      </div>
    </b-sidebar>
      <b-navbar-brand href="/" id="brand">GamersCrib</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item><router-link to="/cart"><b-img v-bind:src="require('@/assets/cart-logo.png')" fluid alt="Fluid image"></b-img></router-link></b-nav-item>
          <b-nav-item><router-link to="/login"><p id="router">Login</p></router-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
     </b-navbar>
     <!-- content -->
     <b-container>
       <h3 class="d-flex align-items-start">Daftar Produk</h3>
       <b-table striped :items="items" :fields="fields"></b-table>
     </b-container>
  </div>
</template>

<script>
import adminService from '../urlApp/admin'
export default {
  name: 'adminProdukView',
  data () {
    return {
      items:[{
        
      }],
      fields:['name', 'category', 'price', 'quantity', 'Actions']
    }
  },
  created () {
    adminService.get('/product/list')
    .then((res) => {
      // const data = res.data.data
      // const htmlBtn = {
      //                 html:'<p>test</p>'
      //               }

      // for (let i = 0; i < data.length)
      // this.items = res.data.data
    })
    .catch((err) => {
      console.log(err)
    })


  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

#menu:hover {
  background-color: #797979;
}

#brand {
  font-family: 'Krona One', sans-serif;

}
#router {
  font-size: 20px;
  margin-bottom: 0;
  color: white;
}
</style>