const app = getApp()
const config = require('../../config.js')

Page({
  data: {},

  onLoad: function (options) {
    this.setData({ userInfo: app.globalData.userInfo })
  },

  getUserInfo (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({ userInfo: e.detail.userInfo })
      wx.setStorageSync('userInfo', e.detail.userInfo)
      app.getUserOpenId()
    }
  },

  onGotUserInfo(e) {
    if (e.detail.userInfo) {
      let this_ = this
    } else {
      console.log('refuse')
    }
  },

  about: function () {
      wx.showModal({
          title: '关于',
          content: '清友活动圈版本0.0.1\n开发人员：\n杨松霖\n那森\n邱圆辉\n金叶\n郭勇毅',
      })
  },

  logout: function () {
      wx.showModal({
          title: '提示',
          content: '是否确定注销当前帐号？',
          success: function () {

          }
      })
  }
})
