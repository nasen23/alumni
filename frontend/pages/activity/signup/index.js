import Dialog from 'vant-weapp/dialog/dialog'

import {
  appId,
  routes,
  appSecret,
  signupSuccessMsgId,
  authTokenServerAddr,
  subscribeMsgServerAddr,
} from "../../../config"
import { request, showModal } from "../../../utils/util"

const app = getApp()

Page({

  data: {
    id: "",
    info: [],
    fields: [],
    participant: {},
    filledFields: {},
    hasSignedUp: false,
    holder: "请填写个人",
  },

  onLoad (options) {
    let this_ = this
    let filledFields = {}
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('changeInfo', function(data) {
      this_.setData({
        hasSignedUp: true
      })
      for (let f of data.data.info) {
        filledFields[f.field] = f.value
      }
    })
    eventChannel.on('opened', function(data) {
      this_.setData({
        name: data.data.actName,
        site: data.data.actSite,
        time: data.data.actTime,
      })
    })

    this.setData({
      filledFields,
      id: options.id,
    })
  },

  onShow () {
    const this_ = this

    request(routes.getSingAct, "GET", {
      id: this_.data.id
    }).then(res => {
      if (res.data.participants.length) {
        this_.setData({ participants: res.data.participants })
      }
      this_.setData({ fields: res.data.fields })
    })
  },

  in (fieldname, info) {
    // Whether the current info list contains the specific field name
    if (!info) {
      return {
        isIn: false,
        index: -1
      }
    }

    for (let [index, item] of Object.entries(info)) {
      if (item.field == fieldname) {
        return {
          isIn: true,
          index
        }
      }
    }

    return {
      isIn: false,
      index: -1
    }
  },

  onInfoFilledIn (e) {
    let info = this.data.info
    let name = e.currentTarget.dataset.name
    let res = this.in(name, info)

    if (res.isIn) {
      info[res.index].value = e.detail
    } else {
      info.push({
        field: name,
        value: e.detail
      })
    }

    this.setData({ info })
  },

  checkData (e) {
    for (let field of this.data.fields) {
      if (field.required && !this.in(field.name, this.data.info).isIn) {
        showModal("请填写个人" + field.name, "提示", false, function () {})
        return false
      }
    }

    return true
  },

  onSubmit () {
    if (!this.checkData()) {
      return
    }

    const this_ = this
    const signupTime = new Date().toLocaleString('zh-CN', { hour12: false })

    request(routes.postSignupAct, "POST", {
      id: this_.data.id,
      participant: {
        signupTime,
        signedIn: false,
        info: this_.data.info,
        openid: app.globalData.openid,
        username: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
      }
    }).then(() => {
      this_.getAuthToken()
    }).catch(err => {
      console.log(err)
      showModal("报名活动失败！请检查网络状态")
    })
  },

  getAuthToken () {
    const this_ = this

    wx.requestSubscribeMessage({
      tmplIds: [signupSuccessMsgId],
      success () {
        request(authTokenServerAddr, "GET", {
          grant_type: "client_credential",
          appid: appId,
          secret: appSecret
        }).then(res => {
          this_.sendSubscribeMsg(res.data.access_token)
          showModal("活动报名成功")
        }).catch(err => {
          console.log(err)
          showModal("发送订阅消息失败！请检查网络状态")
        })
      }
    })
  },

  sendSubscribeMsg (access_token) {
    const data = {
      touser: app.globalData.openid,
      template_id: signupSuccessMsgId,
      page: "pages/activity/detail/index?id=" + this.data.id,
      data: {
        // activity name
        thing2: {
          value: this.data.name
        },
        // user name
        name1: {
          value: app.globalData.userInfo.nickName
        },
        // registration state
        phrase8: {
          value: "报名成功"
        },
        // activity time
        date4: {
          value: this.data.time
        },
        // activity site
        thing5: {
          value: this.data.site.name
        }
      }
    }

    request(subscribeMsgServerAddr + "?access_token=" + access_token, "POST", data)
      .then(() => {})
      .catch(err => {
        console.log(err)
        showModal("发送订阅消息失败！请检查网络状态")
      })
  },

  onSave () {
    const this_ = this
    request(routes.putUpdateSignup + "?id=" + this.data.id + "&openid=" + app.globalData.openid,
      "PUT", {
      info: this_.data.info
    }).then(() => {
      showModal("报名信息修改成功")
    })
  },

  onSignin () {
    wx.navigateTo({
      url: `../signin/signin?type=parti&id=${this.data.id}`,
    })
  },

  onCancel () {
    const this_ = this
    Dialog.confirm({
      title: "取消确认",
      message: "确定要取消此报名吗？"
    }).then(() => {
      request(`${routes.delCancelSignup}?id=${this_.data.id}&openid=${app.globalData.openid}`,
        "DELETE", {}).then(() => {
          showModal("取消报名成功")
      }).catch(err => {
        console.log(err)
        showModal("取消报名失败！请检查网络状态")
      })
    }).catch(() => {})
  }
})
