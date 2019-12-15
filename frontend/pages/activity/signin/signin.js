const app = getApp()
const config = require('../../../config')
Page({

  data: {
    id: "",
    type: "",
    // Input content
    value: "",
    // Number of input fields
    length: 6,
    isFocus: true
  },

  onLoad (options) {
    if (options.type === "admin") {
      // User type: activity administrator
      this.setData({
        type: "admin",
        id: options.id,
        code: options.code
      })
    } else if (options.type === "parti") {
      // User type: activity participant
      this.setData({
        type: "parti",
        id: options.id
      })
    }
  },

  onShow () {

  },

  tap () {
    this.setData({
      isFocus: true
    })
  },

  input (e) {
    let value = e.detail.value
    this.setData({ value })
  },

  onSubmit () {
    let this_ = this

    if (this.data.value.length < 6) {
      wx.showModal({
        title: "提示",
        content: "请填写完整的签到码",
        showCancel: false,
        success () {
          this_.setData({
            value: ""
          })
        }
      })
    } else {
      wx.request({
        url: config.host + 'activity/signin',
        method: "GET",
        data: {
          id: this_.data.id,
          openid: app.globalData.openid,
          code: this_.data.value
        },
        success (res) {
          let content = ""
          if (res.data.signin === 'success') {
            content = "签到成功"
          } else if (res.data.signin === 'fail'){
            content = "签到码错误！签到失败"
          }
          wx.showModal({
            title: "提示",
            content,
            showCancel: false,
            success () {
              wx.navigateBack()
            }
          })
        }
      })
    }
  }


})
