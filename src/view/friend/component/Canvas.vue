<template>
  <div>
    <div class="options_warp" style="text-align: left">
      <div>画笔大小:<input type="range" value="1" min="1" max="10" step="0.1" v-model="size">{{size}}px</div>
      <div>画笔颜色:<input type="color"  v-model="color"></div>
    </div>
    <h2 style="color: #ff5777">留下您的签名~~~(pc)</h2>
    <canvas id="canvas" height="350">您的浏览器不支持canvas</canvas>
    <div class="options">
      <button @click="save" :disabled="disabled" :style="{'color':disabled?'gray':'blue'}">保存</button>
      <button @click="clear">重画</button>
    </div>
    <h1>签名墙</h1>

    <div class="canvasImg">
      <div class="canvas-img-item" v-for="item in ImgList" :key="item.id">
        <img v-lazy="item.url" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Canvas",
    data() {
      return {
        canvas: Object.freeze(null),
        ctx: null,
        size:1,
        color:'black',
        ImgList: Object.freeze([]),
        disabled: false
      }
    },
    mounted() {

      this.getCanvasImg()
      this._initCanvas()

    },
    methods: {
      getCanvasImg() {
        this.request("/friend/getCanvasImg").then(res => {
          this.ImgList = res.data.reverse()
        })
      },
      _initCanvas() {
        let _this=this
        let canvas = document.getElementById("canvas")
        if (canvas.getContext) {
          let ctx = canvas.getContext('2d')
          canvas.width = document.getElementsByClassName('router-view')[0].offsetWidth * 0.9
          window.onresize = function () {
            canvas.width = document.getElementsByClassName('router-view')[0].offsetWidth * 0.9
          }
          /*--------*/
          canvas.ontouchstart =  (ev)=> {
            let x = ev.changedTouches[0].pageX - canvas.offsetLeft
            let y = ev.changedTouches[0].pageY - canvas.offsetTop
          }
          canvas.ontouchstart = (e)=>{
            if (canvas.ontouchmove) {
              canvas.ontouchmove = null
            }
            let ev = e || window.event;
            let x = ev.changedTouches[0].pageX - canvas.offsetLeft
            let y = ev.changedTouches[0].pageY - canvas.offsetTop
            ctx.strokeStyle = _this.color;
            ctx.lineWidth = _this.size;
            ctx.beginPath();
            ctx.moveTo(x, y);
            canvas.addEventListener('touchmove', function (e) {
              let ev = e || window.event;
              ev.preventDefault()
              ev.stopPropagation();
              let x = ev.changedTouches[0].pageX - canvas.offsetLeft
              let y = ev.changedTouches[0].pageY - canvas.offsetTop
              ctx.lineTo(x, y);
              ctx.stroke();
            }, {passive: false})
          };
          canvas.ontouchend = function (e) {
            canvas.ontouchmove = null;
          };


          /*--------*/


          //监听鼠标在canvas上的移
          canvas.onmousedown = function (e) {
            if (canvas.onmousemove) {
              canvas.onmousemove = null
            }
            let ev = e || window.event;
            let x = ev.offsetX
            let y = ev.offsetY
            ctx.strokeStyle = _this.color;
            ctx.lineWidth = _this.size;
            ctx.beginPath();
            ctx.moveTo(x, y);
            canvas.onmousemove = function (e) {
              let ev = e || window.event;
              let x = ev.offsetX
              let y = ev.offsetY
              ctx.lineTo(x, y);
              ctx.stroke();
            };
          };
          canvas.onmouseup = function (e) {
            let ev = e || window.event;
            canvas.onmousemove = null;
          };
        }
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
      },
      clear() {
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height)
      },
      save() {
        //检测是否登录
        if (!this.$store.getters.getUsername) {
          this.$message({
            message: '您还没有登录，请先登录。',
            type: 'error'
          });
        } else {
          //给画布上绘制一个姓名和时间
          this.ctx.font = "40px bold 黑体"
          this.ctx.fillStyle = "#ff0010";
          this.ctx.fillText(this.$store.getters.getUsername, 10, 50);
          //转换成base64的方法
          let base64 = this.canvas.toDataURL()
          this.request({
            method: 'post',
            url: '/friend/saveCanvasImg',
            data: {
              base64,
              creator: this.$store.getters.getUsername
            }
          }).then(res => {

            if (res.code === 200) {
              this.ImgList.unshift({url: base64})
              this.clear()
              this.$message({
                message: '保存成功!',
                type: 'success'
              });
            } else if (res.code === 500) {
              this.disabled = true
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  #canvas {
    background-color: white;
    display: block;
    border: 2px dashed #ff5777;
    /*box-shadow: 0 0 2px black;*/
  }

  .canvasImg {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .canvas-img-item {
    margin-left: 6.67%;
    width: 40%;
    margin-top: 10px;

    border: 1px dashed #ff5777;
  }

  .canvas-img-item img {
    height: 100%;
    width: 100%;
  }

  .options {
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 10px 0;
  }

  .options button {
    outline: none;
    border: none;
    color: blue;
    font-size: 15px;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    padding: 5px 15px;
  }

  button:hover {
    color: #ffffff;
    background-color: #00ffa3;
  }

  @media not screen and (min-width: 45em) {
    .canvasImg {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      text-align: center;
      justify-content: center;
    }

    .canvas-img-item {
      margin-left: 0;
      width: 100%;
      margin-top: 10px;
    }
  }
</style>