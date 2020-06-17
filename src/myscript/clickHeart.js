//   elementUi    el-icon-s-promotion
function heart() {
  let message = '丁时一'

//监听鼠标点击
  document.onclick = e => {
    //获取点击位置
    let x = e.pageX
    let y = e.pageY
    //点击的时候创建结点
    let div = document.createElement('div')
    div.setAttribute('class', 'heartbox')
    div.innerText = message
    //创建小红心
    let i = document.createElement('i')
    i.setAttribute('class', 'el-icon-s-promotion')
    i.style.fontSize = '18px'
    div.appendChild(i)
    //0.2秒后 结点透明
    setTimeout(() => {
      div.style.opacity = 0
      div.style.top = y - 10 + 'px'
      setTimeout(() => {
        //移除结点 防止dom过多
        document.getElementById('app').removeChild(div)
      }, 300)
    }, 200)
    //追加到结点
    document.getElementById('app').appendChild(addStyle(div, x, y))
  }

  function addStyle(e, x, y) {
    let divStyle = {
      position: 'absolute',
      left: x + 'px',
      top: y + 'px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#DA7465',
      transition: 'all .3s linear',
      fontSize: '14px'
    }
    for (let i in divStyle) {
      e.style[i] = divStyle[i]
    }
    return e
  }

}

export default heart
