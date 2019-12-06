import Toast from 'vant-weapp/toast/toast'
const app = getApp()
const config = require('../../../../config.js')

Page({

  data: {
    value: "",
    type: "",
    placeholder: "请输入你的",
  },

  onLoad (options) {
    this.setData({ value: options.value })
    switch (options.type) {
      case "姓名":
        this.setData({ type: "realname" })
        break
      case "手机号":
        this.setData({ type: "phone" })
        break
      case "微信号":
        this.data.type = "wechatId"
        this.setData({ type: "wechatId" })
        break
      case "身份证号码":
        this.setData({ type: "idNumber" })
        break
      case "邮箱":
        this.setData({ type: "email" })
        break
      case "居住地":
        this.setData({ type: "address" })
        break
    }
    let holder = this.data.placeholder
    this.setData({ placeholder: holder + options.type })
  },

  onInfoFilledIn (e) {
    let type = this.data.type
    this.setData({
      value: e.detail,
      [type]: e.detail
    })
  },

  onSubmit () {
    let this_ = this

    wx.request({
      url: config.host + 'user/put?openid=' + app.globalData.openid,
      method: "PUT",
      data: {
        [this_.data.type]: this_.data.value
      },
      success (res) {
        Toast.success('修改成功')
      }
    })
  },

  onClose () {
    console.log('ads')
    wx.navigateBack()
  }
})
