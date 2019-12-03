//app.js
const config = require('config.js')
App({
  onLaunch () {
    this.getUserInfo().then(function (res) {
      console.log(res)
    }).catch(function (res) {
      console.log(res)
    })

    let this_ = this
    let openid = wx.getStorageSync('openid') || ''
    if (openid) {
      // The openid has not been cached yet
      // Get it from the backend
      wx.login({
        success: res => {
          // Send res.code to the backend to get openid
          if (res.code) {
            wx.request({
              url: config.host + 'user/login',
              method: 'POST',
              data: {
                appId: config.appId,
                secret: config.appSecret,
                code: res.code,
                username: this_.globalData.userInfo.nickName
              },
              success: res => {
                console.log(res)
                wx.setStorageSync('openid', res.data.openid)
                this_.globalData.openid = res.data.openid
              }
            })
          } else {
            wx.showToast({
              title: '登录失败',
              duration: 2000
            })
          }
        }
      })
    } else {
      // The openid was already cached
      this_.globalData.openid = openid
    }

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
                }
              })
            }
          }
        })
      } else {
        this_.globalData.userInfo = userInfo
        resolve(this_.globalData.userInfo)
      }
    })
  },

  globalData: {
    userInfo: null
  }
})
