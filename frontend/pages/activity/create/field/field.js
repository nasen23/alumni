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
    type: "text",
    // create tag or edit an existed tag
    isNewTag: false,
  },

  onLoad (options) {
    this.setData({
      name: options.name || "",
      type: options.type || "text",
      isNewTag: options.isNewTag || false
    })
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

    const field = this.data.field
    const isNewTag = this.data.isNewTag

    let pages = getCurrentPages()
    // Previous page
    let prevPage = pages[pages.length - 2]
    prevPage.addNewTag(field, isNewTag)
  },

})
