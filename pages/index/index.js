//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '斧子家教',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    console.log('onLoad')
    if (app.globalData.userInfo) {
      console.log('已经有用户数据')
      console.log(app.globalData.userInfo)

      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log('可以使用canIUse')
      app.userInfoReadyCallback = res => {
        console.log('userInfoReadyCallback')
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log('只能使用getUserInfo')
      wx.getUserInfo({
        success: res => {
          console.log('getUserInfo')
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail: res => {
          console.log('fail')
          console.log(res)
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log('getUserInfo')
    console.log(e.detail.errMsg)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }

  }
})