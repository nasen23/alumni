import { routes } from "../../config"
import { request, showModal } from "../../utils/util"

const app = getApp()

Page({
  data: {
    held: [],
    attended: [],
  },

  onShow () {
    const this_ = this

    request(routes.getSingUser, "GET", {
      openid: app.globalData.openid
    }).then(res => {
      this_.setData({
        held: res.data.heldActivities,
        attended: res.data.attendedActivities,
      })
    }).catch(err => {
      console.log(err)
      showModal("获取数据失败！请检查网络状态")
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
