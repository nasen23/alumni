const app = getApp()
const config = require('../../../config.js')
Page({

  data: {
    popupShow: false
  },

  onLoad: function (e) {
    this.setData({ id: e.id })
  },

  onShow () {
    let this_ = this
    wx.request({
      url: config.host + 'activity/get',
      method: "GET",
      data: {
        id: this_.data.id
      },
      success: res => {
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
          participants: res.data.participants,
          maxParticipants: res.data.maxParticipants,
          actStart: actStart === "0" ? "0" :
            new Date(parseInt(actStart)).toLocaleString(),
          actEnd: actEnd === "0" ? "0" :
            new Date(parseInt(actEnd)).toLocaleString(),
          signupStart: new Date(parseInt(res.data.signupStart)).toLocaleString('zh'),
          signupEnd: new Date(parseInt(res.data.signupEnd)).toLocaleString('zh'),
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
      fail: e => {

      }
    })

  },

  toActivitySignup: function() {
    wx.navigateTo({ url: '/pages/activity/signup/index?id=' + this.data.id })
  },

  toActivityManage (e) {
    this.setData({ popupShow: true })
  },

  onOverlayClicked () {
    this.setData({ popupShow: false })
  },

  tagEditClicked () {
    this.setData({ popupShow: false })
    const this_ = this
    wx.navigateTo({ url: '/pages/activity/create/index?id=' + this.data.id })
  },

  tagCopyClicked () {
    this.setData({ popupShow: false })
  },

  tagCancelClicked () {
    this.setData({ popupShow: false })
  },

  tagManagerClicked () {
    this.setData({ popupShow: false })
  },

  tagSignInClicked () {
    this.setData({ popupShow: false })
  },

  tagStatisticClicked () {
    this.setData({ popupShow: false })
  },

})
