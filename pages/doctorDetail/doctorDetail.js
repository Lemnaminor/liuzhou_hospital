// pages/doctorDetail/doctorDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 描述文本行高
    lineText: '展开',
    lineIcon: 'unfold',
    lineNum: 2,
    isShowLine: false,

    // 游客评价数据
    evaluateList: [],

    // 收藏
    isCollection: '0', // 备注：是否收藏，0-已收藏，1-收藏
    collectionIcon: '',
    collectionName: '',

    // 医生详情数据
    doctorDetail: '',

    // 是否开始咨询
    isConsult: false,

    // 在线-图片咨询文本内容
    onlineText: '当前医生在线，可以随时发起咨询。',

  },

  /**
   * 事件处理
   */
  // 显示隐藏文字
  showLine:function(){
    var that = this;
    if(that.data.isShowLine == false){
      that.setData({ lineNum: 99, lineText: '收起', lineIcon: 'fold', isShowLine: true, });
    }else{
      that.setData({ lineNum: 2, lineText: '展开', lineIcon: 'unfold', isShowLine: false, });
    }
  },

  // 医生详情接口
  doctorDetail: function () {
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d09a09ce9fb5077ed6eb899/api/doctor/detail',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log('***** 医生详情接口调用 *****');
        console.log(res);
        that.setData({
          doctorDetail: res.data
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

  // 开始咨询方法
  consultStart:function(){
    console.log('***** 开始咨询方法 *****');
    var that = this;
    that.setData({
      isConsult: true,
      onlineText: '您的订单已经建立，可以继续咨询。'
    })

    console.log('***** 跳转咨询信息页面 *****')
    wx.navigateTo({
      url: '/pages/consultInfo/consultInfo',
    })

  },

  // 游客评价接口
  evaluateList:function(){
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d09a09ce9fb5077ed6eb899/api/doctor/evaluateList',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log("***** 游客评价接口 *****")
        console.log(res.data);
        that.setData({
          evaluateList: res.data
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

  // 收藏接口
  isCollection:function(){
    console.log("***** 收藏接口 *****")
    var that = this;

    if(that.data.doctorDetail.isCollection == '0'){
      that.setData({
        collectionIcon: 'favorfill',
        collectionName: '已收藏',
        isCollection: '1',
      })
    }else{
      that.setData({
        collectionIcon: 'favor',
        collectionName: '收藏',
        isCollection: '0',
      })
    }
  },

  // 改变收藏状态
  changeCollection:function(){
    console.log("***** 改变收藏状态 *****")
    var that = this;
    if (that.data.isCollection == '0') {
      that.setData({
        collectionIcon: 'favorfill',
        collectionName: '已收藏',
        isCollection: '1',
      })
    } else {
      that.setData({
        collectionIcon: 'favor',
        collectionName: '收藏',
        isCollection: '0',
      })
    }
  },

  // 跳转二维码页面
  toQrcode(){
    console.log('***** 跳转二维码页面 *****');
    wx.navigateTo({
      url: '/pages/qrcode/qrcode',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '数据加载中',
    })

    this.doctorDetail(); // 医生详情接口
    this.evaluateList(); // 游客评论接口
    this.isCollection(); // 收藏接口

    wx.hideLoading();

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
    this.evaluateList(); // 游客评价接口
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
      url: 'https://www.easy-mock.com/mock/5d09a09ce9fb5077ed6eb899/api/doctor/evaluateList',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log("***** 游客评价接口 *****")
        console.log(res.data);
        that.setData({
          evaluateList: that.data.evaluateList.concat(res.data)
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
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