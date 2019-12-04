Page({
  data: {
    activityCreated: [
      { id: 1, title: '有点意思', intro: '一些简介' }
    ],
    activity: []
  },

  toCreateActivity (event) {
    wx.navigateTo({
      url: './activity-create/index'
    })
  }
})
