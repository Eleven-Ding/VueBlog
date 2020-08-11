<template>
  <div class="about">
    <div class="about-content">
      <h1 class="aboutMe">About</h1>
      <hr class="parting-line">

      <div class="content">

        <code v-html="content" class="markdown-body">

        </code>

        <div class="item">
          <span>本站发展史</span>
          <div class="history">
            <el-timeline>
              <el-timeline-item
                      :color="getColor()"
                      :timestamp="item.time"
                      v-for="(item,index) in history"
                      :key="index" size="large">
                {{item.content}}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  export default {
    name: "About",
    data() {
      return {
        history: Object.freeze([]),
        content: ''
      }
    },

    methods: {
      getColor() {
        return '#' + (Math.random() * 0xffffff << 0).toString(16)
      }
    },
    mounted() {

      this.request('/about/getAboutMe').then(res => {
        this.content = res.data
      })

      this.request('/about/getHistory').then(res => {
        this.history = res.data
      })

    }
  }
</script>

<style scoped>
  .aboutMe {
    margin-bottom: 30px;
    color: #7a7a7a;
    text-align: center;
  }

  .parting-line {
    height: 4px;
    border: 0;
    background-color: #ddd;
    margin: 20px 0;
    background-image: repeating-linear-gradient(-45deg, #fff, #fff 4px, transparent 0, transparent 8px);
  }

  .about {
    padding-top: 20px;

    width: 55%;
    padding-bottom: 50px;

    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    border-radius: 10px;
  }

  .about-content {
    margin: 0 auto;
    width: 90%;
  }

  .item {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-top: 40px;
  }

  .item span {
    font-size: 24px;
    font-weight: 600;
    color: #696969;
  }

  .item p {
    margin-bottom: -10px;
    color: #757575;
  }


  .history {
    margin-top: 30px;
  }

  @media not screen and (min-width: 65em) {
    .about {
      width: 80%;

    }
  }

  @media not screen and (min-width: 45em) {
    .about {
      width: 100%;
      margin-top: 20%;
    }
  }

  @media not screen and (min-width: 40em) {
    .about {
      width: 100%;
      margin-top: 40%;
    }
  }

</style>