/**
 * 用来获取全局变量 app
 */
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
  },

  /**
   * 
   * 注册和登录体验的一致性，将事件统一设置为 blur
   */
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

  /**
   * bindsubmit 和 bindtap 来远程提交表单，目前两者差别不大
   * bindtap 似乎更为简单，这里用 bindtap 吧
   */
  loginTap: function () {

    let phone  = this.data.phone;
    let checkPhone = app.checkPhone(phone);
    let password = this.data.password;
    let passwordLength = password.length;

    if (!checkPhone) {
      wx.showToast({
        title: '手机号不正确',
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

    /**
     * 远程数据请求
     * 
     */
    const newItem = {
      phone: this.data.phone,
      password: this.data.password
    };

    wx.request({
      url: app.globalData.serverHost + '/index/user/login',
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
            title: '成功',
            icon: 'success',
            duration: 600,
            success: function () {
              wx.navigateTo({
                url: '/pages/index/registerIndi',
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