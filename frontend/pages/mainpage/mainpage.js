const app = getApp()
const config = require('../../config.js');

Page({
  data: {
    rootPath: config.host,
    activities: [],
  },

  onLoad() {
    let this_ = this
    app.getUserInfo().then(function (res) {
      this_.setData({ userInfo: res })
    })
  },

  onShow() {
    let this_ = this
    wx.request({
      url: config.host + 'activity/all',
      method: "POST",
      data: {
        id: true,
        name: true,
        intro: true,
        pictures: true,
      },
      success: res => {
        this_.setData({
            activities: res.data
        })
      },
      fail: e => {
        console.log(e)
      }
    })
  },

  inputTyping() {
    var obj = JSON.stringify(this.data.history);
    wx.navigateTo({url:"./searchpage/search?history=" + obj})
  },

  toActivityDetail(e) {
    wx.navigateTo({
      url: '/pages/activity/detail/index?id=' + e.currentTarget.dataset.id,
    })
  }
})
