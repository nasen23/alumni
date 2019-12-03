const app = getApp()
const config = require('../../../config.js')

Page({

  data: {
    PopupTypeEnum: {
      ACT: 1,
      START: 2,
      END: 3,
    },
    name: "",
    site: "",
    intro: "",
    show: false,
    popupType: 0,
    actTime: "",
    actTimestamp: 0,
    signupStartTime: "",
    signupStartTimestamp: 0,
    signupEndTime: "",
    signupEndTimestamp: 0,
    today: new Date().getTime()
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

  // Check if all the data has been filled in properly
  checkData () {
    if (!this.data.name) {
      wx.showModal({
        title: "提示",
        content: "请填写活动名称",
        showCancel: false
      })
      return false
    } else if (!this.data.site) {
      wx.showModal({
        title: "提示",
        content: "请填写活动地点",
        showCancel: false
      })
      return false
    } else if (!this.data.intro) {
      wx.showModal({
        title: "提示",
        content: "请填写活动简介",
        showCancel: false
      })
      return false
    } else if (!this.data.actTimestamp) {
      wx.showModal({
        title: "提示",
        content: "请填写活动时间",
        showCancel: false
      })
      return false
    } else if (!this.data.signupStartTimestamp) {
      wx.showModal({
        title: "提示",
        content: "请填写活动报名开始时间",
        showCancel: false
      })
      return false
    } else if (!this.data.signupEndTimestamp) {
      wx.showModal({
        title: "提示",
        content: "请填写活动报名截止时间",
        showCancel: false
      })
      return false
    }

    if (this.data.signupEndTimestamp <= this.data.signupStartTimestamp) {
      wx.showModal({
        title: "提示",
        content: "活动报名截止时间必须晚于开始时间",
        showCancel: false
      })
      return false
    } else if (this.data.signupStartTimestamp >= this.data.actTimestamp) {
      wx.showModal({
        title: "提示",
        content: "活动报名开始时间必须早于活动开始时间",
        showCancel: false
      })
      return false
    } else if (this.data.signupEndTimestamp >= this.data.actTimestamp) {
      wx.showModal({
        title: "提示",
        content: "活动报名截止时间必须早于活动开始时间",
        showCancel: false
      })
      return false
    }
    return true
  },

  // Submit the data of the new activity to the backend
  onSubmit () {
    if (!this.checkData()) {
      return
    }
    wx.request({
      url: config.host + 'activity/add',
      method: "POST",
      data: {
        name: this.data.name,
        site: this.data.site,
        intro: this.data.intro,
        time: this.data.actTimestamp.toString(),
        signupStart: this.data.signupStartTimestamp.toString(),
        signupEnd: this.data.signupEndTimestamp.toString(),
        userInfo: app.globalData.userInfo
      },
      success: res => {
        if (res.statusCode == 201) {
          wx.showModal({
            title: "提示",
            content: "活动创建成功",
            showCancel: false,
            success: res => {
              wx.navigateBack()
            }
          })
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  },

  onLoad: function (options) {

  },

})
