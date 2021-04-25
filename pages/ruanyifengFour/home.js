Page({
  data: { name: '' },
  buttonHandler(event) {
    console.log(event.detail.userInfo);
    if (!event.detail.userInfo) return;
    this.setData({
      name: event.detail.userInfo.nickName
    });
  }
});
