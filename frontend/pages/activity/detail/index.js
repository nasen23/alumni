import Dialog from 'vant-weapp/dialog/dialog'
import {
  host,
  appId,
  routes,
  appSecret,
  authTokenServerAddr,
  activityCancelMsgId,
  subscribeMsgServerAddr
} from "../../../config"
import { request, showModal } from "../../../utils/util"

const app = getApp()

Page({

  data: {
    popupShow: false,
    dialogShow: false,
    cancelReason: "",
  },

  onLoad (e) {
    this.setData({
      id: e.id,
      user: app.globalData.openid
    })
  },

  onShow () {
    const this_ = this

    request(routes.getSingAct, "GET", {
      id: this_.data.id
    }).then(res => {
      this_.initData(res.data)
      request(routes.getSingUser, "GET", {
        openid: this_.data.organizer
      }).then(res => {
        this_.setData({
          avatarUrl: res.data.avatarUrl,
          nickName: res.data.username
        })
      }).catch(err => {
        consol
        showModal("获取举办者信息失败！请检查网络状态")
      })
    }).catch(err => {
      console.log(err)
      showModal("获取活动信息失败！请检查网络状态")
    })
  },

  initData(data) {
    let actStart = data.actStart
    let actEnd = data.actEnd
    this.setData({
      id: this.data.id,
      name: data.name,
      site: data.site,
      rootPath: host,
      intro: data.intro,
      phone: data.phone,
      pictures: data.pictures,
      organizer: data.organizer,
      administrators: data.administrators,
      participants: data.participants,
      maxParticipants: data.maxParticipants,
      actStart: this.validDate(actStart),
      actEnd: this.validDate(actEnd),
      signupStart: this.validDate(data.signupStart),
      signupEnd: this.validDate(data.signupEnd),
      signinCode: data.signinCode
    })

    let ret = this.isParticipant()
    this.setData({
      isAdministrator: this.isAdministrator(),
      isParticipant: ret.isIn,
      index: ret.index
    })
  },

  validDate (time) {
    // returns a Valid date string from timestamp(str or int)
    if (time && time !== '0') {
      const date = new Date(parseInt(time));
      if (!isNaN(date)) {
        return date.toLocaleString('zh-CN', { hour12: false })
      }
    }

    return null
  },

  isAdministrator () {
    return this.data.administrators.includes(this.data.user)
  },

  isParticipant () {
    let pars = this.data.participants
    if (pars.length === 0) {
      return {
        index: -1,
        isIn: false
      }
    }

    for (let [index, par] of Object.entries(pars)) {
      if (par.openid === this.data.user) {
        return {
          index,
          isIn: true
        }
      }
    }

    return {
      index: -1,
      isIn: false
    }
  },

  toActivitySignup () {
    wx.navigateTo({
      url: `../signup/index?id=${this.data.id}`
    })
  },

  toActivityManage () {
    this.setData({ popupShow: true })
  },

  changeSignupInfo () {
    const this_ = this
    wx.navigateTo({
      url: `../signup/index?id=${this.data.id}`,
      success (res) {
        res.eventChannel.emit('changeInfo', {
          data: this_.data.participants[this_.data.index]
        })
      }
    })
  },

  onOverlayClicked () {
    this.setData({ popupShow: false })
  },

  tagEditClicked () {
    this.setData({ popupShow: false })
    wx.navigateTo({ url: '../create/index?id=' + this.data.id })
  },

  onReasonChanged (e) {
    this.setData({
      cancelReason: e.detail
    })
  },

  getAuthToken () {
    return new Promise(function (resolve, reject) {
      wx.requestSubscribeMessage({
        tmplIds: [activityCancelMsgId],
        success () {
          request(authTokenServerAddr, "GET", {
            grant_type: "client_credential",
            appid: appId,
            secret: appSecret
          }).then(res => {
            resolve(res.data.access_token)
          }).catch(err => {
            reject(err)
          })
        }
      })
    })
  },

  sendSubscribeMsg (access_token) {
    const this_ = this


    for (let participant of this.data.participants) {
      const data = {
        touser: participant.openid,
        template_id: activityCancelMsgId,
        data: {
          // activity name
          thing1: {
            value: this_.data.name
          },
          // activity time
          date2: {
            value: "2020/01/01"
          },
          // activity site
          thing3: {
            value: "site"
          },
          // canceller
          name4: {
            value: this_.data.nickName
          },
          // cancel reason
          thing5: {
            value: this_.data.cancelReason
          }
        }
      }

      request(subscribeMsgServerAddr + "?access_token=" + access_token, "POST", data)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  async onDialogConfirm () {
    if (this.data.cancelReason) {
      // Send cancel message to all participants
      try {
        const access_token = await this.getAuthToken()
        this.sendSubscribeMsg(access_token)
      } catch (err) {
        console.log(err)
        showModal("获取token失败！请检查网络状态")
      }
    }

    request(routes.delSingAct + "?id=" + this.data.id, "DELETE", {}).then(() => {
      showModal("活动取消成功")
    }).catch(err => {
      console.log(err)
      showModal("取消活动失败！请检查网络状态")
    })
  },

  tagCancelClicked () {
    this.setData({
      popupShow: false,
      dialogShow: true
    })
  },

  tagManagerClicked () {
    this.setData({ popupShow: false })
  },

  tagSignInClicked () {
    let this_ = this

    this.setData({ popupShow: false })
    wx.navigateTo({
      url: `../signin/signin?type=admin&id=${this_.data.id}&code=${this_.data.signinCode}`
    })
  },

  tagStatisticClicked () {
    this.setData({ popupShow: false })
  }
})
