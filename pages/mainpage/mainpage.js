Page({
  data: {
    historyActivities: ["历史1", "历史2"],
    activityTypes: ["全部", "类型1", "类型2"],
    activities: [
      { "id": 1, "name": "活动名称", "intro": "活动简介", "tags": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "activityTime": "2019年10月14日", "activityLocation": "清华大学桃李园地下餐厅", "activityObject": ["xxxx级本科/研究生", "xx专业/院系","年龄段"],},
      { "id": 2, "name": "活动名称", "intro": "活动简介", "tags": ["1"] },
      { "id": 3, "name": "活动名称", "intro": "活动简介", "tags": ["1"] },
      { "id": 4, "name": "活动名称", "intro": "活动简介", "tags": ["1"] },
      { "id": 5, "name": "活动名称", "intro": "活动简介", "tags": ["1"] }
    ]
  },
  inputTyping: function () {
    var obj = JSON.stringify(this.data.history);
    wx.navigateTo({url:"./searchpage/search?history=" + obj})
  },
  toActivityDetail: function (e) {
    wx.navigateTo({
      url: "/pages/activity/tmpactivity/tmpactivity?id=" + e.currentTarget.dataset.id
    })
  }
})
