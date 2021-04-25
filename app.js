App({
  globalData: {
    now: (new Date()).toLocaleString(),
    
    companyName: {
      minLength: 2,
      maxLength: 64
    },
    password: {
      minLength: 6,
      maxLength: 20
    },
    username: {
      minLength: 5,
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
  }


});
