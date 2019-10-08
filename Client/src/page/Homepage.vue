<template>
  <div>
    <div class="nav">
    <Header></Header>
    </div>
    <div class="navtab">
       <Navtab></Navtab>
    </div>
    <div class="forumnote">
      <Forumnote></Forumnote>
    </div>
    <div>
<!--      <giaoui></giaoui>-->
    </div>
  </div>

</template>

<script>
import Header from '@/components/homePage/Header'
import Navtab from '@/components/homePage/Navtab'
import Forumnote from '@/components/homePage/Forumnote'
// import axios from 'axios'
export default {
  name: 'Homepage',
  components: {Forumnote, Header, Navtab},
  computed: {
  },
  data () {
    return {
      p: 'a'
    }
  },
  mounted () {
  }
}
</script>

<style>
  .forumnote{
    margin-top: 12px;
  }
</style>
