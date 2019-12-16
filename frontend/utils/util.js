const request = (url, method, data) => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url,
      method,
      data,
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

// Show modal dialog
const showModal = (
  content,
  title="提示",
  showCancel=false,
  success=function () {
    wx.navigateBack()
  },
  fail=function (err) {
    console.log("模态对话框显示失败！" + err)
  }
) => {
  wx.showModal({
    title,
    content,
    showCancel,
    success,
    fail
  })
}

// Show toast dialog
const showToast = (
  title,
  duration=2000,
  success=function () {},
  fail=function (err) {
    console.log("消息提示框显示失败！" + err)
  }
) => {
  wx.showToast({
    title,
    duration,
    success,
    fail
  })
}

export {
  request,
  showModal,
  showToast
}
