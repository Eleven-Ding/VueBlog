<template>
  <div class="comment">
    <div class="content_wrap">
      <h1 class="liuyan">留言板</h1>
      <hr class="parting-line">
      <h4 style="color: #999999">这里是一个留言板,想说什么就在这里留言,欢迎吐槽（づ￣3￣）づ╭❤～</h4>

      <div class="comment-input">
        <div class="num_wrap">
          <div>Comments | {{commentList.length}}条评论</div>
          <div v-if="!$store.getters.getUsername" style="color: #4bbeff;cursor: pointer"><u @click="login">登录</u></div>
          <div v-else style="color: #409EFF">{{$store.getters.getUsername}}</div>
        </div>
        <el-input
                rows="6"
                type="textarea"
                placeholder="请输入内容"
                v-model="comment"
                maxlength="400" resize="none"
                show-word-limit>
        </el-input>
        <div class="submit" style="margin-top: 20px;text-align: right">
          <el-button type="primary" @click.native="submit">发表留言</el-button>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="list">

        <div class="user_wrap" v-for="(item,index) in commentList" :key="item.id">
          <!--头像-->
          <div class="avat">
            <img  v-if="item.user==='dsy_zqy'" src="http://www.shyding.xyz/MyImg/img/avat.46349574.jpg" alt="">
            <img v-else src="http://www.shyding.xyz/MyImg/img/customer.4551dd9a.png" alt="">
          </div>
          <div class="right">
            <div class="name"><span v-if="item.user==='dsy_zqy'" class="host">博主</span> <span>{{item.user}}</span> </div>
            <div class="user_content">{{item.content}}</div>
            <div class="time_wrap">
              <span class="content_time"><i class="el-icon-date"></i>{{item.time|timeType}}</span>
              <span class="reply" @click="reply(item.user,item.id)"><i class="el-icon-chat-round"></i>回复</span>
            </div>

            <div class="reply_box"
                 style="position: relative;background-color: rgba(247,247,247,0.93);width: 90%;border-radius: 5px;padding: 0 3px">
              <!--左边头像 右边-->
              <div class="reply_wrap" v-for="(item2,index2) in getOwnReply(item.id)" :key="item2.id">
                <div class="avat_reply">
                  <img v-if="item2.user==='dsy_zqy'" src="http://www.shyding.xyz/MyImg/img/avat.46349574.jpg" alt="">
                  <img v-else src="http://www.shyding.xyz/MyImg/img/customer.4551dd9a.png" alt="">
                </div>

                <div class="reply_right" style="width: 80%;">
                  <div class="name"><span v-if="item2.user==='dsy_zqy'" class="host">博主</span>{{item2.user}}</div>
                  <div style="font-size: 13px;">回复<span style="color: #4bbeff;"
                                                        class="reply_name_blue">@{{item2.name}}:</span> {{item2.reply}}
                  </div>
                  <div class="time_wrap2">
                    <span><i class="el-icon-date"></i>{{item2.time|timeType}}</span>
                    <span class="reply"  @click="reply(item2.user,item.id)"><i
                            class="el-icon-chat-round"></i>回复</span>
                  </div>
                </div>
              </div>
              <div class="reply_input" v-show="item.ishow">
                <el-input style="margin-bottom: 5px;"
                          type="text"
                          placeholder="请输入内容"
                          v-model="replyContent"
                          maxlength="40"
                          show-word-limit
                ></el-input>
                <el-button type="primary" size="mini" @click.native="submitReply(item.id)">提交回复</el-button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Comment",
    data() {
      return {
        comment: '',
        commentList: [],
        replication: '',
        AllReply: [],
        replyContent: '',
        replyFor: '',//这个是代表回复某人
      }
    },
    mounted() {
      this.getAllComments()
      this.getAllReply().then(res => {
        // console.log(this.getOwnReply(4));
      })

    },
    methods: {
      submitReply(id) {
        /*检测有没有输入*/
        if (this.replyContent === '') {
          this.$message({
            message: '你就没有什么想说的吗? |•\'-\'•)و✧',
            type: 'warning'
          });
        } else if (!this.$store.getters.getUsername) {
          this.$message({
            message: '还没有登录喔~请先登录.',
            type: 'warning'
          });
        } else if (this.comment.includes("'")) {
          this.$message({
            message: '评论不能带单引号哟,请改为双引号.谢谢理解!',
            type: 'warning'
          });
        } else {
          /*发送网络请求*/
          console.log('发送');
          this.request({
            url: '/comment/reply',
            method: "POST",
            data: {
              user: this.$store.getters.getUsername,
              theme_id: id,
              name: this.replyFor,
              reply: this.replyContent
            }
          }).then(res => {
            this.getAllReply()
            this.$message({
              message: '回复成功!',
              type: 'success'
            });
            this.replyContent = ""
            let index = this.commentList.findIndex(item => item.id === id)
            this.commentList[index].ishow = false
          })
        }


        let index = this.commentList.findIndex(item => item.id === id)
        console.log(id, this.replyFor);
      },
      getOwnReply(id) {
        return this.AllReply.filter(item => item.theme_id === id)
      },
      reply(user, id) {
        let index = this.commentList.findIndex(item => item.id === id)
        this.commentList[index].ishow = !this.commentList[index].ishow
        this.replyFor = user
      },
      getAllReply() {
        return new Promise(((resolve, reject) => {
          this.request('/comment/getReply').then(res => {
            this.AllReply = res.data
            // console.log(res);
            resolve('233')
          })
        }))
      },
      getAllComments() {
        /*获取所有评论表*/
        this.request('/comment/getComment').then(res => {
          /*把数据赋值给list*/
          this.commentList = res.data.reverse()
        })
      },
      login() {
        this.$store.dispatch('changeLogin', true)
      },
      submit() {
        /*校验评论内容*/
        //判空
        if (this.comment === '') {
          this.$message({
            message: '你就没有什么想说的吗? |•\'-\'•)و✧',
            type: 'warning'
          });
        } else if (!this.$store.getters.getUsername) {//验证是否登录
          this.$message({
            message: '还没有登录喔~请先登录.',
            type: 'warning'
          });
        } else if (this.comment.includes("'")) {//判断是否包含引号
          this.$message({
            message: '评论不能带单引号哟,请改为双引号.谢谢理解!',
            type: 'warning'
          });
        } else {//把数据存到数据库
          let user = this.$store.getters.getUsername
          let content = this.comment
          this.request({
            url: '/comment',
            method: "POST",
            data: {
              user,
              content
            }
          }).then(res => {
            if (res.symbol) {
              this.getAllComments()
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.comment = ''
            } else {
              this.$message.error(res.msg);
            }

          })
        }
      }
    },
    filters: {
      timeType(time) {
        return time.substring(0, 10)
      }
    }
  }
