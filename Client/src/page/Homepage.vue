<template>
  <div>
    <div class="nav">
    <Header></Header>
    </div>
    <div class="navtab">
       <Navtab></Navtab>
    </div>
    <div class="content">
      <Mycontent></Mycontent>
    </div>
    <div class="forumnote">
      <Forumnote></Forumnote>
    </div>
  </div>

</template>

<script>
import Header from '@/components/homePage/Header'
import Mycontent from '@/components/homePage/Mycontent'
import Navtab from '@/components/homePage/Navtab'
import Forumnote from '@/components/homePage/Forumnote'
// import axios from 'axios'
export default {
  name: 'Homepage',
  components: {Forumnote, Header, Mycontent, Navtab},
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
