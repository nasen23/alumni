import Dialog from 'vant-weapp/dialog/dialog'

const app = getApp()
const config = require('../../../config')

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

    this.setData({
      filledFields,
      id: options.id,
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
        if (Object.keys(res.data.participants).length != 0) {
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

  onSubmit () {
    if (!this.checkData()) {
      return
    }

    let this_ = this
    let signupTime = new Date().toLocaleString('zh-CN', { hour12: false })
    wx.request({
      url: config.host + 'activity/signup',
      method: "POST",
      data: {
        id: this_.data.id,
        participant: {
          signupTime,
          signedIn: false,
          info: this_.data.info,
          openid: app.globalData.openid,
          username: app.globalData.userInfo.nickName,
          avatarUrl: app.globalData.userInfo.avatarUrl,
        }
      },
      success () {
        wx.requestSubscribeMessage({
          tmplIds: [config.signupSuccessMsgId],
          success (res) {
            console.log(res)
            wx.request({
              url: config.authTokenServerAddr,
              method: "GET",
              data: {
                grant_type: "client_credential",
                appid: config.appId,
                secret: config.appSecret
              },
              success (res) {
                wx.request({
                  url: config.subscribeMsgServerAddr + '?access_token=' + res.data.access_token,
                  method: "POST",
                  data: {
                    touser: app.globalData.openid,
                    template_id: config.signupSuccessMsgId,
                    page: "pages/activity/detail/index?id=" + this_.data.id,
                    data: {
                      // activity name
                      thing2: {
                        value: "132"
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
                        value: "2020/01/01"
                      },
                      // activity site
                      thing5: {
                        value: "site"
                      }
                    }
                  },
                  success (res) {
                    console.log(res)
                  }
                })
              }
            })
          }
        })
        wx.showModal({
          title: "提示",
          content: "活动报名成功",
          showCancel: false,
          success () {
            wx.navigateBack()
          }
        })
      }
    })
  },

  onSave () {
    const this_ = this
    wx.request({
      url: `${config.host}activity/signup?id=${this_.data.id}&openid=${app.globalData.openid}`,
      method: "PUT",
      data: {
        info: this_.data.info
      },
      success (res) {
        wx.showModal({
          title: "提示",
          content: "报名信息修改成功",
          showCancel: false,
          success () {
            wx.navigateBack()
          }
        })
      }
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
      wx.request({
        url: `${config.host}activity/signup?id=${this_.data.id}&openid=${app.globalData.openid}`,
        method: "DELETE",
        success (res) {
          wx.showModal({
            title: "提示",
            content: "取消报名成功",
            showCancel: false,
            success () {
              wx.navigateBack()
            }
          })
        },
        fail (error) {
          wx.showModal({
            title: "提示",
            content: "取消活动失败",
            showCancel: false,
            success () {
              wx.navigateBack()
            }
          })
        }
      })
    }).catch(() => {})
  }
})
