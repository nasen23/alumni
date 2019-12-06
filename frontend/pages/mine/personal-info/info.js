const app = getApp()
const config = require('../../../config.js')

Page({

  data: {
    realname: "",
    phone: "",
    wechatId: "",
    idNumber: "",
    email: "",
    address: "",
  },

  onShow () {
    let this_ = this

    wx.request({
      url: config.host + 'user/get',
      method: "GET",
      data: {
        openid: app.globalData.openid,
      },
      success (res) {
        this_.setData({
          realname: res.data.realname,
          phone: res.data.phone,
          wechatId: res.data.wechatId,
          idNumber: res.data.idNumber,
          email: res.data.email,
          address: res.data.address,
        })
      }
    })
  },
})
