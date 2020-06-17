import vuex from 'vuex'
import vue from 'vue'

vue.use(vuex)

const store = new vuex.Store({
  state: {
    username: null,
    login:false,
    register:false,
    type:null
  },
  mutations: {
    /*获取名字和点击退出的时候  就可以改变这个*/
    changeUsername(state, payload) {
      state.username=payload
    },
    changeLogin(state,payload){
      /*login和register只能有一个显示  所以只能一个true*/
      state.login=payload
    },
    changeRegister(state,payload){
      state.register=payload
    },
    saveType(state,payload){
      state.type=payload
    }
  },
  actions: {
    /*这里来操作mutations*/
    changeUsername(context, product) {
      return new Promise((resolve,reject)=>{
        context.commit('changeUsername', product)
        resolve('ok')
      })
    },
    changeLogin(context,product){
      return new Promise((resolve,reject)=>{
        context.commit("changeLogin" , product)
        resolve('ok')
      })

    },
    changeRegister(context,product){
      return new Promise((resolve,reject)=>{
        context.commit("changeRegister" , product)
        resolve('ok')
      })
    },
    saveType(context,product){
      return new Promise((resolve, reject)=>{
        context.commit('saveType',product)
      })
    }
  },
  getters: {
    getUsername(state) {
      return state.username
    },
    getLogin(state) {
      return state.login
    },
    getRegist(state){
      return state.register
    },
    getType(state){
      return state.type
    }
  }

})

export default store