<template>
  <Banner />
  <div class="main-container">
    <h1>Montagem do hambúrguer</h1>
    <BurgerForm />
  </div>
</template>

<script>
  import Banner from "../components/Banner.vue"
  import BurgerForm from "../components/BurgerForm.vue"

  export default{
    components: {
      Banner,
      BurgerForm
    }
  }
</script>
