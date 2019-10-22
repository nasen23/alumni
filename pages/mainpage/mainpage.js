Page({
  data: {
    history: ["类型1", "类型2", "类型3", "类型4", "类型5"],
    activityTypes: ["全部","类型1", "类型2", "类型3", "类型4", "类型5"],
    activity: [
      {
        "activityName": "活动名称", "activityIntro": "活动简介", "activityTag": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], "activityTime": "2019年10月14日", "activityLocation": "清华大学桃李园地下餐厅", "activityObject": ["xxxx级本科/研究生", "xx专业/院系","年龄段"],}, 
      { "activityName": "活动名称", "activityIntro": "活动简介", "activityTag": ["1"] }, 
      { "activityName": "活动名称", "activityIntro": "活动简介", "activityTag": ["1"] }, 
      { "activityName": "活动名称", "activityIntro": "活动简介", "activityTag": ["1"] }, 
      { "activityName": "活动名称", "activityIntro": "活动简介", "activityTag": ["1"] }]},
  inputTyping: function () {
    var obj = JSON.stringify(this.data.history);
    wx.navigateTo({url:"./searchpage/search?history=" + obj});
  },
  openActivity:function (e){
    var obj = JSON.stringify(e.currentTarget.dataset.activity.activityTag);
    var nbj = JSON.stringify(e.currentTarget.dataset.activity);
    wx.navigateTo({
      url: "../activity/tmpactivity/tmp?&activity=" + nbj});
  }
});