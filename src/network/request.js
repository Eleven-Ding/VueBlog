export function request(config) {
  //1.创建实例
  //此处省略BaseUrl

  //2.axios的拦截器
  //这里是拦截请求
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
    return err
  });

  //3.发送网络请求
  return instance(config)//这里可以直接return  这里相当于就是直接return的一个Promise 所以上面才可以调用then catch
}
