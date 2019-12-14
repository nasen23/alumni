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
    isNewActivity: true,
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

  onLoad (options) {
    let this_ = this
    if (options.id) {
      wx.setNavigationBarTitle({
        title: "修改活动"
      })
      this_.setData({
        id: options.id,
        isNewActivity: false
      })
      wx.request({
        url: config.host + 'activity/get',
        method: "GET",
        data: {
          id: options.id
        },
        success (res) {
          let actStartTimestamp = parseInt(res.data.actStart)
          let actEndTimestamp = parseInt(res.data.actEnd)
          let signupStartTimestamp = parseInt(res.data.signupStart)
          let signupEndTimestamp = parseInt(res.data.signupEnd)
          let actStartTime = ""
          let actEndTime = ""
          let switchChecked = false
          if (actStartTimestamp) {
            actStartTime = new Date(actStartTimestamp).toLocaleString('zh-CN')
            switchChecked = true
          }
          if (actEndTimestamp) {
            actEndTime = new Date(actEndTimestamp).toLocaleString('zh-CN')
            switchChecked = true
          }
          this_.setData({
            name: res.data.name,
            location: res.data.site,
            intro: res.data.intro,
            phone: res.data.phone,
            actStartTime,
            actStartTimestamp,
            actEndTime,
            actEndTimestamp,
            signupStartTime: new Date(signupStartTimestamp).toLocaleString('zh-CN'),
            signupStartTimestamp,
            signupEndTime: new Date(signupEndTimestamp).toLocaleString('zh-CN'),
            signupEndTimestamp,
            switchChecked,
            maxParticipants: res.data.maxParticipants,
            chosenFields: res.data.fields,
            pictureList: res.data.pictures
          })
          let allFields = this_.data.allFields
          let chosenFieldsString = this_.getChosenFieldsString(this_.data.chosenFields)
          for (let field of this_.data.chosenFields) {
            let res = this_.in(field, allFields)
            if (res.isIn) {
              allFields[res.index] = {
                ...field,
                chosen: true
              }
            }
          }
          this_.setData({
            allFields,
            chosenFieldsString
          })
        },
        fail (error) {
          wx.showModal({
            title: "提示",
            content: "获取活动数据失败",
            showCancel: false,
            success (res) {
              wx.navigateBack()
            }
          })
        }
      })
    }
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
    wx.navigateTo({ url: "./field/field?isNewTag=true" })
  },

  editTag () {
    this.setData({ dialogShow: false })
    const field = this.data.allFields[this.data.index]
    wx.navigateTo({
      url: `./field/field?name=${ field.name }&type=${ field.type }`
    })
  },

  addNewTag (field, isNewTag) {
    let allFields = this.data.allFields
    let res = this.in(field, allFields)

    if (isNewTag) {
      if (res.isIn) {
        wx.showModal({
          title: "提示",
          content: "字段名已存在",
          showCancel: false,
          success (res) {
          }
        })
        return
      } else {
        allFields.push(field)
        this.setData({ allFields })
        wx.showModal({
          title: "提示",
          content: "保存成功",
          showCancel: false,
          success (res) {
            wx.navigateBack()
          }
        })
        return
      }
    }

    // Update existed tag
    if (res.isIn && this.data.index != res.index) {
      wx.showModal({
        title: "提示",
        content: "字段名已存在",
        showCancel: false,
        success (res) {}
      })
      return
    }
    allFields[this.data.index] = field
    this.setData({ allFields })

    wx.showModal({
      title: "提示",
      content: "保存成功",
      showCancel: false,
      success (res) {
        wx.navigateBack()
      }
    })
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
      if (f.name == field.name) {
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

    this.submitLiteral()
  },

  afterRead (event) {
    const { file } = event.detail
    let list = this.data.pictureList
    this.setData({ pictureList: list.concat(file) })
  },

  getSigninCode (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  // Submit literal data, e.g. name, site, intro, etc.
  submitLiteral () {
    const this_ = this
    if (this.data.location) {
      delete this.data.location.errMsg
    }

    let url = this.data.isNewActivity ?
        config.host + 'activity/add' :
        config.host + 'activity/put?id=' + this.data.id
    let method = this.data.isNewActivity ? "POST" : "PUT"
    let signinCode = this.getSigninCode(100000, 999999)
    let data = {
      signinCode,
      name: this_.data.name,
      site: this_.data.location,
      intro: this_.data.intro,
      phone: this_.data.phone,
      actStart: this_.data.actStartTimestamp,
      actEnd: this_.data.actEndTimestamp,
      signupStart: this_.data.signupStartTimestamp,
      signupEnd: this_.data.signupEndTimestamp,
      maxParticipants: this_.data.maxParticipants,
      fields: this_.data.chosenFields,
    }
    if (this.data.isNewActivity) {
      data.openid = app.globalData.openid
    }
    return new Promise(function( resolve, reject ) {
      wx.request({
        url,
        method,
        data,
        success: res => {
          resolve(res)
        },
        fail: res => {
          reject(res)
        }
      })
    }).then(function (res) {
      if (this_.data.isNewActivity) {
        this_.submitPictures(res.data.id)
        return
      }
      let content = this_.data.isNewActivity ?
          "活动创建成功" : "活动信息修改成功"
      wx.showModal({
        title: "提示",
        content,
        showCancel: false,
        success: res => {
          wx.navigateBack()
        }
      })
    }).catch(function (res) {
      wx.showModal({
        title: "提示",
        content: this_.data.isNewActivity ?
          "创建活动失败，请检查网络状态" : "修改活动信息失败，请检查网络状态",
        showCancel: false,
        success (res) {
          wx.navigateBack()
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
        success: res => {
          console.log(res)
        }
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

})
