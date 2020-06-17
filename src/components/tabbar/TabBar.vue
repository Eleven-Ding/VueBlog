<template>
  <div class="tab-bar">
    <div class="tab-wrap">
      <div class="left">
        <div class="left-content" @click="goto">
          <span class="left-name">Dshy</span>
          <span class="left-blog">Blog</span>
        </div>
      </div>
      <div class="middle">
        <div class="item" v-for="(item,index) in itemList" :key="index" @click="itemClick(index)">
          <div class="middle-box">
            <span class="iconfont" :class="item.icon"></span>
            <span class="item-text"> {{ item.text}}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="bbb">
          <el-autocomplete class="el-auto"

                           suffix-icon="el-icon-search"
                           size="medium"
                           v-model="state"
                           :fetch-suggestions="querySearchAsync"
                           placeholder="搜索本站"
                           @select="handleSelect"
          ></el-autocomplete>
        </div>

        <div class="right-login" v-if="!$store.getters.getUsername" @click="login">
          <u>登录</u>
        </div>
        <div class="right-login" v-else>
          Welcome!
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link"> {{$store.getters.getUsername}}
              <i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
        <div class="home">
          <!--          <el-col :span="40">-->
          <div class="aaa">
            <el-dropdown trigger="click">
          <span class="el-dropdown-link">
        <span>{{mobileTitle}}</span><span class="el-icon-arrow-down el-icon--right"></span>
      </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                        @click.native="MobileClick(index)"
                        v-for="(item,index) in mobileList"
                        :icon="item.icon">{{item.text}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "TabBar",
    data() {
      return {
        /*这个应该存在session或者vuex中*/
        username: null,
        itemList: [
          {text: '首页', icon: 'icon-home', path: '/home'},
          {text: '归档', icon: 'icon-guidang', path: '/file'},
          {text: '友联', icon: 'icon-lianjie', path: '/friend'},
          {text: '留言板', icon: 'icon-comment', path: '/comment'},
          {text: '关于', icon: 'icon-about', path: '/about'},
        ],
        mobileList: [
          {text: '首页', icon: 'el-icon-plus', path: '/home'},
          {text: '归档', icon: 'el-icon-receiving', path: '/file'},
          {text: '友链', icon: 'el-icon-connection', path: '/friend'},
          {text: '留言板', icon: 'el-icon-chat-line-square', path: '/comment'},
          {text: '关于', icon: 'el-icon-circle-check', path: '/about'}
        ],
        restaurants: [],
        mobileTitle: '首页',
        state: '',
        timeout: null
      }
    },
    methods: {
      loginout() {
        this.$store.dispatch('changeUsername', null)
        /*退出登录后 那个type也重置为空*/
        this.$store.dispatch('saveType', null)
      },
      login() {
        this.$store.dispatch('changeLogin', true)
      },
      goto() {
        this.$router.push('/home')
      },
      itemClick(index) {
        this.$router.push(this.itemList[index].path)
        this.mobileTitle = this.mobileList[index].text

        // console.log(index);
      },
      MobileClick(index) {
        this.mobileTitle = this.mobileList[index].text
        this.$router.push(this.mobileList[index].path)
      },
      loadAll() {
        return [{"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"}]
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
        this.$router.push({
          path:`/home/article/`+item.address+``
          /*在这里根据ID来获取*/
        })
      }
    },
    mounted() {
      request('/getArticles').then(res=>{
        for(let i=0;i<res.data.length;i++){
          let obj={}
          obj.value=res.data[i].title
          obj.address=res.data[i].id
          this.restaurants.push(obj)
        }
      })
    }
  }
</script>

<style scoped>

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .bbb /deep/ .el-input {
    z-index: 19999;
  }


  /*pc样式*/
  .home {
    display: none;
  }

  .tab-bar {
    height: 75px;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: -1px;
    background-color: #fff;
    border-bottom: 1px solid #f1f1f1;
  }

  .tab-wrap {
    height: 100%;
    display: flex;
  }

  .left {
    flex: 1.3;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .left-content {
    display: flex;
    cursor: pointer;
  }

  .left-name {
    font-size: 30px;
    font-weight: 700;
    color: #292929;
  }

  .left-content:hover .left-name {
    color: #4bbeff;
    transition: all .2s linear;
  }

  .left-content:hover .left-blog {
    color: #4bbeff;
    transition: all .2s linear;
  }


  .left-blog {
    font-size: 18px;
    font-weight: bold;
    color: #828282;
    margin-top: -5px;
  }

  .middle {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    flex: 3.5;
    min-width: 500px;
  }

  .middle .item {
    display: flex;
    margin-left: 27px;
    cursor: pointer;
    color: #828282;
    font-weight: 500;
    height: 100%;
    align-items: center;
    position: relative;
  }

  .middle .item:after {
    content: "";
    position: absolute;
    border-bottom: 1.5px solid #4bbeff;
    width: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: -7px;
    transition: all .3s linear;
  }

  .middle .item:hover {
    color: #4bbeff;
  }

  .middle .item:hover:after {
    transition: all .2s linear;
    width: 100%;
  }

  .right {
    display: flex;
    align-items: center;

    flex: 3;
  }

  .right-login {
    color: #4bbeff;
    margin-left: 50px;
    cursor: pointer;
  }

  /*移动端样式*/
  @media not screen and (min-width: 45em) {
    .bbb /deep/ .el-input {
      width: 150px;
    }
    .aaa /deep/ .el-dropdown{
      width: 100px;
      margin-left: -38px;
    }

    .tab-bar {
      z-index: 999;
      height: 50px;
      width: 100%;
      position: fixed;
      background-color: #fff;
      border-bottom: 1px solid #f1f1f1;
    }

    .left-name {
      font-size: 17px;
      font-weight: 700;
      color: #292929;
    }

    .left-blog {
      margin-right: 10px;
      font-size: 12px;
      font-weight: bold;
      color: #828282;
      margin-top: -5px;
    }

    .middle {
      background-color: #828282;
      display: none;
    }

    .right {
      justify-content: space-around;
    }

    .right .right-login {
      display: block;
      width:50px;
      margin: 4px;
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
      display: flex;
      align-items: center;
      margin-left: 20px;
    }

    .el-icon-arrow-down {
      font-size: 12px;
    }

    .demonstration {
      display: block;
      color: #8492a6;
      font-size: 12px;
      margin-bottom: 20px;
    }

    .home {
      display: block;
    }
  }

</style>

<!--都写上面的scoped,没有scoped的就会全局污染或者说是全局都用，直接抽离出去引入-->
<!--<style>-->
<!--  @media not screen and (min-width: 45em) {-->
<!--    .right .el-input {-->
<!--        width: 130px !important;-->
<!--  }-->
<!--  }-->

<!--</style>-->