</script>

<style scoped>
  .reply_input {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .reply_wrap {
    padding: 8px 0;
    display: flex;
    position: relative;
    justify-content: space-between;

    margin-top: 6px;
  }

  .avat_reply {
    position: relative;
    flex: 1;
    transition: all .4s;
    text-align: left;
  }

  .reply_right {
    overflow: hidden;
    flex: 7;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }


  .host {
    color: #ff6137;
    border: 1px solid #ff6137;
    font-size: 10px;
    padding: 1px 2px;
    margin-right: 2px;
    border-radius: 2px;
    font-weight: 600;
  }

  .user_wrap {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid #eaeaea;
  }

  .avat {
    position: relative;

    flex: 1;

    display: flex;

    align-items: flex-start;

    justify-content: flex-end;
    transition: all .5s;
  }

  .user_wrap img {
    cursor: pointer;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    transition: all .5s;
    position: absolute;
  }

  .right {
    overflow: hidden;
    padding-left: 5px;
    display: flex;
    display: -ms-flexbox;
    flex: 8;
    flex-direction: column;
    align-items: flex-start;
    line-height: 25px;
    position: relative;
  }

  .right .name {
    color: #54d99a;
    font-size: 14px;
  }

  .right .user_content {
    font-size: 13px;
    color: #292929;

  }

  .time_wrap {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #999999;
    width: 90%;

  }

  .time_wrap .reply {
    cursor: pointer;
  }

  .time_wrap2 {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #999999;
    width: 100%;
  }

  .time_wrap2 .reply {
    cursor: pointer;

  }

  .comment {
    padding-top: 20px;
    text-align: center;
    width: 55%;

    padding-bottom: 50px;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    border-radius: 10px;
  }

  .liuyan {
    margin-bottom: 30px;
    color: #7a7a7a;
    padding: 0;
  }

  .content_wrap {
    margin: 0 auto;
    width: 90%;
  }

  .parting-line {
    height: 4px;
    border: 0;
    background-color: #ddd;
    margin: 20px 0;
    background-image: repeating-linear-gradient(-45deg, #fff, #fff 4px, transparent 0, transparent 8px);
  }

  .comment-input {
    margin-top: 40px;
  }

  .num_wrap {
    display: flex;
    justify-content: space-between;
    color: #999999;
    margin-bottom: 20px;
  }


  @-webkit-keyframes rotation {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .avat img:hover {
    transform: rotate(360deg);
    animation: rotation .4s linear;
  }

  .avat_reply img:hover {
    transform: rotate(360deg);
    animation: rotation .4s linear;
  }
  @media not screen and (min-width: 65em) {
    .comment {
      width: 80%;

    }
  }
  @media not screen and (min-width: 45em) {
    .comment {
      width: 100%;
      margin-top: 20%;
    }

    .time_wrap2 .reply {
      cursor: pointer;

    }

    .reply_wrap {
      padding: 8px 0;
      display: flex;
      position: relative;
      justify-content: space-between;
      width: 100%;
      margin-top: 6px;
    }
    .reply_right {
      overflow: hidden;
      flex: 5;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media not screen and (min-width: 40em) {
    .comment {
      width: 100%;
      margin-top: 40%;
    }
  }
</style>