const app = getApp()
const CONFIG = require('../../config.js')

Page({
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "userInfo": app.globalData.userInfo
    })
    console.log(app.globalData.userInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
