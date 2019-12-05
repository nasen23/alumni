const app = getApp()
const config = require('../../../config.js')

Page({

  data: {
    PopupTypeEnum: {
      ACT: 1,
      START: 2,
      END: 3,
    },
    id: "",
    name: "",
    site: "",
    intro: "",
    phone: "",
    show: false,
    popupType: 0,
    pictureList: [],
    actTime: "",
    actTimestamp: 0,
    signupStartTime: "",
    signupStartTimestamp: 0,
    signupEndTime: "",
    signupEndTimestamp: 0,
    today: new Date().getTime()
  },

  onLoad (options) {
    let this_ = this
    this.setData({ id: options.id })

    wx.request({
      url: config.host + 'activity/get',
      method: "GET",
      data: {
        id: this_.data.id
      },
      success (res) {
        console.log(res)
        this_.setData({
          name: res.data.name,
          site: res.data.site,
          intro: res.data.intro,
          phone: res.data.phone,
          pictureList: res.data.pictures.map(name => {
            return {
              path: config.host + name
            }
          }),
          actTimestamp: res.data.time,
          actTime: new Date(parseInt(res.data.time)).toLocaleString(),
          signupStartTimestamp: res.data.signupStart,
          signupStartTime: new Date(parseInt(res.data.signupStart)).toLocaleString(),
          signupEndTimestamp: res.data.signupEnd,
          signupEndTime: new Date(parseInt(res.data.signupEnd)).toLocaleString(),
        })
      }
    })
  },

  // Field name has been filled in
  onNameFilledIn (e) {
    this.setData({ name: e.detail })
  },

  // Field site has been filled in
  onSiteFilledIn (e) {
    this.setData({ site: e.detail })
  },

  // Field intro has been filled in
  onIntroFilledIn (e) {
    this.setData({ intro: e.detail })
  },

  // Field phone has been filled in
  onPhoneFilledIn (e) {
    this.setData({ phone: e.detail })
  },

  // Choose activity time
  onChooseAct () {
    this.setData({
      show: true,
      popupType: this.data.PopupTypeEnum.ACT
    })
  },

  // Choose the registration time
  onChooseStart () {
    this.setData({
      show: true,
      popupType: this.data.PopupTypeEnum.START
    })
  },

  // Choose the deadline for registration
  onChooseEnd () {
    this.setData({
      show: true,
      popupType: this.data.PopupTypeEnum.END
    })
  },

  // Time confirmed
  onConfirm (e) {
    this.setData({ show: false })

    switch (this.data.popupType) {
      case this.data.PopupTypeEnum.ACT:
        this.setData({
          actTimestamp: e.detail,
          actTime: new Date(e.detail).toLocaleString()
        })
        break
      case this.data.PopupTypeEnum.START:
        this.setData({
          signupStartTimestamp: e.detail,
          signupStartTime: new Date(e.detail).toLocaleString()
        })
        break
      case this.data.PopupTypeEnum.END:
        this.setData({
          signupEndTimestamp: e.detail,
          signupEndTime: new Date(e.detail).toLocaleString()
        })
        break
    }
  },

  // Time canceled
  onCancel () {
    this.setData({ show: false })
  },

  onSubmit () {
    let this_ = this
    wx.request({
      url: config.host + 'activity/put?id=' + this_.data.id,
      method: "PUT",
      data: {
        name: this_.data.name,
        site: this_.data.site,
        intro: this_.data.intro,
        phone: this_.data.phone,
        time: this_.data.actTimestamp.toString(),
        signupStart: this_.data.signupStartTimestamp.toString(),
        signupEnd: this_.data.signupEndTimestamp.toString(),
      },
      success (res) {
        console.log(res)
        wx.showModal({
          title: "提示",
          content: "活动信息修改成功",
          showCancel: false,
          success: res => {
            wx.navigateBack()
          }
        })
      }
    })
  }

})
