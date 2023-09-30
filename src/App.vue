<template>
  <!-- Comp da navbar -->
  <Navbar :logo="logo" :alt="alt"/>

  <!-- Renderização das views -->
  <router-view/>

  <!-- Comp do footer -->
  <Footer />
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'

  export default{
    // Definindo os componentes importados
    components: {
      Navbar,
      Footer
    },
    data() {
      return {
        logo: "img/logo.png",
        alt: "Logo de hambúrguer"
      }
    }
  }

</script>

<style>
  body{
    font-family: Arial, Helvetica, sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .main-container{
    margin: 50px;
    min-height: 600px;
  }

  h1{
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }
</style>
