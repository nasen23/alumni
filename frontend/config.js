const version = "0.0.1"

const host = "http://localhost:3389/"
// const host: "http://2019-a03.iterator-traits.com:3389/"
// const host: "http://192.168.0.104:3389/"

const routes = {
  getAllActs: host + 'activity/all',
  getSingAct: host + 'activity/get',
  postAddAct: host + 'activity/add',
  delSingAct: host + 'activity/delete',
  delAllActs: host + 'activity/delete/all',
  postAddPic: host + 'activity/upload-picture',

  postAllActs: host + 'activity/all',
  getUserActs: host + 'activity/user',

  putUpdataAct: host + 'activity/put',
  getSigninAct: host + 'activity/signin',

  postSignupAct: host + 'activity/signup',

  getCheckSignin: host + 'activity/check-signin',

  putUpdateSignup: host + 'activity/signup',
  delCancelSignup: host + 'activity/signup',

  getAllUser: host + 'user/all',
  getSingUser: host + 'user/get',
  postAuthUser: host + 'user/auth',
  postLoginUser: host + 'user/login',
  putUpdateUser: host + 'user/put',
}

const appId = "wx97a987f625c04b01"
const appSecret = "c0121d2e27bc2c1e1f394c83b503d4e6"
const signupSuccessMsgId = "Cs1N92eQh3MxC5lx-i7jR_-Ru0f4YhOuchF7VNjRlVA"
const authTokenServerAddr = "https://api.weixin.qq.com/cgi-bin/token"
const subscribeMsgServerAddr = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send"

export {
  version, host, routes, appId, appSecret,
  signupSuccessMsgId, authTokenServerAddr,
  subscribeMsgServerAddr
}
