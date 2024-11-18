import util from '../utils/util.js'

function getStopInfo(key, callBack) {
  console.log('获取小区信息')
  var reqJson = {}
  reqJson.m = 'stop_info'
  reqJson.k = key
  util.requestJson('api', reqJson, callBack)
}

function getLineSearchInfo(key, callBack) {
  console.log('获取线路信息')
  var reqJson = {}
  reqJson.m = 'line_search_info'
  reqJson.k = key
  util.requestJson('api', reqJson, callBack)
}

function getAllSearch(key, callBack) {
  console.log('获取模糊搜索')
  var reqJson = {}
  reqJson.m = 'all_search'
  reqJson.k = key
  console.log(reqJson)
  util.requestJson('api', reqJson, callBack)
}

function getBusLive(stopSeq, lineCode, callBack) {
  console.log('获取实时线路')
  var reqJson = {}
  reqJson.m = 'bus_live'
  reqJson.stop_seq = stopSeq
  reqJson.line_code = lineCode
  util.requestJson('api/real', reqJson, callBack)
}

function getLocalLine(localtion, callBack) {
  console.log('获取附近线路')
  console.log(localtion)
  var reqJson = {}
  reqJson.m = 'line_nearby'
  reqJson.radius = '500'
  reqJson.longitude_baidu = localtion.longitude
  reqJson.latitude_baidu = localtion.latitude
  console.log(reqJson)
  util.requestJson('api', reqJson, callBack)
}

function getLineStops(lineId, direction, callBack) {
  console.log('获取站点路列表')
  var reqJson = {}
  reqJson.m = 'line_stops'
  reqJson.line_id = lineId
  reqJson.direction = direction
  util.requestJson('api/', reqJson, callBack)
}

function getAdList(key, flag, callBack) {
  console.log('获取线路列表')
  var reqJson = {}
  reqJson.m = 'get_ad_list'
  reqJson.k = key
  reqJson.flag = flag
  util.requestJson('api/', reqJson, callBack)
}

//广告
function queryAdvertising(callBack) {
  var reqJson = {};
  reqJson.m = 'get_ad_list';
  reqJson.flag = 'stop_search';
  reqJson.k = '';
  console.log("queryAdvertising");
  util.requestJson('api/', reqJson, callBack);
}

//附近站台 经度，纬度
function queryAroundStops(longitude, latitude, callBack) {
  var reqJson = {};
  reqJson.m = 'stop_nearby';
  reqJson.radius = '500';
  reqJson.longitude_baidu = longitude;
  reqJson.latitude_baidu = latitude;
  console.log("queryAroundStops");
  util.requestJson('api/', reqJson, callBack);
}

//根据站台名称进行搜索
function queryStopByName(stopName, callBack) {
  var reqJson = {};
  reqJson.m = 'stop_search';
  reqJson.k = stopName;
  console.log("queryStopByName");
  util.requestJson('api/', reqJson, callBack);
}

//saved_lines
function hasSavedLine(line_id) {
  var array = getSavedLines()
  var hasSaved = false
  for (var j = 0, len = array.length; j < len; j++) {
    //line_id相等，已经存在
    if (line_id == array[j].line_id) {
      hasSaved = true
    }
  }
  return hasSaved;
}
/**
 * 通过line_id删除保存的线路
 */
function delSavedLine(line_id) {
  var array = getSavedLines()
  // 根据key删除
  var delID = line_id;
  var del_flag = false;
  for (var index = array.length - 1; index >= 0; index--) {
    if (array[index].line_id === delID || array[index].line_id === "") {
      array.splice(index, 1);
      del_flag = true;
    }
  }
  if (del_flag) {
    wx.setStorage({
      key: 'saved_lines',
      data: array,
    })
    wx.showToast({
      title: '删除成功',
    })
  } else {
    wx.showToast({
      title: '删除失败',
    })
  }

}

function addSavedLine(lineJson) {
  var array = getSavedLines()
  console.log(array)

  if (hasSavedLine(lineJson.line_id)) {
    console.log('已经存在' + lineJson.line_id)
    wx.showToast({
      title: '已收藏',
    })
    return
  }
  array.push(lineJson)
  console.log('新增存线路数据' + JSON.stringify(lineJson))
  wx.setStorage({
    key: 'saved_lines',
    data: array,
  })
  wx.showToast({
    title: '收藏成功',
  })
}

function getSavedLines() {
  console.log('获取本地化收藏线路信息')
  var value = wx.getStorageSync('saved_lines')
  if (value) {
    console.log('已存线路数据')
  } else {
    value = new Array()
    console.log('初始化线路数据')
  }
  console.log(value)
  return value;
}

function setStarLine(lineJson) {
  var valueOld = getStarLine()
  var eq = lineJson == valueOld;
  if (JSON.stringify(lineJson) == JSON.stringify(valueOld)) {
    wx.setStorage({
      key: 'star_line',
      data: null,
    })
  } else {
    wx.setStorage({
      key: 'star_line',
      data: lineJson,
    })
  }

}

function getStarLine() {
  var value = wx.getStorageSync('star_line')
  return value
}


module.exports = {
  //综合模糊搜索，可以搜索出站点、线路
  getAllSearch,
  //根据站点名称搜索该站点下的线路列表
  getStopInfo,
  //根据公交线路名称，获取该线路的简单信息（无子站点信息）
  getLineSearchInfo,
  //根据公交线路号，获取该线路的详细信息（有子站点信息）
  getLineStops,
  //根据站台编号，获取当前线路实时线路信息(当前运行班车位置，距离站点信息，出发时间)
  getBusLive,
  //附近线路搜索
  getLocalLine,
  //线路广告列表?暂时无用
  getAdList,
  //本地化收藏线路信息
  addSavedLine,
  hasSavedLine,
  getSavedLines,
  delSavedLine,
  getStarLine,
  setStarLine,
  queryAdvertising,
  queryAroundStops,
  queryStopByName
}