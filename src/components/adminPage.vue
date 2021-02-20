<template>
	<div id="adminPage">
		<b-navbar class="mb-5" toggleable="lg" type="dark" variant="dark">
			<b-button v-b-toggle.sidebar-variant class="mr-3">
				<b-icon icon="chevron-double-right" aria-hidden="true"></b-icon>
			</b-button>
    <b-sidebar id="sidebar-variant" title="Dashboard" bg-variant="dark" text-variant="light" shadow>
    	<div class="mt-4">
    	  <div id="menu" class="d-flex align-items-start py-3">
    	  	<div class="pl-3">
    	  		<a href="" style="color: white;">
    	  			<h4>Tambah Produk</h4>
    	  		</a>
    	  	</div>
        </div>
        <div id="menu" class="d-flex align-items-start py-3">
    	  	<div class="pl-3">
    	  		<a href="" style="color: white;">
    	  			<h4>Produk Toko</h4>
    	  		</a>
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
     <b-container id="container">
     	<h3 class="d-flex align-items-start">Tambah Produk</h3>
     	<b-card title="Informasi Produk">
     		<b-row class="my-3">
     			<b-col sm="2" class="d-flex align-items-start">
            <label for="input-nama">Nama Produk:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input id="input-nama" placeholder="Nama Produk"></b-form-input>
          </b-col>
       </b-row>
       	<b-row class="my-3">
     			<b-col sm="2" class="d-flex align-items-start">
            <label for="input-harga">Harga:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input id="input-harga" placeholder="Harga"></b-form-input>
          </b-col>
       </b-row>
       	<b-row class="my-3">
     			<b-col sm="2" class="d-flex align-items-start">
            <label for="input-kategori">Kategori:</label>
          </b-col>
          <b-col sm="10">
            <b-form-input id="input-kategori" placeholder="kategori"></b-form-input>
          </b-col>
       </b-row>
      </b-card>
     </b-container>
	</div>
</template>

<script>
	
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');

#container {
	margin-top: 10s0px;
}

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