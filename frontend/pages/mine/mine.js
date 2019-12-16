import { showModal } from "../../utils/util"

const app = getApp()

Page({
  data: {},

  onLoad: function () {
    this.setData({ userInfo: app.globalData.userInfo })
  },

  getUserInfo (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({ userInfo: e.detail.userInfo })
      wx.setStorageSync('userInfo', e.detail.userInfo)
      app.getUserOpenId()
    }
  },

  about () {
    showModal("清友活动圈版本0.0.1\n开发人员：\n杨松霖\n那森\n邱圆辉\n金叶\n郭勇毅",
              "关于", false, function () {})
  }
})
