module.exports = {
  version: "0.0.1",
  host: "http://localhost:3389/",
  // host: "http://2019-a03.iterator-traits.com:3389/",
  // host: "http://192.168.0.104:3389/",
  routes: {
    getAllActs: this.host + 'activity/all',
    getSingAct: this.host + 'activity/get',
    postAddAct: this.host + 'activity/add',
    delSingAct: this.host + 'activity/delete',
    delAllActs: this.host + 'activity/delete/all',
    postAddPic: this.host + 'activity/upload-picture',

    postAllActs: this.host + 'activity/all',
    getUserActs: this.host + 'activity/user',

    putUpdataAct: this.host + 'activity/put',
    getSigninAct: this.host + 'activity/signin',

    postSignupAct: this.host + 'activity/signup',

    getCheckSignin: this.host + 'activity/check-signin',

    putUpdateSignup: this.host + 'activity/signup',
    delCancelSignup: this.host + 'activity/signup',

    getAllUser: this.host + 'user/all',
    getSingUser: this.host + 'user/get',
    postAuthUser: this.host + 'user/auth',
    postLoginUser: this.host + 'user/login',
    putUpdateUser: this.host + 'user/put',
  },

  appId: "wx97a987f625c04b01",
  appSecret: "c0121d2e27bc2c1e1f394c83b503d4e6",
  signupSuccessMsgId: "Cs1N92eQh3MxC5lx-i7jR_-Ru0f4YhOuchF7VNjRlVA",
  authTokenServerAddr: "https://api.weixin.qq.com/cgi-bin/token",
  subscribeMsgServerAddr: "https://api.weixin.qq.com/cgi-bin/message/subscribe/send"
}
