// pages/consultInfo/consultInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 医生详情数据
    doctorDetail: '',

    // 描述信息
    placeholder: "在此详细描述当前的症状，病情发展过程，以及您希望得到的帮助。如果有既往病史、手术史、药物过敏等信息，请一并提供。",
    textMaxLength: 500,
    writeLength: 0,
    isShowMask: true,
    content: '',

    //图片上传
    files: [],

    // 条款确认
    isClause: true,
    clauseIcon: '',

    // 是否第一次进去 显示提示弹出层
    isOneShowModel: false,

    // 选择就诊卡弹出层是否显示
    isShowHospitalCardModel: false,

  },

  /**
   * 自定义事件
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

  // 字数输入
  bindText(e) {
    console.log('***** 字数输入 *****')
    var that = this;
    var len = e.detail.value.length;
    var cont = e.detail.value;
    that.setData({
      writeLength: len,
      content: cont
    })
  },

  // 图片上传
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      },
      fail: function(){
        console.log('***** 图片上传错误 *****')
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  // 同意协议
  isClause(){
    var that = this;
    that.setData({
      isClause: !that.data.isClause
    })
  },

  // 用户协议弹出层
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      isShowMask: false,
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
      isShowMask: true,
    })
  },

  // 第一次进入 弹出层隐藏
  oneModelHide(){
    var that = this;
    that.setData({
      isOneShowModel: !that.data.isOneShowModel
    })
  },

  // 选择就诊卡
  showHospitalCardModel(){
    console.log('***** 显示就诊卡弹出层  *****');
    var that = this;
    that.setData({
      isShowHospitalCardModel: true
    })
  },
  hideHospitalCardModel(){
    console.log('***** 隐藏就诊卡弹出层  *****');
    var that = this;
    that.setData({
      isShowHospitalCardModel: !that.data.isShowHospitalCardModel
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