// pages/departList/departList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 科室列表数据
    departList: [],

    //loading
    isLoading: false,

  },
  /**
   * 页面事件函数
   */
  // 科室列表接口
  departList:function(){
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d09a09ce9fb5077ed6eb899/api/department/selected',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log('***** 科室列表接口调用成功 *****');
        console.log(res.data);
        that.setData({
          departList: res.data
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  // 跳转医生详情页面
  toDoctorDetail:function(){
    console.log("***** 跳转医生详情页面 *****");
    wx.navigateTo({
      url: '/pages/doctorDetail/doctorDetail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showLoading({
      title: '数据加载中',
      duration: 1000
    })
    this.departList();
    wx.showToast({
      title: '数据已加载',
      icon: 'success',
      duration: 1500
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

    console.log('下拉刷新');

    wx.showLoading({
      title: '数据加载中',
      duration: 1000
    })
    this.departList();
    wx.showToast({
      title: '数据已刷新',
      icon: 'success',
      duration: 1500
    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    console.log("上拉触底");
    var that = this;
    that.setData({ isLoading: true });
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d09a09ce9fb5077ed6eb899/api/department/selected',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log('*****查看科室在线医生调用成功*****');
        console.log(res);
        that.setData({ departList: that.data.departList.concat(res.data) });
      },
      fail: function () {

      }
    })
    that.setData({ isLoading: false });
    wx.hideNavigationBarLoading();


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})