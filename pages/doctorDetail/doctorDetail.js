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
    doctorDetail: {
      "doctorId": "324223",
      "doctorName": "陈恩德",
      "doctorIcon": "../../images/head1.jpg",
      "deptId": "111",
      "doctorLevel": "主治医师",
      "doctorSkill": "妇产科常见病、多发病的诊治,计划生育及流产后关爱,妇科内分泌疾病的诊治。",
      "hospitalName": "柳州市工人医院",
      "deptName": "妇科",
      "qrCodeImg": " http://www.baidu.com",// 二维码
      "consultationNum": 88, //咨询数
      "collectionNum": 10,  // 收藏数
      "isCollection": "0",//备注：是否收藏，0-为收藏，1-收藏
      "onlineState": "0",//备注：是否在线，0-在线，1-离线
      "responseRate": "100%",
      "doctorIntroduction": "2015年毕业于广西医科大学临床医学专业，有扎实理论基础，熟练掌握妇科常见病、多发病的诊治以及计生常见手术。",
      "consulOrder": {
        "openId": "324223",
        "doctorId": "324223",
        "startConsulTime": "2019-06-15 0:58:32",
        "endConsulTime": "2019-06-14 19:58:32",
        "remainingHours": "6",//备注：离咨询结束剩余小时
      },
    }

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.evaluateList(); // 游客评论接口
    this.isCollection(); // 收藏接口

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