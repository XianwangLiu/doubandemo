// pages/comment/comment.js
import {network} from "../../utils/network.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    var that = this;
    that.setData(options);
    that.getComments(1);

  },
  getComments: function(start){

    var that = this;
    var type = that.data.type;
    var id = that.data.id;
    console.log(start + "getComments");
    console.log(that.data.start + "getComments.data.start");
    if (start > that.data.start){
      that.setData({
        nextLoading: true
      });

    } else {
      that.setData({
        preLoading: true
      });

    }
    network.getItemComments({
      type: type,
      id: id,
      start: start,
      count: 20,
      success: function (data) {
        // console.log(data);
        var count = data.count;
        var total = data.total;
        var comments = data.interests;
        console.log(comments);
        that.setData({
          total: total,
          comments: comments,
          start: start,
          count: count,
          preLoading:false,
          nextLoading: false
        });
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }
    });
  },

  onItemTapEvent: function(event) {
    wx.navigateBack({});
  },

  onPrePageTap: function(event) {
    var that = this;
    var oldStart = that.data.start;
    if (oldStart > that.data.count){
      var start = oldStart - that.data.count;    
    } else {
      var start = oldStart;
    }
    that.getComments(start);
  },

  onNextPageTap: function() {
    var that = this;
    var oldStart = that.data.start;
    console.log(oldStart + "NextPageoldStart");
    console.log(that.data.count);
    var start = oldStart + that.data.count;
    console.log(start + "NextPage");
    that.getComments(start);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})