import util from '../../utils/util.js'

Page({
  data: {

    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    Height: "" ,
        //这是swiper要动态设置的高度属性
    item: {
      uuid:'000000000000',
      headUrl: '',
      imgUrls: [
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1879924690,621254173&fm=200&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2719902130,937989795&fm=200&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2327749601,699247910&fm=26&gp=0.jpg'
      ],
      title: '3A讲师',
      name: '陶老师',
      no: 'JR305',
      school: '清华大学',
      sex: 1,
      price: 70,
      types: "数学",
      word: "与学生为朋友才能更好的帮助其提高成绩",
      descptions: '有效果 善于沟通 经验丰富',

      state: 0,
      native_place: '句容',
      teaching_age: '5',
      work_state: '退休',

      exp: [{
        date: '2008-03 - 2013-12',
        desc: '在南京XXX高中教数学，2011年期间被评为XXXX'
      }, {
        date: '2014-01 - 至今',
        desc: '在句容XXX高中教数学，2017年被评为高级教师'
      }],
      self_descptions: '1.多年一线教学，有丰富的经验\n2.可以针对学生的特点制定和调整教学的内容\n3.采取模块式教学方法，教学内容清晰，学生更容易接受和掌握\n4.平时免费针对学生遇到的问题进行电话答疑，及时填补学生的知识漏洞\n5.学生人数控制在4人左右，也可一对一辅导'
    },

  },
  onSwiperItemClick: function(e) {
    let encrypt = util.encrypt(e.target.dataset.item)
    wx.navigateTo({
      url: '/pages/detial/detial?encrypt=' + encrypt,
    })
  },
  onTeacherItemClick: function(e) {
    console.log(e.currentTarget.dataset.item)

  },
  imgHeight: function(e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width; //图片宽度
    var swiperH = winWid * imgh / imgw + "px" //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度  ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Height: "180px" //设置高度
    })
  },

  bindPickerChange1: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange3: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }, onShareAppMessage:function(e){
  console.log(e)
    return {
      title: this.data.item.name,
      path: '/pages/main/main?extra=' + this.data.item.uuid+"&action=teacher"
    }
  }
})