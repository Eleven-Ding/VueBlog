import axios from 'axios'

export function request(config) {
  //1.创建实例
  const instance = axios.create({
    baseURL: 'http://47.92.39.166:3000'
    // baseURL: 'http://192.168.1.4:3000'
  })

  //2.axios的拦截器
  //这里是拦截请求
  //axios.inter******是全局拦截
  //？？比如说config中的某些信息不符合服务器的要求
  //？？每次请求的时候，界面中一个请求的图标
  //？？比如说某些网络请求必须要一些token的时候 拦截下这个请求 跳转到给token的页面
  instance.interceptors.request.use(config => {
    return config//这里返回出去  不然拦截下来了你不放 后面的就没了
  }, err => {
    return err
  })
  //拦截响应
  instance.interceptors.response.use(config => {
    return config.data///这里返回出去  不然拦截下来了你不放 后面的就没了
  }, err => {
    console.log(err)
    return err
  });

  //3.发送网络请求
  return instance(config)//这里可以直接return  这里相当于就是直接return的一个Promise 所以上面才可以调用then catch
}
