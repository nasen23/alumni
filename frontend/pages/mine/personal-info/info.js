import { routes } from "../../../config"
import { request, showModal } from "../../../utils/util"

const app = getApp()

Page({

  data: {
    realname: "",
    phone: "",
    wechatId: "",
    idNumber: "",
    email: "",
    address: "",
  },

  onShow () {
    const this_ = this

    request(routes.getSingUser, "GET", {
      openid: app.globalData.openid,
    }).then(res => {
      this_.setData({
        realname: res.data.realname,
        phone: res.data.phone,
        wechatId: res.data.wechatId,
        idNumber: res.data.idNumber,
        email: res.data.email,
        address: res.data.address,
      })
    }).catch(err => {
      console.log(err)
      showModal("获取用户信息失败！请检查网络状态")
    })
  }
})
