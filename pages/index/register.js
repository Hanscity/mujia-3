// pages/index/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registerDisabled: true,
  },

  phoneInput: function (argu) {
    let phoneInput = argu.detail.value;
    /**
     * 判断输入的字符串是否符合号码的格式
     */
    let judgePhone = phoneInput.match(/^1[3-9][0-9]{9}$/)
    if (judgePhone) {
      this.setData({
        registerDisabled: false
      })
    }
  },

  registerTap: function () {
    console.log("register tap..");
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '注册页面',
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