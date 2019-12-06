const app = getApp()
const config = require('../../../config.js')

Page({

  data: {
    PopupTypeEnum: {
      ACTSTART: 0,
      ACTEND: 1,
      START: 2,
      END: 3,

    },
    name: "",
    location: null,
    intro: "",
    phone: "",
    switchChecked: false,
    show: false,
    maxParticipants: 0,
    popupType: 0,
    pictureList: [],
    actStartTime: "",
    actStartTimestamp: 0,
    actEndTime: "",
    actEndTimestamp: 0,
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
    const _this = this
    wx.chooseLocation({
      success (res) {
        _this.setData({
          location: res
        })
      }
    })
  },

  // Field intro has been filled in
  onIntroFilledIn (e) {
    this.setData({ intro: e.detail })
  },

  // Field phone has been filled in
  onPhoneFilledIn (e) {
    this.setData({ phone: e.detail })
  },

  onMaxParticipants (e) {
    this.setData({ maxParticipants: e.detail })
  },

  setLocationDetail(e) {
    this.setData({
      location: { ...location, detail: e.detail }
    })
  },

  // Choose activity time
  onChooseActStart () {
    this.setData({
      show: true,
      popupType: this.data.PopupTypeEnum.ACTSTART
    })
  },

  onChooseActEnd () {
    this.setData({
      show: true,
      popupType: this.data.PopupTypeEnum.ACTEND
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

    const dateStr = new Date(e.detail).toLocaleString('zh-CN')
    switch (this.data.popupType) {
      case this.data.PopupTypeEnum.ACTSTART:
        this.setData({
          actStartTimestamp: e.detail,
          actStartTime: dateStr
        })
        break
      case this.data.PopupTypeEnum.ACTEND:
        this.setData({
          actEndTimestamp: e.detail,
          actEndTime: dateStr
        })
        break
      case this.data.PopupTypeEnum.START:
        this.setData({
          signupStartTimestamp: e.detail,
          signupStartTime: dateStr
        })
        break
      case this.data.PopupTypeEnum.END:
        this.setData({
          signupEndTimestamp: e.detail,
          signupEndTime: dateStr
        })
        break
    }
  },

  // Time canceled
  onCancel () {
    this.setData({ show: false })
  },

  onSwitchChange ({ detail }) {
    this.setData({ switchChecked: detail })
  },

  // Delete picture
  onDeletePicture (event) {
    let list = this.data.pictureList
    list.splice(event.detail.index, 1)
    this.setData({ pictureList: list })
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

    let this_ = this
    this.submitLiteral().then(function (res) {
      this_.submitPictures(res.data.id)
    })
  },

  afterRead (event) {
    const { file } = event.detail
    let list = this.data.pictureList
    this.setData({ pictureList: list.concat(file) })
    console.log(this.data.pictureList)
  },

  // Submit literal data, e.g. name, site, intro, etc.
  submitLiteral () {
    let this_ = this
    return new Promise(function( resolve, reject ) {
      wx.request({
        url: config.host + 'activity/add',
        method: "POST",
        data: {
          name: this_.data.name,
          site: this_.data.site,
          intro: this_.data.intro,
          phone: this_.data.phone,
          time: this_.data.actTimestamp.toString(),
          signupStart: this_.data.signupStartTimestamp.toString(),
          signupEnd: this_.data.signupEndTimestamp.toString(),
          openid: app.globalData.openid
        },
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res)
        }
      })
    })
  },

  // Submit pictures
  submitPictures (pictureId) {
    for (const [index, file] of this.data.pictureList.entries()) {
      wx.uploadFile({
        url: config.host + 'activity/upload-picture',
        filePath: file.path,
        name: "file",
        formData: {
          pictureId,
          index,
        },
        success: res => {}
      })
    }

    wx.showModal({
      title: "提示",
      content: "活动创建成功",
      showCancel: false,
      success: res => {
        wx.navigateBack()
      }
    })
  },

  onLoad (options) {

  },

})
