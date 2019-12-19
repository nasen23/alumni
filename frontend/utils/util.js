export const request = (url, method, data) => {
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
export const showModal = (
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
export const showToast = (
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

export function dateString (date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return `${year}/${month}/${day} ${hour}:${minute}`
}
