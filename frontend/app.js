import { appId, appSecret, routes } from "./config"
import { request, showToast } from "./utils/util"

App({
  onLaunch () {
    this.getUserInfo()
  },

  getUserInfo () {
    let this_ = this
    return new Promise(function (resolve, reject) {
      let userInfo = wx.getStorageSync('userInfo') || ''
      if (!userInfo) {
        // Get the user information
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: res => {
                  wx.setStorageSync('userInfo', res.userInfo)
                  this_.globalData.userInfo = res.userInfo
                  resolve(this_.globalData.userInfo)
                },
                fail: error => {
                  console.log('getUserInfo failed: ' + error)
                  reject(error)
                }
              })
            } else {
              reject(res)
            }
          },
          fail: error => {
            reject(error)
          }
        })
      } else {
        this_.globalData.userInfo = userInfo
        resolve(this_.globalData.userInfo)
      }
    }).then(function () {
      this_.getUserOpenId()
    }).catch(function () {})
  },

  getUserOpenId () {
    let this_ = this
    let openid = wx.getStorageSync('openid') || ''
    if (!openid) {
      // The openid has not been cached yet
      // Get it from the back-end
      wx.login({
        success: res => {
          // Send res.code to the backend to get openid
          if (res.code) {
            request(routes.postLoginUser, "POST", {
              code: res.code,
              appId: appId,
              secret: appSecret,
              username: this_.globalData.userInfo.nickName,
              avatarUrl: this_.globalData.userInfo.avatarUrl
            }).then(res => {
              wx.setStorageSync('openid', res.data.openid)
              this_.globalData.openid = res.data.openid
            })
          } else {
            showToast("登录失败")
          }
        }
      })
    } else {
      // The openid was already cached
      this_.globalData.openid = openid
    }
  },

  globalData: {
    openid: "",
    userInfo: null,
  }
})
