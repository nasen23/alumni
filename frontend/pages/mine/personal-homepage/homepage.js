const app = getApp()
const config = require('../../../config.js')

Page({

  data: {},

  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      rootPath: config.host
    })
  },

})
