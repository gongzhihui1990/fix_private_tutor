import util from '../../utils/util.js'

Page({
  data: {

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
      title: '4A讲师',
      name: ' 翔老师',
      no: 'JR211',
      school: '南京大学',
      sex: 0,
      price: 100,
      types: "英语",
      descptions: '善于沟通 漂亮',
    }, ]

  }, onTeacherItemClick: function (e) {
    console.log(e.currentTarget.dataset.item)
    // teacher
    wx.navigateTo({
      url: '/pages/teacher/teacher',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  } 


})