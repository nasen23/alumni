const app = getApp()
const config = require('../../../config.js')
Page({

  data: {},

  onLoad: function (e) {
    this.setData({ id: e.id })
  },

  onShow () {
    let this_ = this
    wx.request({
      url: config.host + 'activity/get',
      method: "GET",
      data: {
        id: this_.data.id
      },
      success: res => {
        this_.setData({
          id: this_.data.id,
          name: res.data.name,
          site: res.data.site,
          rootPath: config.host,
          intro: res.data.intro,
          phone: res.data.phone,
          pictures: res.data.pictures,
          userInfo: app.globalData.userInfo,
          time: new Date(parseInt(res.data.actStart)).toLocaleString('zh-CN'),
          timeLeft: parseInt((new Date(parseInt(res.data.actStart)) - new Date()) / (1000 * 60 * 60 * 24))
        })
      },
      fail: e => {

      }
    })
  },

  toActivityMessage: function() {
    wx.navigateTo({ url: '/pages/activity-message/index?id=' })
  },

  toActivitySignup: function() {
    wx.navigateTo({ url: '/pages/activity/signup/index?id=' + this.data.id })
  },

  toActivityManage (e) {
    wx.navigateTo({
      url: '../manage/index?id=' + this.data.id
    })
  },

})
