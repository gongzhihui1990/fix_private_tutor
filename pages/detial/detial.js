//index.js
//获取应用实例
import util from '../../utils/util.js'

const app = getApp()
var baseWidth = undefined
var baseHeight = undefined
var oldDistance = 0

Page({

  data: {
    scale: 1,
    scaleWidth: undefined,
    scaleHeight: undefined,

  },
  //事件处理函数

  onLoad: function(options) {
    console.log(options.encrypt)
    console.log(JSON.stringify(options.extra))
    let url = util.decrypt(options.encrypt)
    var that = this
    this.setData({
      imageUrl: url,
    })
  },
  bindloadImage: function(e) {
    console.log('bindloadImage')

    console.log(e)
    baseWidth = e.detail.width
    baseHeight = e.detail.height
    this.setData({
      scaleWidth: baseWidth,
      scaleHeight: baseHeight,
    })
  },
  bindBigger(e) {
    this.doScale(1.1)

  },
  bindSmaller(e) {
    this.doScale(0.9)
  },
  doScale(e) {
    if (!baseWidth || !baseHeight) {
      return
    }
    let newScale = this.data.scale * e;
    this.setData({
      scale: newScale,
      scaleWidth: newScale * baseWidth,
      scaleHeight: newScale * baseHeight,
    })
  }
})