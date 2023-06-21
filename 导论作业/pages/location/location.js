Page({

  /**
   * 页面的初始数据
   */
  data: {
    jingdu: "",
    weidu: "",
    dizhi: "",
    mingcheng: "",//输入框初始数据为空
  },
  //选择位置
  xuanzeweizhi: function (e) {
    var that = this
    wx.chooseLocation({//调用api
      success: function (res) {
        console.log(res)
        that.setData({
          mingcheng: res.address,
        })
      },
      fail: function () {

      },
      compelte: function () {
      }
    })
  },
  //获得位置
  huodeweizhi: function () {
    var that = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          jingdu: res.longitude,
          weidu: res.latitude
        })
      },
    })
  },
  //查看位置
  chakanweizhi: function (e) {
    wx.openLocation({
      latitude: Number(e.detail.value.weidu),
      longitude: Number(e.detail.value.jingdu)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },
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