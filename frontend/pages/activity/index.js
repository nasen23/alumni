import { routes } from "../../config"
import { request } from "../../utils/util"

const app = getApp()

Page({
  data: {
    held: [],
    attended: [],
    requestFailed: false
  },

  onShow () {
    this.makeRequest()
  },

  makeRequest () {
    const this_ = this

    request(routes.getUserActs, "GET", {
      openid: app.globalData.openid
    }).then(res => {
      this_.setData({
        held: res.data.held,
        attended: res.data.attended
      })
    }).catch(err => {
      console.log(err)
      this_.setData({ requestFailed: true })
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        duration: 1000
      })
    })
  },

  toActivityDetail (e) {
    wx.navigateTo({
      url: './detail/index?id=' + e.currentTarget.dataset.id,
    })
  },

  toCreateActivity (e) {
    wx.navigateTo({
      url: './create/index'
    })
  }
})
