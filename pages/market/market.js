/**
 * 用来获取全局变量 app
 */
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // 取出 storage  中的 token
    let token = wx.getStorageSync('token') || '';


    /**
     * 远程数据请求
     */
    let newItem = {};
    newItem.token = token;
    console.log(newItem);
    wx.request({
      url: app.globalData.serverHost + '/index/market/list',
      method: "POST",
      data: newItem,
      success(res) {
        if (res.data.code !== app.globalData.code.success) {
          wx.showToast({
            title: res.data.message,
            icon: "fail",
          })
        } else {
          let items = res.data.data;
          console.log(items);
          _this.setData({
            items: items
          });
        }
      }
    });
    return;
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
   * 我目前理解为刷新
   */
  onPullDownRefresh: function () {
    let _this = this;
    /**
     * 远程数据请求
     */
    const newItem = {};
    wx.request({
      url: app.globalData.serverHost + '/index/market/list',
      method: "POST",
      data: newItem,
      success(res) {
        if (res.data.code !== app.globalData.code.success) {
          wx.showToast({
            title: res.data.message,
            icon: "fail",
          })
        } else {
          let items = res.data.data;
          _this.setData({
            items: items
          });
        }
      }
    });
    return;
  },

  /**
   * 页面上拉触底事件的处理函数
   * 目前理解为下一页
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})