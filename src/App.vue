<template>
  <div id="app">
    <router-view/>
    <notifications group="cart" position="top center" width="500"/>
    <notifications group="auth" position="top center" width="500"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
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
</style>
