const app = getApp()
const config = require('../../../config.js')
Page({

  data: {
    id: "",
    name: "",
    phone: "",
  },

  onLoad (options) {
    this.setData({ id: options.id })
  },

  onNameFilledIn (e) {
    this.setData({ name: e.detail })
  },

  onPhoneFilledIn (e) {
    this.setData({ phone: e.detail })
  },

  checkData () {
    if (!this.data.name) {
      wx.showModal({
        title: "提示",
        content: "请填写参加者姓名",
        showCancel: false
      })
      return false
    } else if (!this.data.phone) {
      wx.showModal({
        title: "提示",
        content: "请填写参加者联系方式",
        showCancel: false
      })
      return false
    }
    return true
  },

  onSubmit () {
    if (!this.checkData()) {
      return
    }

    let this_ = this
    wx.request({
      url: config.host + 'activity/signup',
      method: "POST",
      data: {
        id: this_.data.id,
        name: this_.data.name,
        phone: this_.data.phone,
        openid: app.globalData.openid,
      },
      success: res => {
        wx.showModal({
          title: "提示",
          content: "活动报名成功",
          showCancel: false,
          success: res => {
            wx.navigateBack()
          }
        })
      }
    })
  },


})
