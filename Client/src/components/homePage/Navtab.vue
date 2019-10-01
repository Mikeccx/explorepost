<template>
  <div>
  <div class="navtab-bg">
<!--    天气预报调用iframe-->
    <div class="weather">
      <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=ty&skin=pitaya&tdsourcetag=s_pcqq_aiomsg" frameborder="0" width="200" height="75" allowtransparency="true"></iframe>
    </div>
<!--    天气预报-->
   <div class="navtab-center">
     <div class="navtab-center-left">
         <div class="navtab-center-left-title">{{this.$store.state.subject}}</div>
     </div>
     <div class="navtab-center-right">
       <div class="navtab-center-right-in">
       <p>主题</p>
       <p>{{this.$store.state.post.length}}</p>
       </div>
     </div>
   </div>
<!--    系统公告-->
    <div class="announce-bg">
    <div class = "shake">
      公告：{{announce}}
    </div>
    </div>
  </div>
  <div class="nav-block">
    <div class="nav-block-area-1">
      <div>旅行天下</div>
      <a href="#" v-for="item in travelsky" :key="item.value" @click="Changesubject(item.name)">{{item.name}}</a>
    </div>
    <div class="nav-block-area-1">
      <div>户外运动</div>
      <a href="#" v-for="item in outdoor" :key="item.value" @click="Changesubject(item.name)">{{item.name}}</a>
    </div>
    <div class="nav-block-area-3">
      <div>地方板块</div>
      <div>
        <a href="#" v-for="item in area" :key="item.value" @click="Changesubject(item.name)">{{item.name}}</a>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'Navtab',
  data () {
    return {
      travelsky: [{name: '户外大厅'}, {name: '商业活动|线路'}, {name: 'AA相约'}, {name: '游记攻略'}, {name: '我秀我户外'},
        {name: '走出国门'}, {name: '户外资料'}, {name: '装备天下'}, {name: '户外摄影'}],
      outdoor: [{name: '山伍成群'}, {name: '攀岩|探洞|绳降'}, {name: '骑行天下'}, {name: '钓鱼|水上'}, {name: '滑雪'},
        {name: '自驾|摩托车'}, {name: '跑步|越野跑'}, {name: '公益爱心'}, {name: '冬泳'}],
      area: [{name: '安徽'}, {name: '北京'}, {name: '重庆'}, {name: '福建'}, {name: '甘肃'},
        {name: '广东'}, {name: '广西'}, {name: '贵州'}, {name: '海南'}, {name: '河北'}, {name: '河南'}, {name: '湖北'},
        {name: '湖南'}, {name: '黑龙江'}, {name: '吉林'}, {name: '江苏'}, {name: '江西'}, {name: '辽宁'}, {name: '内蒙古'},
        {name: '宁夏'}, {name: '宁夏'}, {name: '青海'}, {name: '山东'}, {name: '山西'},
        {name: '陕西'}, {name: '上海'}, {name: '四川'}, {name: '天津'}, {name: '新疆'}, {name: '云南'}, {name: '浙江'}],
      content: '',
      day: new Date()
    }
  },
  computed: {
    ...mapState,
    announce: function () {
      if (!this.content) { return '暂无公告' } else return this.content
    }
  },
  methods: {
    ...mapMutations(['Changesubject']),
    getannounce: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/innermessage/announce', {
      }).then((res) => {
        that.content = res.data[0].content
      })
    }
  },
  mounted () {
    this.getannounce()
  }
}
</script>

<style scoped>
  .weather{
    height: 100%;
    width: 270px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .navtab-bg{
    width: 980px;
    height: 88px;
    background-color: #fbfbfb;
    display: flex;
    margin: auto;
    justify-content: flex-start;
    border-bottom: 1px solid #ebebeb
  }
  .navtab-center{
    width: 980px;
    /*margin: auto;*/
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
  .navtab-center-left{
    display: flex;
    height: 62px;
    margin: 0;
    padding:0;
    align-items: center;
  }
  .navtab-center-left-title{
    width: 180px;
    color: #585858;
    font-size: 18px;
  }
  .navtab-center-right{
    display: flex;
    flex-direction: column;
    height: 62px;
    border-right: 1px solid #d8d8d8;
  }
  .navtab-center-right-in{
       margin-right: 8px;
  }
  .navtab-center-right p{
      height: 31px;
      padding: 0;
      margin:0 auto;
      text-align:center;
      display: flex;
      align-items: center;
      font-size: 12px;
      justify-content: flex-end;
  }
  .nav-block{
    display: flex;
    margin: auto;
    margin-top:12px;
    flex-direction: column;
    width: 980px;
    height: 141px;
    border: #d8d8d8 solid 1px;
    background-color: #fff;
    box-shadow: 0 2px 5px #CCCCCC
  }
  .nav-block-area-1{
    display: flex;
    justify-content: flex-start;
    height: 40px;
    width: 980px;
    border-bottom: #d8d8d8 solid 1px;
  }
  .nav-block-area-1 > div:first-child{
    font-size: 12px;
    width: 94px;
    height: 40px;
    display: flex;
    justify-content: center;
    background-color:#409EFF;
    color: #fff;
    align-items: center;
  }
  .nav-block-area-1 a{
    margin: 0px 20px 5px 0px;
    justify-content: flex-start;
    font-size: 12px;
    margin: auto;
    color: black;
  }
  .nav-block-area-1 a:hover{
    color:#409EFF ;
  }
  .nav-block-area-3{
    display: flex;
    height: 61px;
  }
  .nav-block-area-3 > div:first-child{
    font-size: 12px;
    width: 94px;
    height: 61px;
    display: flex;
    justify-content: center;
    background-color:#409EFF;
    color: #fff;
    align-items: center;
  }
  .nav-block-area-3 > div +div{
    height: 61px;
    width: 842px;
    line-height: 27.5px;
    margin: 0 14px;
  }
  .nav-block-area-3 a{
    width: 42px;
    /*height: 30px;*/
    font-size: 12px;
    color: black;
    margin-left: 5px;
  }
  .nav-block-area-3 a:hover{
    color:#409EFF ;
  }
  /*闪耀字体*/
  @-webkit-keyframes shake{
    0%{
      opacity: 1;
      color: red;
    }
    50%{
      opacity: 0.5;
      color: blue;
    }
    100%{
      opacity: 1;
      color: #7ac23c;
    }
  }
  @keyframes shake{
     0%{
       opacity: 1;
       color: #7ac23c;
     }
     50%{
       opacity: 0.5;
       color: blue;
     }
     100%{
       opacity: 1;
       color: #795da3;
     }
   }
  .shake{
    -webkit-animation: shake 2s infinite;
    animation: shake 2s infinite;
    padding: 13px 15px;
    font-size: 12px;
  }
  /*闪耀字体*/
  .announce-bg{
    width: 17%;
    height: 88px;
    overflow: auto;
  }
</style>
