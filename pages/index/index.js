//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

    //搜索框
    colorSearchBar: {
      inputShowed: false,
      inputVal: ""
    },

    //广告位
    indicatorDots: true,
    indicatorActiveColor: "#00d8a0",
    autoplay: true,
    interval: 5000,
    duration: 600,
    circular: true,
    imgUrls: [
      '../../images/banner1.png',
      '../../images/banner1.png',
      '../../images/banner1.png',
      '../../images/banner1.png',
    ],

    // 在线医生数
    doctorNum: '',

    // 科室导航
    depNav: [],
    isDepMore: false,
    depText: '展开更多',
    depIconName: 'unfold',

    // 查看科室在线医生
    doctorOnlineList: [],

    //loading
    isLoading: false,

  },
  //事件处理函数
  // 获取在线医生数接口
  DoctorNum: function() {
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d09a09ce9fb5077ed6eb899/api/doctor/onlineDoctorNum',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res) {
        console.log('*****获取在线医生数接口调用成功*****');
        console.log(res.data);
        that.setData({
          doctorNum: res.data.doctorNum
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  // 获取科室列表接口
  depList: function() {
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d09a09ce9fb5077ed6eb899/api/department/list',
      data: {},
      method: 'GET',
      success: function(res) {
        console.log('*****获取科室列表接口调用成功*****');
        console.log(res.data);
        that.setData({
          depNav: res.data.slice(0, 6)
        });
      },
      fail: function() {

      }
    })
  },

  depListMore: function() {
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d09a09ce9fb5077ed6eb899/api/department/list',
      data: {},
      method: 'GET',
      success: function(res) {
        console.log('*****获取科室列表接口调用成功*****');
        console.log(res.data);
        that.setData({
          depNav: res.data
        });
      },
      fail: function() {

      }
    })
  },

  // 查看更多科室方法
  depMoreList: function() {
    console.log('***** 查看更多科室方法 *****');
    var that = this;

    if (that.data.isDepMore == false) {
      that.setData({
        depText: "收起"
      });
      that.setData({
        depIconName: "fold"
      });
      that.setData({
        isDepMore: true
      });
      that.depListMore();
    } else {
      that.setData({
        depText: "展开更多"
      });
      that.setData({
        depIconName: "unfold"
      });
      that.setData({
        isDepMore: false
      });
      that.depList();
    }

  },

  depMore:function(){
    console.log('下拉刷新');
    wx.showLoading({
      title: '数据加载中',
      duration: 1000
    })
    this.depMoreList();
    wx.showToast({
      title: '已完成',
      icon: 'success',
      duration: 1500
    })
  },

  // 查看科室在线医生
  doctorOnlineList:function(){
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d09a09ce9fb5077ed6eb899/api/doctorOnlineList',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log('*****查看科室在线医生调用成功*****');
        console.log(res);
        that.setData({ doctorOnlineList: res.data});
      },
      fail: function () {

      }
    })
  },

  // 跳转医生列表页面
  toDepartList:function(){
    console.log('***** 跳转科室列表页面 *****')
    wx.navigateTo({
      url: '/pages/departList/departList',
    })
  },

  // 跳转医生详情页面
  toDoctorDetail: function () {
    console.log('***** 跳转医生详情页面 *****')
    // wx.navigateTo({
    //   url: '/pages/doctorList/doctorList',
    // })
  },  

  onLoad: function() {

    wx.showLoading({
      title: '数据加载中',
      duration: 1000
    })

    this.DoctorNum(); // 调用获取医生数接口
    this.depList(); // 调用获取科室列表接口
    this.doctorOnlineList(); // 查看科室在线医生接口

    wx.showToast({
      title: '数据加载完成',
      icon: 'success',
      duration: 1500
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
    this.DoctorNum(); // 调用获取医生数接口
    this.depList(); // 调用获取科室列表接口
    this.doctorOnlineList(); // 查看科室在线医生接口
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
    that.setData({isLoading: true});
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    wx.request({
      url: 'https://www.easy-mock.com/mock/5d09a09ce9fb5077ed6eb899/api/doctorOnlineList',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log('*****查看科室在线医生调用成功*****');
        console.log(res);
        that.setData({ doctorOnlineList: that.data.doctorOnlineList.concat(res.data) });
      },
      fail: function () {

      }
    })
    that.setData({ isLoading: false });
    wx.hideNavigationBarLoading();
    

  },


})