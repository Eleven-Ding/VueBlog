<template>
  <div class="File">
    <div class="home-content" >

      <el-timeline>
        <el-timeline-item size="large">
          <h1>目前一共有{{this.activities.length}}篇文章</h1>
        </el-timeline-item>
        <el-timeline-item style="cursor: pointer" @click.native="godetail(activity.id)"  @onmouseover.native="change1"
                v-for="(activity, index) in activities"
                :key="index"
                :type="activity.type"
                :color="color"
                size="large"
                :timestamp="activity.date.substring(0,10)+'/'+activity.date.substring(11,19)">
         <span class="title"  style="font-weight: 600;">{{activity.title}}</span>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "File",
    data(){
      return {
        activities:[],
        color:''
      }
    },
    mounted() {
      request('/getArticles').then(res=>{
        // console.log(res);
        this.activities=res.data
      })
    },
    methods:{
      change1(){
        this.color='black'
      },
      godetail(id){
        console.log(2333);
        this.$router.push({
          path:`/home/article/`+id+``
          /*在这里根据ID来获取*/
        })
      }
    }
  }
</script>

<style scoped>
.File{
  padding-top: 50px;
  width: 55%;
  color: #4bbeff;
  /*height: 600px;*/
  box-shadow: 0 0 5px rgba(0,0,0,.1);
  border-radius: 10px;
  transition: all .4s linear;
}
  .title:hover{
    color: #4bbeff;

  }
@media not screen and (min-width: 45em) {
  .File{
    width: 100%;
  }
}
</style>