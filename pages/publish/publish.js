let app = getApp();
Page({
  data: {
    isSubmit: false,
    /*
      warn ? warn : "--agri_products--" + agri_products 
    + "--brade--" + brade + "--unit_price--" + unit_price 
    + "--num--" + num + "--trade_area--" +trade_area + "--spencifications--" + spencifications
    */
    warn: "",
    
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let { agri_products, brand, unit_price, num, trade_area,            spencifications } = e.detail.value;
    
    if (!agri_products) {
      this.setData({
        warn: "请填写农贸品类哦~",
        isSubmit: true
      })
      return;
    }

    if (!brand) {
      console.log(brand);
      this.setData({
        warn: "请填写有效的品牌信息哦~",
        isSubmit: true
      })
      return;
    }
    if (!unit_price) {
      console.log(unit_price);
      this.setData({
        warn: "请填写有效的单价信息哦~",
        isSubmit: true
      })
      return;
    }

    if (!num) {
      this.setData({
        warn: "请填写有效的数量信息哦~",
        isSubmit: true
      })
      return;
    }

    if (!trade_area) {
      this.setData({
        warn: "请填写有效的交货地信息哦~",
        isSubmit: true
      })
      return;
    }

    if (!spencifications) {
      this.setData({
        warn: "请填写有效的产品规格信息哦~",
        isSubmit: true
      })
      return;
    }

    this.setData({
      warn: "",
      isSubmit: true,
      agri_products,
      brand,
      unit_price,
      num,
      trade_area,
      spencifications
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})