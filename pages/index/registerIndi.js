// pages/index/register.js
/**
 * 用来获取全局变量 app
 */
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    registerDisabled: false,

    username: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    codeVerify: '',
    /**
     * 本地存储的字段
     */
    items: [],
  },

  usernameCheck: function (argu) {
    let username = argu.detail.value;
    let usernameLength = username.length;
    this.setData({
      username: username
    })
    if (usernameLength < app.globalData.username.minLength 
      || usernameLength > app.globalData.username.maxLength) {
      wx.showToast({
        title: '用户名格式不正确',
        icon: 'fail',
        duration: 600,
      })
    }
  },

  passwordCheck: function (argu) {
    let password = argu.detail.value;
    let passwordLength = password.length;

    /**
     * 写在外面，可以避免来回修改~
     */
    this.setData({
      password: password
    })

    if (passwordLength < app.globalData.password.minLength 
      || passwordLength > app.globalData.password.maxLength) {
      wx.showToast({
        title: '密码格式不正确',
        icon: 'fail',
        duration: 600,
      })
    }
  },

  passwordConfirmCheck: function (argu) {
    let passwordConfirm = argu.detail.value;
    this.setData({
      passwordConfirm: passwordConfirm
    });
    if (this.data.password !== this.data.passwordConfirm) {
      wx.showToast({
        title: '密码不相同',
        icon: 'fail',
        duration: 600,
      })
    }
  },

  companyNameCheck: function (argu) {
    let companyName = argu.detail.value;
    this.setData({
      companyName: companyName
    })

    if (companyName.length < app.globalData.companyName.minLength 
      || companyName.length > app.globalData.companyName.minLength) {
      wx.showToast({
        title: '企业名格式不正确',
        icon: 'fail',
        duration: 600,
      })
    }
  },


  phoneCheck: function (argu) {
    let phone  = argu.detail.value;
    let checkPhone = app.checkPhone(phone);

    this.setData({
      phone: phone
    });

    if (!checkPhone) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'fail',
        duration: 600,
      })
    }
  },

  msgVerify: function (argu) {
    let codeVerify  = argu.detail.value;

    this.setData({
      codeVerify: codeVerify
    });

    if (codeVerify.length !== 6) {
      wx.showToast({
        title: '验证码格式不正确',
        icon: 'fail',
        duration: 600,
      })
    }
  },

  msgVerify: function (argu) {
    let codeVerify  = argu.detail.value;

    this.setData({
      codeVerify: codeVerify
    });

    if (codeVerify.length !== app.globalData.codeVerify.length) {
      wx.showToast({
        title: '验证码格式不正确',
        icon: 'fail',
        duration: 600,
      })
    }
  },


  registerTap: function () {

    let checkPhone = app.checkPhone(this.data.phone);
    let passwordLength = this.data.password.length;
    let usernameLength = this.data.username.length;

    if (usernameLength < app.globalData.username.minLength 
      || usernameLength > app.globalData.username.maxLength) {
      wx.showToast({
        title: '用户名格式不正确',
        icon: 'fail',
        duration: 600,
      })
      return;
    }

    if (passwordLength < app.globalData.password.minLength 
      || passwordLength > app.globalData.password.maxLength) {
      wx.showToast({
        title: '密码格式不正确',
        icon: 'fail',
        duration: 600,
      })
      return;
    }
    if (this.data.password !== this.data.passwordConfirm) {
      wx.showToast({
        title: '密码不相同',
        icon: 'fail',
        duration: 600,
      })
      return;
    }

    if (!checkPhone) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'fail',
        duration: 600,
      })
      return;
    };

    if (this.data.codeVerify.length !== app.globalData.codeVerify.length) {
      wx.showToast({
        title: '验证码格式不正确',
        icon: 'fail',
        duration: 600,
      })
      return;
    };

    wx.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 600,
    })
    return;


  },

  formSubmit: function (event) {
  
    let checkPhone = app.checkPhone(this.data.phone);
    let passwordLength = this.data.password.length;
    let usernameLength = this.data.username.length;

    if (usernameLength < app.globalData.username.minLength 
      || usernameLength > app.globalData.username.maxLength) {
      wx.showToast({
        title: '用户名格式不正确',
        icon: 'fail',
        duration: 600,
      })
      return;
    }

    if (passwordLength < app.globalData.password.minLength 
      || passwordLength > app.globalData.password.maxLength) {
      wx.showToast({
        title: '密码格式不正确',
        icon: 'fail',
        duration: 600,
      })
      return;
    }
    if (this.data.password !== this.data.passwordConfirm) {
      wx.showToast({
        title: '密码不相同',
        icon: 'fail',
        duration: 600,
      })
      return;
    }

    if (!checkPhone) {
      wx.showToast({
        title: '手机号不正确',
        icon: 'fail',
        duration: 600,
      })
      return;
    };

    if (this.data.codeVerify.length !== app.globalData.codeVerify.length) {
      wx.showToast({
        title: '验证码格式不正确',
        icon: 'fail',
        duration: 600,
      })
      return;
    };

    const newItem = {
      username: this.data.username,
      password: this.data.password,
      passwordConfirm: this.data.passwordConfirm,
      phone: this.data.phone,
      codeVerify: this.data.codeVerify,
    };
    // const itemArr = [...this.data.items, newItem];
    // wx.setStorageSync('items', itemArr);
    // this.setData({ items: itemArr });
    
    /**
     * 远程数据请求
     * 
     */
    wx.request({
      url: app.globalData.serverHost + '/index/user/register',
      method: "POST",
      data: newItem,
      success(res) {
        
        if (res.data.code !== app.globalData.code.success) {
          wx.showToast({
            title: res.data.message,
            icon: "fail",
          })
        } else {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 600,
            success: function () {
              wx.navigateTo({
                url: '/pages/index/login',
              })
            }
          })
        }
      }
    });

    return;
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const itemArr = wx.getStorageSync('items') || []; 
    this.setData({ items: itemArr });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})