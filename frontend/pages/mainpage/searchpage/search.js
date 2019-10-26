Page({
  data: {
    inputShowed: false,
    inputVal: "",
    activities:["类型1","类型2","类型3","类型4","类型5"],
    history:[]
  },
  onLoad:function(options){
    var obj = JSON.parse(options.history);
    console.log(obj);
    this.setData({
      history:obj,
    });
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  chooseActivityType: function(e){
    this.setData({
      inputVal: e.currentTarget.dataset.value,
      inputShowed:true
    });
  }
});