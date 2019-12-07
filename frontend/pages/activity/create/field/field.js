Page({
  data: {
    name: "",
    desc: "",
    show: false,
    field: {
      name: "",
      type: "",
      desc: "",
      chosen: false,
    },
    type: "singleLineText",
  },

  onLoad (options) {

  },

  onShow () {

  },

  onNameFilledIn (e) {
    this.setData({ name: e.detail })
  },

  onDescFilledIn (e) {
    this.setData({ desc: e.detail })
  },

  onTypeFilledIn (e) {
    this.setData({ show: true })
  },

  onTagClicked (e) {
    this.setData({
      show: false,
      type: e.currentTarget.dataset.type,
    })
  },

  onOverlayClicked () {
    this.setData({ show: false })
  },

  onSave () {
    const this_ = this
         
    if (!this.data.name) {
      wx.showModal({
        title: "提示",
        content: "请填写字段名称",
        showCancel: false
      })
      return
    }

    this.setData({
      field: {
        chosen: false,
        name: this.data.name,
        type: this.data.type,
        desc: this.data.desc,
      }
    })

    wx.showModal({
      title: "提示",
      content: "添加成功",
      showCancel: false,
      success (res) {
        let pages = getCurrentPages()
        // Previous page
        let prevPage = pages[pages.length - 2]

        prevPage.setData({
          allFields: prevPage.data.allFields.concat(this_.data.field)
        })
        wx.navigateBack()
      }
    })
  },

})
