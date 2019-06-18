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
    doctorNum: '417',

    // 科室导航
    depNav: [{
      departmentId: "000001",
        departmentName: "妇科",
        onlineDoctorCount: "16",
        deptIcon: "../../images/dep-fuke.png"
      },
      {
        departmentId: "000002",
        departmentName: "肿瘤科",
        onlineDoctorCount: "22",
        deptIcon: "../../images/dep-zhongliuke.png"
      },
      {
        departmentId: "000003",
        departmentName: "全科快速咨询",
        onlineDoctorCount: "51",
        deptIcon: "../../images/dep.png"
      },
      {
        departmentId: "000004",
        departmentName: "泌尿科",
        onlineDoctorCount: "12",
        deptIcon: "../../images/dep-miniaoke.png"
      },
      {
        departmentId: "000005",
        departmentName: "心内科",
        onlineDoctorCount: "12",
        deptIcon: "../../images/dep-neike.png"
      },
      {
        departmentId: "000006",
        departmentName: "儿科",
        onlineDoctorCount: "12",
        deptIcon: "../../images/dep-erke.png"
      },
      {
        departmentId: "000007",
        departmentName: "护理咨询",
        onlineDoctorCount: "12",
        deptIcon: "../../images/dep-naoke.png"
      },
      {
        departmentId: "000008",
        departmentName: "互联网三江分院",
        onlineDoctorCount: "12",
        deptIcon: "../../images/dep-miniaoke.png"
      },
      {
        departmentId: "000009",
        departmentName: "肾内科",
        onlineDoctorCount: "16",
        deptIcon: "../../images/dep-fuke.png"
      },
      {
        departmentId: "000010",
        departmentName: "创伤中心",
        onlineDoctorCount: "2",
        deptIcon: "../../images/dep-zhongliuke.png"
      },
      {
        departmentId: "000011",
        departmentName: "肝胆+甲状腺外科",
        onlineDoctorCount: "55",
        deptIcon: "../../images/dep.png"
      },
      {
        departmentId: "000012",
        departmentName: "产科",
        onlineDoctorCount: "87",
        deptIcon: "../../images/dep-miniaoke.png"
      },
      {
        departmentId: "000013",
        departmentName: "脊柱科",
        onlineDoctorCount: "23",
        deptIcon: "../../images/dep-neike.png"
      },
      {
        departmentId: "000014",
        departmentName: "乳腺外科",
        onlineDoctorCount: "86",
        deptIcon: "../../images/dep-erke.png"
      },
      {
        departmentId: "000015",
        departmentName: "风湿免疫科",
        onlineDoctorCount: "2",
        deptIcon: "../../images/dep-naoke.png"
      }
    ],

  },
  //事件处理函数
  DoctorNum: function () {
    var that = this;
    wx.request({
      url: 'http://yapi.demo.qunar.com/mock/72080/doctor/onlineDoctorNum',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log('success');
        console.log(res.data);
        // that.setData({ doctorNum: res.data.doctorNum });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onLoad: function() {

    this.DoctorNum();

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
  }
})