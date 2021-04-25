// pages/index/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginDisabled: true,
    usernameInput: "",
    passwordInput: "",

  },

  usernameInput: function (event) {
    let usernameInput = event.detail.value;
    if (usernameInput !== "") {
      this.data.usernameInput = usernameInput;
      if (this.data.passwordInput !== "") {
        this.setData({
          loginDisabled: false
        });
      }
    } else {
      this.setData({
        loginDisabled: true
      });
    }
    console.log(usernameInput);
  },

  passwordInput: function (event) {
    let passwordInput = event.detail.value;
    if (passwordInput !== "") {
      this.data.passwordInput = passwordInput;
      if (this.data.usernameInput !== "") {
        this.setData({
          loginDisabled: false
        });
      }
    } else {
      this.setData({
        loginDisabled: true
      });
    }
  },

  
  loginTap: function () {
    // 从本地缓存中获取用户信息，如果没有则设置为空数组
    let users = wx.getStorageSync('users') || [];
    users = [
      {
        username: "Jordan",
        password: "111111"
      },
      {
        username: "Kobe",
        password: "111111"
      },
      {
        username: "Iverson",
        password: "111111"
      },
    ];

    let userinfo = users.find(item => {
      return item.username === this.data.usernameInput && 
      item.password === this.data.passwordInput
    });

    if (!userinfo) {
      wx.showToast({
        title: '该用户名或者密码不存在',
        icon: 'fail',
        duration: 2000
      })
      return;
    }

    wx.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 2000,
      success: function () {
        wx.navigateTo({
          url: '/pages/index/register'
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录页面',
    })
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