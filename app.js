App({
  globalData: {
    now: (new Date()).toLocaleString(),
    // https://api.mujia.online
    // http://yaf.test
    serverHost: "https://api.mujia.online",
    code: {
      success: 200
    },

    companyName: {
      minLength: 2,
      maxLength: 64
    },
    password: {
      minLength: 6,
      maxLength: 20
    },
    username: {
      minLength: 2,
      maxLength: 18
    },
    codeVerify: {
      length: 6
    }

  },

  /**
   * @commet: 检查电话号码
   * @return: true: 是; false: 不是;
   */
  checkPhone: function (phone) {
    let reg = /^1[3-9][0-9]{9}$/;
    return reg.test(phone);
  },

  /**
   * @comment: 判断是否是正整数，且范围是 0~999999999
   * @return: true: 是; false: 不是;
   */
  judgePositiveInt: function (str) {
    let reg = /^[0-9]{1,9}$/;
    return reg.test(str);
}

});
