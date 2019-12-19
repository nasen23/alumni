import { host, routes } from "../../config"
import { request, showModal } from "../../utils/util"

const app = getApp()

Page({
  data: {
    rootPath: host,
    activities: [],
    requestFailed: false
  },

  onShow() {
    const this_ = this
    app.getUserInfo().then(function () {
      this_.setData({
        userInfo: app.globalData.userInfo
      })
    })

    this.makeRequest()
  },

  makeRequest () {
    const this_ = this
    request(routes.postAllActs, "POST", {
      fields: ["id", "name", "intro", "pictures"]
    }).then(res => {
      this_.setData({
        activities: res.data
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

  toSearchPage () {
    wx.navigateTo({
      url: "./searchpage/search"
    })
  },

  toActivityDetail(e) {
    wx.navigateTo({
      url: '../activity/detail/index?id=' + e.currentTarget.dataset.id,
    })
  }
})
