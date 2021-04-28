Page({
  /**
   * 页面的初始数据
   */
  data: {
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: {
      1: '稻谷',
      2: '大米',
      3: '稻米副产品',
      101: '小麦',
      102: '小麦副产品',
      201: '玉米',
      202: '玉米副产品',
      301: '大豆',
      302: '大豆副产品',
      401: '杂粮',
      402: '杂粮副产品'
  }, //下拉列表的数据
    indexs: 1, //选择的下拉列 表下标,
    selectDatasLength: 0,

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let selectDatasLength = Object.getOwnPropertyNames(this.data.selectDatas).length;

    this.setData({
      selectDatasLength: selectDatasLength
    })
  },
  
})