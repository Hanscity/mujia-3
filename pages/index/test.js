//index.js
Page({
  // 页面的初始数据
  data: {
    isShowUserName: false,
    userInfo: null,
  },

  
  getUserProfile: function(e) {
    wx.getUserProfile({
      /**
       * parameter error: parameter.desc should be String instead of Undefined;
       * 简而言之，就是 desc 属性必不可少
       */
      desc: '用于完善会员资料',
      success: (res) => {
        console.log("获取用户信息成功", res);
        let user = res.userInfo;
        // wx.setStorageSync('user', user);
        this.setData({
          isShowUserName: true,
          userInfo: user,
        })
      },
      fail: res => {
        console.log("获取用户信息失败", res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow(options) {
  //   this.getUserProfile();
  //   let user = wx.getStorageSync('user');
  //   if (user && user.nickname) {
  //     this.setData({
  //       isShowUserName: true,
  //       userInfo: user,
  //     })
  //   }
  // },

  
})