Page({
  /**
   * 页面的初始数据
   */
  data: {
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['稻谷', '大米', '稻米副产品',  '小麦', '小麦副产品', 
                  '玉米', '玉米副产品', '大豆', '大豆副产品', 
                  '杂粮', '杂粮副产品'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
  },

  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Indexs)
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows
    });
  },


})