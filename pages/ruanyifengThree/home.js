Page({
  data: {
    name: "Michael Jordan",
    age: 30,
    country: "American"
  },
  buttonHandler(event) {
    this.setData({
      name: 'Kobe'
    });
  }
});