//import CryptoJS from '../utils/crypto-js'
const CryptoJS = require('./crypto-js/index.js')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function uuid() {
  return u4() + u4() + "-" + u4() + "-" + u4() + "-" + u4() + "-" + u4() + u4() + u4()
}

function u4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
 
 function judgetSaveTransfer(obj1,obj2){
   var result = wx.getStorageSync('searchTransferData') || [];
   var index = result.indexOf(obj1);
   if(index == -1){
     result.splice(0,0,obj1);
   }
   var index1 = result.indexOf(obj2);
   if (index1 == -1) {
     result.splice(0, 0, obj2);
   }
   wx.setStorageSync('searchTransferData', result);
 }

function judgetSaveGuideTransfer(obj) {
  console.log("judgetSaveGuideTransfer " + obj.start_url + "," + obj.end_url)
  var result = wx.getStorageSync('searchGuideTransferData') || [];
  for(var item in result){

    console.log("judgetSaveGuideTransfer " + item.start_url + "," + item.end_url)
    if ((result[item].start_url == obj.start_url) && (result[item].end_url == obj.end_url)){
      return;
    }
  }
  result.splice(0,0, obj);
  wx.setStorageSync('searchGuideTransferData', result);
}

module.exports = {
  formatTime: formatTime,
  uuid: uuid,
  judgetSaveTransfer : judgetSaveTransfer,
  judgetSaveGuideTransfer: judgetSaveGuideTransfer
}