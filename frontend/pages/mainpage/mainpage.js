const app = getApp()
const config = require('../../config.js');

Page({
  data: {
    rootPath: config.host,
    activities: [],
  },

  onShow() {
    let this_ = this

    app.getUserInfo().then(function (res) {
      this_.setData({
        userInfo: app.globalData.userInfo
      })
    })

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

  toSearchPage () {
    wx.navigateTo({
      url: "./searchpage/search"
    })
  },

  toActivityDetail(e) {
    wx.navigateTo({
      url: '/pages/activity/detail/index?id=' + e.currentTarget.dataset.id,
    })
  }
})
