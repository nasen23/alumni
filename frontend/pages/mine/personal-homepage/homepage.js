import { host } from "../../../config"

const app = getApp()

Page({

  data: {},

  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      rootPath: host
    })
  },

})
