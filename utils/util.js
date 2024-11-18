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

var key = CryptoJS.enc.Utf8.parse("1EXp6MhoWUNxPOIc"); //十六位十六进制数作为秘钥
var iv = CryptoJS.enc.Utf8.parse('0000000000000000'); //十六位十六进制数作为秘钥偏移量

//解密
function decrypt(word) {
  //URL解密
  console.log('解密前:\n' + word)
  let urlResult = decodeURIComponent(word)
  console.log('urlResult:\n' + urlResult)
  //去掉回车换行，否则解密会有问题
  urlResult = urlResult.replace(/[\r\n]/g, "");
  console.log('urlResult:\n' + urlResult)
  //AES解密
  let decrypted = CryptoJS.AES.decrypt(urlResult, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  //byte转文字
  let data = decrypted.toString(CryptoJS.enc.Utf8)
  console.log('解密后:\n' + data)
  return data
}

//加密
function encrypt(word) {
  //文字转byte
  let srcs = CryptoJS.enc.Utf8.parse(word);
  //console.log('加密前:\n' + srcs)
  //AES加密
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  //console.log('加密后:\n' + encrypted)
  //Base64加密
  let data = encrypted;
  //TODO
  data = encodeURIComponent(data)
  //console.log('密文:\n' + data)

  return data
}

function requestJson(path, json, callBack) {
  //添加nonced参数 uuid
  json.nonce = uuid()
  //加密请求参数
  var data = encrypt(JSON.stringify(json))
  //封装请求 'a=Android&b=**********'
  var reqParams = 'a=Android&b=' + data;
  request(path, reqParams, callBack)
}
//https://manager-cs.xilaikd.com/zhihuiyong/api/
//https://smallapp-cs.xilaikd.com/zhihuiyong/api/
//url: 'http://api.wxbus.com.cn/' + path + '/',

function request(path, param, successCall) {
  console.log('param:'+param)
  wx.request({
    url: 'https://smallapp-cs.xilaikd.com/zhihuiyong/' + path + '/',
    data: param,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      if (successCall != undefined){
        console.log('解析结果:')
        console.log(res.data.result)
        successCall(res.data)
      }else{
        //TODO 解析结果
        console.log('解析结果:')
        console.log(res.data.result)
      }
    },
    fail: function(res) {
      wx.showToast({
        title: '请求失败',
      })
    },
    complete: function(res) {
      //console.log('打印结果')
      //console.log(res)
    },
  })
}
module.exports = {
  formatTime: formatTime,
  uuid: uuid,
  decrypt: decrypt,
  encrypt: encrypt,
  requestJson: requestJson,
  request: request
}