import Dialog from 'vant-weapp/dialog/dialog'

const app = getApp()
const config = require('../../../config.js')
Page({

  data: {
    popupShow: false,
  },

  onLoad (e) {
    this.setData({
      id: e.id,
      user: app.globalData.openid
    })
  },

  onShow () {
    let this_ = this
    wx.request({
      url: config.host + 'activity/get',
      method: "GET",
      data: {
        id: this_.data.id
      },
      success (res) {
        let actStart = res.data.actStart
        let actEnd = res.data.actEnd
        this_.setData({
          id: this_.data.id,
          name: res.data.name,
          site: res.data.site,
          rootPath: config.host,
          intro: res.data.intro,
          phone: res.data.phone,
          pictures: res.data.pictures,
          organizer: res.data.organizer,
          administrators: res.data.administrators,
          participants: res.data.participants,
          maxParticipants: res.data.maxParticipants,
          actStart: actStart === "0" ? "0" :
            new Date(parseInt(actStart)).toLocaleString('zh-CN', { hour12: false }),
          actEnd: actEnd === "0" ? "0" :
            new Date(parseInt(actEnd)).toLocaleString('zh-CN', { hour12: false }),
          signupStart: new Date(parseInt(res.data.signupStart)).toLocaleString('zh-CN', { hour12: false }),
          signupEnd: new Date(parseInt(res.data.signupEnd)).toLocaleString('zh-CN', { hour12: false }),
          signinCode: res.data.signinCode
        })

        let ret = this_.isParticipant()
        this_.setData({
          isAdministrator: this_.isAdministrator(),
          isParticipant: ret.isIn,
          index: ret.index
        })

        wx.request({
          url: config.host + 'user/get',
          method: "GET",
          data: {
            openid: this_.data.organizer
          },
          success: res => {
            this_.setData({
              avatarUrl: res.data.avatarUrl,
              nickName: res.data.username
            })
          }
        })
      },
      fail(){}
    })

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

  tagCancelClicked () {
    this.setData({
      popupShow: false,
    })

    Dialog.confirm({
      title: "活动删除提醒",
      message: "是否确认删除此活动所有信息？\n（不可恢复）"
    }).then(() => {
      wx.request({
        url: config.host + 'activity/delete?id=' + this.data.id,
        method: "DELETE",
        success (res) {
          wx.showModal({
            title: "提示",
            content: "活动删除成功",
            showCancel: false,
            success (res) {
              wx.navigateBack()
            }
          })
        },
        fail (error) {
          wx.showModal({
            title: "提示",
            content: "删除活动失败",
            showCancel: false,
            success (res) {
              wx.navigateBack()
            }
          })
        }
      })
    }).catch(() => {})
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
  },

})
