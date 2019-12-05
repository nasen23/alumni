const app = getApp()
const config = require('../../config.js')

Page({
  data: {
    held: [],
    attended: [],
  },

  onShow () {
    wx.request({
      url: config.host + 'activity/user',
      method: "GET",
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        console.log(res)
        this.setData({
          held: res.data.held,
          attended: res.data.attended,
        })
      }
    })
  },

  toActivityDetail (e) {
    wx.navigateTo({
      url: '/pages/activity/detail/index?id=' + e.currentTarget.dataset.id,
    })
  },

  toCreateActivity (e) {
    wx.navigateTo({
      url: './create/index'
    })
  }
})
