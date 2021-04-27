let app = getApp();
Page({
  data: {
   
    agriProduct: 1,
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

  },

  productSelect: function (event) {
    
    let agriProduct = event.detail.value;
    this.setData({
      agriProduct: agriProduct
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

    let agriProduct = this.data.agriProduct;
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
      brand: brand,
      unit_price: unitPrice,
      num: num,
      trade_area: tradeArea,
      specification: specification
    };
    console.log(newItem);
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



  formReset: function () {
    console.log('form发生了reset事件')
  }
})