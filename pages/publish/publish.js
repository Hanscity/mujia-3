let app = getApp();
Page({
  data: {
   
    buyCellType: 1,
    brand: "",
    unitPrice: "",
    num: "",
    tradeArea: "",
    specification: "",
    
    /**
     * 品牌资料（一些限制情况)
     */
    brandProfile: {
      minLength: 1,
      maxLength: 64
    },

    /**
     * 交货地资料（一些限制情况)
     */
    tradeAreaProfile: {
      minLength: 2,
      maxLength: 108
    },

    /**
     * 规格资料（一些限制情况)
     */
    specificationProfile: {
      minLength: 0,
      maxLength: 256
    },

    /**
     * 农贸品类（下拉框）
     */
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
    selectDatasLength: 0, // 下拉框对象数据的长度

  },

  /**
   * @comment 操作类型： 买或者卖
   * @param {} event 
   */
  buycelltypeChange: function (event) {
    let buyCellType = event.detail.value;
    this.setData({
      buyCellType: buyCellType
    })
  },

  brandBlur: function (event) {
    let brand = event.detail.value;
    let brandLength = brand.length;
    if ( brandLength > this.data.brandProfile.maxLength || 
      brandLength < this.data.brandProfile.minLength) {
      wx.showToast({
        title: '品牌字符不符合',
        icon: 'none'
      })
      return;
    }
    this.setData({
      brand: brand
    })
  },

  unitPriceBlur: function (event) {
    let unitPrice = event.detail.value;
    let boolPositive = app.judgePositiveInt(unitPrice);
    
    if ( !boolPositive ) {
      wx.showToast({
        title: '请填写合理的单价数字',
        icon: 'none'
      })
      return;
    }
    this.setData({
      unitPrice: unitPrice
    })
  },

  numBlur: function (event) {
    let num = event.detail.value;
    let boolPositive = app.judgePositiveInt(num);
    
    if ( !boolPositive ) {
      wx.showToast({
        title: '请填写合理的数量数字',
        icon: 'none'
      })
      return;
    }
    this.setData({
      num: num
    })
  },

  tradeAreaBlur: function (event) {
    let tradeArea = event.detail.value;
    let tradeAreaLength = tradeArea.length;
    if ( tradeAreaLength > this.data.tradeAreaProfile.maxLength || 
      tradeAreaLength < this.data.tradeAreaProfile.minLength) {
      wx.showToast({
        title: '交货地字符不符合',
        icon: 'none'
      })
      return;
    }
    this.setData({
      tradeArea: tradeArea
    })
  },

  specificationBlur: function (event) {
    let specification = event.detail.value;
    let specificationLength = specification.length;
    if ( specificationLength > this.data.specificationProfile.maxLength ) {
      wx.showToast({
        title: '规格字符超出',
        icon: 'none'
      })
      return;
    }
    this.setData({
      specification: specification
    })
  },

  /**
   * 
   * 开始提交
   */
  marketPublishTap: function (event) {

    let agriProduct = this.data.indexs; // 农贸品类下拉框
    let buyCellType = this.data.buyCellType;
    let brand = this.data.brand;
    let brandLength = brand.length;
    let unitPrice = this.data.unitPrice;
    let boolPositiveUnitPrice = app.judgePositiveInt(unitPrice);
    let num = this.data.num;
    let boolPositiveNum = app.judgePositiveInt(num);
    let tradeArea = this.data.tradeArea;
    let tradeAreaLength = tradeArea.length;
    let specification = this.data.specification;
    let specificationLength = specification.length;

    if ( brandLength > this.data.brandProfile.maxLength || 
      brandLength < this.data.brandProfile.minLength) {
      wx.showToast({
        title: '品牌字符不符合',
        icon: 'none'
      })
      return;
    }

    if ( !boolPositiveUnitPrice ) {
      wx.showToast({
        title: '请填写合理的单价数字',
        icon: 'none'
      })
      return;
    }
    
    if ( !boolPositiveNum ) {
      wx.showToast({
        title: '请填写合理的数量数字',
        icon: 'none'
      })
      return;
    }

    if ( tradeAreaLength > this.data.tradeAreaProfile.maxLength || 
      tradeAreaLength < this.data.tradeAreaProfile.minLength) {
      wx.showToast({
        title: '交货地字符不符合',
        icon: 'none'
      })
      return;
    }
    
    if ( specificationLength > this.data.specificationProfile.maxLength ) {
      wx.showToast({
        title: '规格字符超出',
        icon: 'none'
      })
      return;
    }
    
    /**
     * 远程数据请求
     * 
     */
    const newItem = {
      agri_product: agriProduct,
      buy_cell_type: buyCellType,
      brand: brand,
      unit_price: unitPrice,
      num: num,
      trade_area: tradeArea,
      specification: specification
    };

    wx.request({
      url: app.globalData.serverHost + '/index/market/add',
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
              wx.switchTab({
                url: '/pages/market/market',
              })
            }
          })
        }
      }
    });

    return;
  },

  /**
   * 农贸品类（下拉框）
   */
  
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

  formReset: function () {
    console.log('form发生了reset事件')
  }


})
