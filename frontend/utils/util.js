const request = (url, method, data) => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url,
      method,
      data,
      success (res) {
        resolve(res.data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

module.exports = {
  request
}
