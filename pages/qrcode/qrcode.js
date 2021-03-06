// pages/main/index.js
var QR = require("../../utils/qrcode.js");
Page({
  data: {
    canvasHidden: false,
    maskHidden: true,
    imagePath: '',
    placeholder: 'https://www.baidu.com',//默认二维码生成文本
    canvasObj: {
      width: 600,
      height: 600
    },
    // 医生详情数据
    doctorDetail: '',
  },

/**
 * 自定义事件函数
 */
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

  onLoad: function (options) {

    wx.showLoading({
      title: '数据加载中',
    })

    // 页面初始化 options为页面跳转所带来的参数
    var size = this.setCanvasSize();//动态设置画布大小
    var initUrl = this.data.placeholder;
    this.createQrCode(initUrl, "mycanvas", size.w, size.h);

    this.doctorDetail(); // 医生详情接口

    wx.hideLoading();

  },
  onReady: function () {

  },
  onShow: function () {

    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭

  },
  //适配不同屏幕大小的canvas
  setCanvasSize: function () {
    var that = this;
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / that.data.canvasObj.width;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => { this.canvasToTempImage(); }, 1000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(res);
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
          // canvasHidden:true
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath;
    console.log(img);
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  // formSubmit: function (e) {
  //   var that = this;
  //   var url = e.detail.value.url;
  //   that.setData({
  //     maskHidden: false,
  //   });
  //   wx.showToast({
  //     title: '生成中...',
  //     icon: 'loading',
  //     duration: 2000
  //   });
  //   var st = setTimeout(function () {
  //     wx.hideToast()
  //     var size = that.setCanvasSize();
  //     //绘制二维码
  //     that.createQrCode(url, "mycanvas", size.w, size.h);
  //     that.setData({
  //       maskHidden: true
  //     });
  //     clearTimeout(st);
  //   }, 2000)

  // }

})