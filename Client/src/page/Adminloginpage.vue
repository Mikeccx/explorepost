<template>
  <div class="bg">
   <div>
     <adminlogin></adminlogin>
   </div>
  </div>
</template>

<script>
import adminlogin from '@/components/loginPage/adminlogin'
export default {
  name: 'Adminloginpage',
  components: {adminlogin}
}
</script>

<style scoped>
.bg {
  width: 100%;
  height: 750px;
  background-color: #fff;
  background-image: url(https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=564948738,1437197468&fm=26&gp=0.jpg);
  background-size:cover
}
</style>
