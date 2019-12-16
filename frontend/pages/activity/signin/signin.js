import { routes } from "../../../config"
import { showModal, request } from "../../../utils/util"

const app = getApp()

Page({

  data: {
    id: "",
    type: "",
    // Input content
    value: "",
    // Number of input fields
    length: 6,
    isFocus: true
  },

  onLoad (options) {
    if (options.type === "admin") {
      // User type: activity administrator
      this.setData({
        type: "admin",
        id: options.id,
        code: options.code
      })
    } else if (options.type === "parti") {
      // User type: activity participant
      this.setData({
        type: "parti",
        id: options.id
      })
    }
  },

  tap () {
    this.setData({
      isFocus: true
    })
  },

  input (e) {
    const value = e.detail.value
    this.setData({ value })
  },

  onSubmit () {
    const this_ = this

    if (this.data.value.length < 6) {
      showModal("请填写完整的签到码", "提示", false, function () {
        this_.setData({ value: "" })
      })
    } else {
      request(routes.getSigninAct, "GET", {
        id: this_.data.id,
        openid: app.globalData.openid,
        code: this_.data.value
      }).then(res => {
        let content = ""
        if (res.data.signin === 'success') {
          content = "签到成功"
        } else if (res.data.signin === 'fail'){
          content = "签到码错误！签到失败"
        }
        showModal(content)
      })
    }
  }
})
