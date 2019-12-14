const app = getApp()
const config = require('../../../config')
Page({

  data: {
    id: "",
  },

  onLoad: function (options) {
    this.setData({
      id: options.id,
      signinCode: options.code
    })
  },

  onShow: function () {

  },
})
