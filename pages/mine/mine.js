// pages/mine/mine.js
const app = getApp()
const CONFIG = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const _this = this
    this.setData({
      version: CONFIG.version,
      userInfo: "",
      // vipLevel: app.globalData.vipLevel
    })
    // AUTH.checkHasLogined().then(isLogined => {
    //   if (isLogined) {
    //     _this.setData({
    //       userInfo: wx.getStorageSync('userInfo')
    //     })
    //     _this.getUserApiInfo();
    //     _this.getUserAmount();
    //   }
    // })
  },

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
    // if (!e.detail.userInfo) {
    //   wx.showToast({
    //     title: '您已取消登录',
    //     icon: 'none'
    //   })
    //   return;
    // }
    // if (app.globalData.isConnected) {
    //   wx.setStorageSync('userInfo', e.detail.userInfo)
    //   AUTH.login(this);
    // } else {
    //   wx.showToast({
    //     title: '当前无网络',
    //     icon: 'none'
    //   })
    // }
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
