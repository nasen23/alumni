const app = getApp()
const config = require('../../../config.js')

Page({

  data: {
    PopupTypeEnum: {
      ACTSTART: 0,
      ACTEND: 1,
      START: 2,
      END: 3,
    },
    chosenFieldsString: "",
    chosenFields: [],
    allFields: [
      {
        name: "姓名",
        chosen: false,
        required: false,
        type: "text",
        desc: "",
      }, {
        name:"手机号",
        chosen: false,
        required: false,
        type: "text",
        desc: "",
      }, {
        name: "微信号",
        chosen: false,
        required: false,
        type: "text",
        desc: "",
      }, {
        name: "身份证号",
        chosen: false,
        required: false,
        type: "text",
        desc: "",
      }, {
        name: "邮箱",
        chosen: false,
        required: false,
        type: "text",
        desc: "",
      }, {
        name: "性别",
        chosen: false,
        required: false,
        type: "text",
        desc: "",
      }, {
        name: "年龄",
        chosen: false,
        required: false,
        type: "text",
        desc: "",
      }, {
        name: "地址",
        chosen: false,
        required: false,
        type: "text",
        desc: "",
      }, {
        name: "入学年份",
        chosen: false,
        required: false,
        type: "text",
        desc: "",
      }, {
        name: "院系",
        chosen: false,
        required: false,
        type: "text",
        desc: "",
      }, {
        name: "工作单位",
        chosen: false,
        required: false,
        type: "text",
        desc: "",
      }, {
        name: "部门",
        chosen: false,
        required: false,
        type: "text",
        desc: "",
      }
    ],
    // Index of the tapped tag
    index: 0,

    show: false,
    dialogShow: false,

    name: "",
    intro: "",
    phone: "",
    location: null,
    switchChecked: false,
    maxParticipants: 0,
    popupType: 0,
    pictureList: [],

    actStartTime: "",
    actStartTimestamp: 0,
    actEndTime: "",
    actEndTimestamp: 0,
    signupStartTime: "",
    signupStartTimestamp: 0,
    signupEndTime: "",
    signupEndTimestamp: 0,
    today: new Date().getTime()
  },

  // Field name has been filled in
  onNameFilledIn (e) {
    this.setData({ name: e.detail })
  },

  // Field site has been filled in
  onSiteFilledIn (e) {
    const _this = this
    wx.chooseLocation({
      success (res) {
        _this.setData({
          location: res
        })
      },
      fail (res) {
        console.log(res)
      }
    })
  },

  // Field intro has been filled in
  onIntroFilledIn (e) {
    this.setData({ intro: e.detail })
  },

  // Field phone has been filled in
  onPhoneFilledIn (e) {
    this.setData({ phone: e.detail })
  },

  onMaxParticipants (e) {
    this.setData({ maxParticipants: e.detail })
  },

  setLocationDetail(e) {
    const this_ = this
    this.setData({
      location: { ...this_.data.location, detail: e.detail }
    })
    console.log(this.data.location)
  },

  // Choose activity time
  onChooseActStart () {
    this.setData({
      show: true,
      popupType: this.data.PopupTypeEnum.ACTSTART
    })
  },

  onChooseActEnd () {
    this.setData({
      show: true,
      popupType: this.data.PopupTypeEnum.ACTEND
    })
  },

  // Choose the registration time
  onChooseStart () {
    this.setData({
      show: true,
      popupType: this.data.PopupTypeEnum.START
    })
  },

  // Choose the deadline for registration
  onChooseEnd () {
    this.setData({
      show: true,
      popupType: this.data.PopupTypeEnum.END
    })
  },

  // Time confirmed
  onConfirm (e) {
    this.setData({ show: false })

    console.log(e)

    const dateStr = new Date(e.detail).toLocaleString('zh-CN')
    switch (this.data.popupType) {
      case this.data.PopupTypeEnum.ACTSTART:
        this.setData({
          actStartTimestamp: e.detail,
          actStartTime: dateStr
        })
        break
      case this.data.PopupTypeEnum.ACTEND:
        this.setData({
          actEndTimestamp: e.detail,
          actEndTime: dateStr
        })
        break
      case this.data.PopupTypeEnum.START:
        this.setData({
          signupStartTimestamp: e.detail,
          signupStartTime: dateStr
        })
        break
      case this.data.PopupTypeEnum.END:
        this.setData({
          signupEndTimestamp: e.detail,
          signupEndTime: dateStr
        })
        break
    }
  },

  // Time canceled
  onCancel () {
    this.setData({ show: false })
  },

  onSwitchChange ({ detail }) {
    this.setData({ switchChecked: detail })
  },

  onTagTapped (e) {
    let index = e.currentTarget.dataset.index
    this.setData({ index })
    if (this.data.allFields[index].chosen) {
      // Chosen tag tapped
      this.setData({ dialogShow: true })
    } else {
      // Normal tag tapped
      this.setData({ dialogShow: true })
    }
  },

  // Delete picture
  onDeletePicture (event) {
    let list = this.data.pictureList
    list.splice(event.detail.index, 1)
    this.setData({ pictureList: list })
  },

  toNewTagPage () {
    wx.navigateTo({ url: './field/field' })
  },

  editTag () {

  },

  // Whether the field(object) is in fields(object array)
  in (field, fields) {
    if (!fields) {
      return {
        isIn: false,
        index: -1
      }
    }

    for (let [index, f] of Object.entries(fields)) {
      if (fields[index].name == field.name) {
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

  getChosenFieldsString (fields) {
    let res = ""
    for (let field of fields) {
      if (field.required) {
        res += '*'
      }
      res += (field.name + '，')
    }
    return res.substring(0, res.length - 1)
  },


  cancelTag () {
    this.setData({ dialogShow: false })

    const index = this.data.index
    let allFields = this.data.allFields
    let field = allFields[index]
    let chosenFields = this.data.chosenFields

    field.chosen = false

    let res = this.in(field, chosenFields)
    chosenFields.splice(res.index, 1)
    let chosenFieldsString = this.getChosenFieldsString(chosenFields)

    this.setData({
      allFields,
      chosenFields,
      chosenFieldsString
    })
  },

  setTagToOptional () {
    this.setData({ dialogShow: false })

    const index = this.data.index
    let allFields = this.data.allFields
    let field = allFields[index]

    field.chosen = true
    field.required = false

    let chosenFields = this.data.chosenFields
    let res = this.in(field, chosenFields)
    if (res.isIn) {
      chosenFields[res.index].required = false
    } else {
      chosenFields.push({
        desc: field.desc,
        name: field.name,
        type: field.type,
        required: field.required
      })
    }

    console.log(chosenFields)

    let chosenFieldsString = this.getChosenFieldsString(chosenFields)

    this.setData({
      allFields,
      chosenFields,
      chosenFieldsString
    })
  },

  setTagToRequired () {
    this.setData({ dialogShow: false })

    const index = this.data.index
    let allFields = this.data.allFields
    let field = allFields[index]

    field.chosen = true
    field.required = true

    let chosenFields = this.data.chosenFields
    let res = this.in(field, chosenFields)
    if (res.isIn) {
      chosenFields[res.index].required = true
    } else {
      chosenFields.push({
        desc: field.desc,
        name: field.name,
        type: field.type,
        required: field.required
      })
    }
    let chosenFieldsString = this.getChosenFieldsString(chosenFields)

    this.setData({
      allFields,
      chosenFields,
      chosenFieldsString
    })
  },

  // Check if all the data has been filled in properly
  checkData () {
    if (!this.data.name) {
      wx.showModal({
        title: "提示",
        content: "请填写活动名称",
        showCancel: false
      })
      return false
    } else if (!this.data.signupStartTimestamp) {
      wx.showModal({
        title: "提示",
        content: "请填写活动报名开始时间",
        showCancel: false
      })
      return false
    } else if (!this.data.signupEndTimestamp) {
      wx.showModal({
        title: "提示",
        content: "请填写活动报名截止时间",
        showCancel: false
      })
      return false
    } else if (!this.data.maxParticipants) {
      wx.showModal({
        title: "提示",
        content: "请填写活动报名最大报名人数",
        showCancel: false
      })
      return false
    }

    if (this.data.signupEndTimestamp <= this.data.signupStartTimestamp) {
      wx.showModal({
        title: "提示",
        content: "活动报名截止时间必须晚于开始时间",
        showCancel: false
      })
      return false
    } else if (this.data.signupStartTimestamp >= this.data.actTimestamp) {
      wx.showModal({
        title: "提示",
        content: "活动报名开始时间必须早于活动开始时间",
        showCancel: false
      })
      return false
    } else if (this.data.signupEndTimestamp >= this.data.actTimestamp) {
      wx.showModal({
        title: "提示",
        content: "活动报名截止时间必须早于活动开始时间",
        showCancel: false
      })
      return false
    }
    return true
  },

  // Submit the data of the new activity to the backend
  onSubmit () {
    if (!this.checkData()) {
      return
    }

    let this_ = this
    this.submitLiteral().then(function (res) {
      this_.submitPictures(res.data.id)
    })
  },

  afterRead (event) {
    const { file } = event.detail
    let list = this.data.pictureList
    this.setData({ pictureList: list.concat(file) })
    console.log(this.data.pictureList)
  },

  // Submit literal data, e.g. name, site, intro, etc.
  submitLiteral () {
    const this_ = this
    delete this.data.location.errMsg

    return new Promise(function( resolve, reject ) {
      wx.request({
        url: config.host + 'activity/add',
        method: "POST",
        data: {
          name: this_.data.name,
          site: this_.data.location,
          intro: this_.data.intro,
          phone: this_.data.phone,
          actStart: this_.data.actStartTimestamp.toString(),
          actEnd: this_.data.actEndTimestamp.toString(),
          signupStart: this_.data.signupStartTimestamp.toString(),
          signupEnd: this_.data.signupEndTimestamp.toString(),
          maxParticipants: this_.data.maxParticipants.toString(),
          openid: app.globalData.openid,
          fields: this_.data.chosenFields,
        },
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res)
        }
      })
    })
  },

  // Submit pictures
  submitPictures (pictureId) {
    for (const [index, file] of this.data.pictureList.entries()) {
      wx.uploadFile({
        url: config.host + 'activity/upload-picture',
        filePath: file.path,
        name: "file",
        formData: {
          pictureId,
          index,
        },
        success: res => {}
      })
    }

    wx.showModal({
      title: "提示",
      content: "活动创建成功",
      showCancel: false,
      success: res => {
        wx.navigateBack()
      }
    })
  },

  onLoad (options) {

  },

})
