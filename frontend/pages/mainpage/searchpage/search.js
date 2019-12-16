import { routes, host } from "../../../config"
import { request, showModal } from "../../../utils/util"

Page({
  data: {
    value: "",
    activities: [],
    rootPath: host
  },

  onLoad () {},

  onChange (e) {
    this.setData({
      value: e.detail
    })
  },

  onSearch () {
    let this_ = this

    if (!this.data.value) {
      showModal("请输入关键词")
      return
    }

    request(routes.postAllActs + '?name=' + this.data.value, "POST", {
      fields: ["id", "name", "intro", "pictures"]
    }).then(data => {
      this_.setData({
        activities: data
      })
    }).catch(err => {
      console.log(err)
      showModal("数据获取失败！请检查控制台输出")
    })
  },

  onCancel () {},

  toActivityDetail (e) {
    wx.navigateTo({
      url: '../../activity/detail/index?id=' + e.currentTarget.dataset.id
    })
  }
});
