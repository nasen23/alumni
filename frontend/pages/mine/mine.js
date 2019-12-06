const app = getApp()
const config = require('../../config.js')

Page({
  data: {},

  onLoad: function (options) {
    this.setData({ userInfo: app.globalData.userInfo })
  },

  onGotUserInfo(e) {
    if (e.detail.userInfo) {
      let this_ = this
      wx.request({
        url: app.globalData.urlPath + 'user/add',
        data: {
          openid: getApp().globalData.openid,
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
        },
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            // 从数据库获取用户信息
            this_.queryUserInfo();
            console.log("插入小程序登录用户信息成功！");
        }
      })
    } else {
      console.log('refuse')
    }
  },

  queryUserInfo() {
    wx.request({
        url: app.globalData.urlPath + 'user/userInfo',
        data: {
          openid: getApp().globalData.openid
        },
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          getApp().globalData.userInfo = res.data
        }
    })
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
