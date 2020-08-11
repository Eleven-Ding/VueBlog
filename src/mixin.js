export const IsPcMixin = {
  methods: {
    IsPC() {
      let userAgentInfo = navigator.userAgent;
      let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
      let flag = true;
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    randomColor() {
      return '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
    }
  }
}
import {mapState} from 'vuex'

export const CloudeMixin = {
  data() {
    return {
      list: [],
      //标签
      clouds: [],
    }
  },
  methods: {
    LoadCloud() {
      for (let i = 0; i < this.ArticleList.length; i++) {
        let obj = {}
        obj.type = this.ArticleList[i].type
        obj.count = 1
        let index = this.clouds.findIndex(item => item.type === obj.type)
        if (index === -1) {
          this.clouds.push(obj)
        } else {
          this.clouds[index].count = this.clouds[index].count + 1
        }
      }


    },
    randomColor() {
      return '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
    },
    LoadList() {
      let ColorList = {}
      for (let i = 0; i < this.clouds.length; i++) {

        let type = this.clouds[i].type
        ColorList[type]=this.randomColor()
      }
      this.$store.dispatch('changeColorList', ColorList)
      //遍历data
      this.list = this.ArticleList.concat()
      this.list = this.list.sort(function (a, b) {
        return b.viewcount - a.viewcount
      }).splice(0, 4)
    },
    changeArticle(index) {
      this.$bus.$emit('changeArticle2', this.clouds[index].type)
      this.$router.push('/home')
    },
  },
  computed: mapState({
    ArticleList: state => state.ArticleList,

  }),
}