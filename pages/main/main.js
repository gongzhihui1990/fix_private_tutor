import util from '../../utils/util.js'

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536306437640&di=91151aebf47662b0a3f0e7f170ac3585&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1210713460%2C2414982655%26fm%3D214%26gp%3D0.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    Height: "" ,
        //这是swiper要动态设置的高度属性
    array_1: [{
      mode: 0,
      name: '全部'
    }, {
      mode: 1,
      name: '由高到低'
    }, {
      mode: 2,
      name: '由低到高'
    }],
    array_2: [{
      place_id: 0,
      name: '南京'
    }, {
      place_id: 1,
      name: '句容'
    }, {
      place_id: 2,
      name: '无锡'
    }],
    array_3: [
      ['不限性别', '男', '女'],
      ['不限科目', '语文', '数学', '英语', '物理', '化学', '生物', '地理', '历史', '生物', '其他'],
      ['不限年级', '学前', '小学', '初中', '高中', '成人']
    ],
    index_1: 0,
    index_2: 0,

    index_3: [0, 0, 0],

    TeacherList: [{
      headUrl: '',
      title: '3A讲师',
      name: '陶老师',
      no: 'JR305',
      school: '清华大学',
      sex: 1,
      price: 70,
      types: "数学",
      descptions: '有效果 善于沟通 经验丰富',
    }, {
      headUrl: '',
      title: '3A讲师',
      name: '亚老师',
      no: 'JR392',
      school: '北京大学',
      sex: 0,
      price: 60,
      types: "语文",
      descptions: '有耐心 有针对性',
    }, {
      headUrl: '',
      title: '4A讲师',
      name: ' 翔老师',
      no: 'JR211',
      school: '南京大学',
      sex: 0,
      price: 100,
      types: "英语",
      descptions: '善于沟通 漂亮',
    }, ]
  },
  onLoad: function(options) {
    console.log(options)
    if (options != null && options.action != null) {
      if (options.action == 'teacher') {
         wx.navigateTo({
          url: '/pages/teacher/teacher?extra=' + options.extra,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }

    }
  },
  onSwiperItemClick: function(e) {
    let encrypt = util.encrypt(e.target.dataset.item)
    wx.navigateTo({
      url: '/pages/detial/detial?encrypt=' + encrypt,
    })
  },
  onTeacherItemClick: function(e) {
    console.log(e.currentTarget.dataset.item)
    // teacher
    wx.navigateTo({
      url: '/pages/teacher/teacher',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
  },
})