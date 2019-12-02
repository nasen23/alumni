const config = require('../../../config.js')
Page({

  data: {},

  onLoad: function (e) {
    let this_ = this
    wx.request({
      url: config.host + 'activity/get',
      method: "GET",
      data: {
        id: e.id
      },
      success: res => {
        console.log(res)
        this_.setData({
          id: e.id,
          name: res.data.name,
          site: res.data.site,
          intro: res.data.intro,
          time: new Date(parseInt(res.data.time)).toLocaleString(),
          timeLeft: parseInt((new Date(parseInt(res.data.time)) - new Date()) / (1000 * 60 * 60 * 24))
        })
      },
      fail: e => {

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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

  toActivityMessage: function() {
    wx.navigateTo({ url: '/pages/activity-message/index?id=' })
  }
})
