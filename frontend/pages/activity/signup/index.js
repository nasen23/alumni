const app = getApp()
const config = require('../../../config.js')
Page({

  data: {
    id: "",
    info: [],
    fields: [],
    participants: [],
    holder: "请填写个人",
  },

  onLoad (options) {
    this.setData({ id: options.id })
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
        if (Object.keys(res.data.participants).length != 0) {
          console.log(res.data.participants)
          this_.setData({ participants: res.data.participants })
        }
        this_.setData({
          fields: res.data.fields,
        })
      }
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
        wx.showModal({
          title: "提示",
          content: "请填写个人" + field.name,
          showCancel: false
        })
        return false
      }
    }

    return true
  },

  register () {
    for (let participant of this.data.participants) {
      if (participant.openid === app.globalData.openid) {
        // registered
        participant.info = this.data.info
        return
      }
    }

    this.data.participants.push({
      openid: app.globalData.openid,
      info: this.data.info
    })
  },

  onSubmit () {
    if (!this.checkData()) {
      return
    }

    this.register()

    let this_ = this
    wx.request({
      url: config.host + 'activity/signup',
      method: "POST",
      data: {
        id: this_.data.id,
        participants: this_.data.participants
      },
      success: res => {
        wx.showModal({
          title: "提示",
          content: "活动报名成功",
          showCancel: false,
          success: res => {
            wx.navigateBack()
          }
        })
      }
    })
  },
})
