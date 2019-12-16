const app = getApp()
const config = require('../../../config')

Page({
  data: {
    value: "",
    activities: [],
    rootPath: config.host
  },

  onLoad (options) {

  },

  onChange (e) {
    this.setData({
      value: e.detail
    })
  },

  onSearch () {
    let this_ = this

    if (!this.data.value) {
      wx.showModal({
        title: "提示",
        content: "请输入关键词",
        showCancel: false
      })
      return
    }

    wx.request({
      url: config.host + 'activity/all?name=' + this.data.value,
      method: "POST",
      data: {
        fields: ["id", "name", "intro", "pictures"]
      },
      success (res) {
        this_.setData({
          activities: res.data
        })
      },
      fail (e) {
        console.log(e)
      }
    })
  },

  onCancel () {

  },

  toActivityDetail (e) {
    wx.navigateTo({
      url: '../../activity/detail/index?id=' + e.currentTarget.dataset.id
    })
  }
});
