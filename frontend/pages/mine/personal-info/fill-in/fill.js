import Toast from 'vant-weapp/toast/toast'
import { routes } from "../../../../config"
import { request, showModal } from "../../../../utils/util"

const app = getApp()

Page({

  data: {
    value: "",
    type: "",
    placeholder: "请输入你的",
  },

  onLoad (options) {
    this.setData({ value: options.value })
    switch (options.type) {
      case "姓名":
        this.setData({ type: "realname" })
        break
      case "手机号":
        this.setData({ type: "phone" })
        break
      case "微信号":
        this.data.type = "wechatId"
        this.setData({ type: "wechatId" })
        break
      case "身份证号码":
        this.setData({ type: "idNumber" })
        break
      case "邮箱":
        this.setData({ type: "email" })
        break
      case "居住地":
        this.setData({ type: "address" })
        break
    }
    let holder = this.data.placeholder
    this.setData({ placeholder: holder + options.type })
  },

  onInfoFilledIn (e) {
    let type = this.data.type
    this.setData({
      value: e.detail,
      [type]: e.detail
    })
  },

  onSubmit () {
    const this_ = this

    request(routes.putUpdateUser + "?openid=" + app.globalData.openid, "PUT", {
      [this_.data.type]: this_.data.value
    }).then(res => {
      Toast.success("修改成功")
    }).catch(err => {
      console.log(err)
      showModal("修改失败！请检查网络状态")
    })
  },

  onClose () {
    wx.navigateBack()
  }
})
