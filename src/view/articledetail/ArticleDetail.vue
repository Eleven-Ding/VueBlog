<template>
  <div class="detail">
    <div class="detail-content">
      <div class="title">{{data.title}}</div>
      <div class="time">
        <span class="date"><i class="el-icon-watch"></i>{{data.date|Time}} </span>
        <span class="view"><i class="el-icon-view"></i>{{data.viewcount}}次围观</span>
      </div>
      <img :src="data.url" alt="">

      <div class="summery">{{data.summery}}
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
      </div>

      <div class="tip">{{data.tip}}
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
      </div>

      <!--下面就是代码了-->
      <div class="container" style="
      width: 80%;overflow-x: scroll" v-highlight>
              <pre>
        <code v-text="data.content">

        </code>
      </pre>
      </div>
      <div class="tag" style="color: #2c789e;text-align: left;width: 80%;padding: 20px 0;font-size: 18px;">
        <i class="el-icon-collection-tag"></i>
        <span> 类别:{{data.type}} </span>
      </div>
    </div>
    <Pay></Pay>
    <div class="comment" style="padding: 0 20px ;margin: 20px auto">
      <div class="info" style="display: flex;justify-content: space-between">
        <span style="color: #7a7a7a">Comment | {{commentList.length}}条评论</span>
        <span style="color: #409EFF;cursor: pointer" class="login"
              @click="login" v-if="!$store.getters.getUsername">登录</span>
        <span v-else style="color: #409EFF">
         <el-dropdown>
      <span class="el-dropdown-link" style="color: #409EFF">
        {{$store.getters.getUsername}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus" @click.native="loginout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
        </span>
      </div>
      <div class="cin" style="display: flex;flex-direction: column;align-items: flex-end">
        <el-input style="margin-bottom: 5px; margin-top: 30px"
                  type="textarea"
                  rows="6"
                  resize="none"
                  placeholder="请输入内容"
                  v-model="comment"
                  maxlength="400"
                  show-word-limit
        ></el-input>
        <el-button type="primary" size="mini" @click.native="subComment">提交评论</el-button>
      </div>


      <div class="commentArea">
        <div style="color: #999999;text-align: center" v-if="!commentList.length">暂时没有评论嗷，快来抢沙发，啾咪！~</div>
        <div v-else class="list" v-for="(item,index) in commentList">
          <img v-if="item.user==='dsy_zqy'" src="../../assets/img/rightbar/avat.jpg" alt="">
          <img v-if="item.user!=='dsy_zqy'" src="../../assets/img/customer.png" alt="">
          <div class="right">
            <div class="username" style="color: #409EFF"><span
                    style="color: #ff854f;border: 1px solid #ff854f;font-size: 14px;"
                    v-if="item.user==='dsy_zqy'">博主</span>{{item.user}} :
            </div>
            <div class="time_wrap" style="display: flex;align-items: center;width: 100%;justify-content: space-between">
              <span class="content" style="color: #343434;margin-top: 4px;font-size: 15px;">{{item.comment}}</span>
              <span class="commenttile" style="color: #999999;font-size: 13px;">{{item.time|Time}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>


<script>
  import Pay from "../../components/pay/Pay";
  import {Loading} from 'element-ui';
  import hljs from 'highlight.js'
  import {request} from "../../network/request";

  export default {
    name: "ArticleDetail",
    data() {
      return {
        pp: "<h1>love</h1>",
        id: 0,
        data: {},
        comment: '',
        commentList: []
      }
    },
    components: {
      Pay
    },
    beforeMount() {
      Loading.service({fullscreen: true});
    },
    mounted() {

      hljs.initHighlighting()
      /*单独刷新这个页面是不行的*/

      /*在这里从接口获取文章信息来展示*/
      this.getPath()
      this.getAll()
    },
    /*监听路由发生变化*/
    watch: {
      '$route': 'getPath'
    },
    methods: {
      subComment() {

        /*检测登录没得*/
        if (!this.$store.getters.getUsername) {
          this.$message({
            message: '还没有登录喔~请先登录.',
            type: 'warning'
          });
        } else if (this.comment === '') {
          this.$message({
            message: '你都没什么想说的吗?',
            type: 'warning'
          });
        } else if (this.comment.includes("'")) {
          this.$message({
            message: '输入内容请不要包含单引号~~请谅解~~',
            type: 'warning'
          });
        } else {
          /*把comment,文章id,username发过去*/
          request({
            url: '/comment/articleComment',
            method: "POST",
            data: {
              id: this.id,
              user: this.$store.getters.getUsername,
              comment: this.comment
            }
          }).then(res => {
            this.getAll().then(res => {
              this.$message({
                message: '感谢评论!',
                type: 'success'
              });
            })
            this.comment = ''

          })
        }
      },
      getAll() {
        return new Promise(((resolve, reject) => {
          request(`/comment/getAll?id=${this.id}`).then(res => {
            this.commentList = res.data
            resolve('233')
          })
        }))
      },
      loginout() {
        this.$store.dispatch('changeUsername', null)
      },
      login() {
        this.$store.dispatch('changeLogin', true)
      },
      getPath() {
        this.id = this.$route.params.id
        request("/getdetail?id=" + this.id + "").then(res => {
          this.data = res.data[0]
          this.data.content = this.data.content.replace(/dsy/g, "'")
          let loadingInstance = Loading.service({fullscreen: true});
          loadingInstance.close();
        })
      }
    },

    filters: {
      Time(time) {
        if (typeof time === "undefined")
          return "00-00-00 00:00:00"
        else
          return time.substring(0, 10) + ' ' + time.substring(11, 19)

      }
    }
  }
</script>

<style scoped>
  .list {
    background-color: rgba(242, 242, 242, 0.71);
    margin-top: 5px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
  }

  .list .right {
    padding-left: 6px;

    width: 100%;
    display: flex;
    flex-direction: column;

  }

  .list img {
    border-radius: 50%;
    width: 55px;
    height: 55px;
  }

  .commentArea {
    margin-top: 20px;
    padding-bottom: 60px;
  }

  .detail-content {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    font-size: 25px;
    font-weight: 600;
    color: #626262;
  }

  .time {
    font-size: 12px;
    color: #999999;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }

  .date {
    margin-right: 20px;
  }

  .detail-content img {
    width: 80%;
    height: 400px;
  }

  .detail {
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    border-radius: 3px;
    width: 55%;
  }

  .summery {
    font-size: 18px;
    color: #999999;
    font-weight: 600;
    align-items: center;
    width: 80%;
    margin-top: 20px;
  }

  .tip {
    width: 80%;
    color: #292929;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: #464646;
  }

  @media not screen and (min-width: 45em) {
    .detail {
      width: 100%;
    }

    .detail-content img {
      height: 200px;
      width: 80%;
    }

    .container {

    }
  }
</style>