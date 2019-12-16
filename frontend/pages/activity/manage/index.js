import { routes, host } from "../../../config"
import { request, showModal } from "../../../utils/util"

Page({

  data: {
    PopupTypeEnum: {
      ACT: 1,
      START: 2,
      END: 3,
    },
    id: "",
    name: "",
    site: "",
    intro: "",
    phone: "",
    show: false,
    popupType: 0,
    pictureList: [],
    actTime: "",
    actTimestamp: 0,
    signupStartTime: "",
    signupStartTimestamp: 0,
    signupEndTime: "",
    signupEndTimestamp: 0,
    today: new Date().getTime()
  },

  onLoad (options) {
    const this_ = this
    this.setData({ id: options.id })

    request(routes.getSingAct, "GET", {
      id: this_.data.id
    }).then(
      () => {}
    ).catch(err => {
      console.log(err)
      showModal("获取活动信息失败！请检查网络状态")
    })
  },

  initData (data) {
    this.setData({
      name: data.name,
      site: data.site,
      intro: data.intro,
      phone: data.phone,
      pictureList: data.pictures.map(name => {
        return {
          path: host + name
        }
      }),
      actTimestamp: data.time,
      actTime: new Date(parseInt(data.time)).toLocaleString(),
      signupStartTimestamp: data.signupStart,
      signupStartTime: new Date(parseInt(data.signupStart)).toLocaleString('zh-CN', { hour12: false }),
      signupEndTimestamp: data.signupEnd,
      signupEndTime: new Date(parseInt(data.signupEnd)).toLocaleString('zh-CN', { hour12: false }),
    })
  },

  // Field name has been filled in
  onNameFilledIn (e) {
    this.setData({ name: e.detail })
  },

  // Field site has been filled in
  onSiteFilledIn (e) {
    this.setData({ site: e.detail })
  },

  // Field intro has been filled in
  onIntroFilledIn (e) {
    this.setData({ intro: e.detail })
  },

  // Field phone has been filled in
  onPhoneFilledIn (e) {
    this.setData({ phone: e.detail })
  },

  // Choose activity time
  onChooseAct () {
    this.setData({
      show: true,
      popupType: this.data.PopupTypeEnum.ACT
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

    switch (this.data.popupType) {
      case this.data.PopupTypeEnum.ACT:
        this.setData({
          actTimestamp: e.detail,
          actTime: new Date(e.detail).toLocaleString()
        })
        break
      case this.data.PopupTypeEnum.START:
        this.setData({
          signupStartTimestamp: e.detail,
          signupStartTime: new Date(e.detail).toLocaleString()
        })
        break
      case this.data.PopupTypeEnum.END:
        this.setData({
          signupEndTimestamp: e.detail,
          signupEndTime: new Date(e.detail).toLocaleString()
        })
        break
    }
  },

  // Time canceled
  onCancel () {
    this.setData({ show: false })
  },

  onSubmit () {
    const this_ = this
    request(routes.putUpdataAct + '?id=' + this_.data.id, "PUT", {
      name: this_.data.name,
      site: this_.data.site,
      intro: this_.data.intro,
      phone: this_.data.phone,
      time: this_.data.actTimestamp.toString(),
      signupStart: this_.data.signupStartTimestamp.toString(),
      signupEnd: this_.data.signupEndTimestamp.toString(),
    }).then(res => {
      showModal("活动信息修改成功")
    })
  }

})
