import { host, routes } from "../../config"
import { request, showModal } from "../../utils/util"

const app = getApp()

Page({
  data: {
    rootPath: host,
    activities: []
  },

  onShow() {
    let this_ = this

    app.getUserInfo().then(function () {
      this_.setData({
        userInfo: app.globalData.userInfo
      })
    })

    request(routes.postAllActs, "POST", {
      fields: ["id", "name", "intro", "pictures"]
    }).then(res => {
      this_.setData({
        activities: res.data
      })
    }).catch(err => {
      console.log(err)
      showModal("数据获取失败！请检查网络状态")
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
