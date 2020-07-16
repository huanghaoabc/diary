// pages/myList/myList.js
const app = getApp()
const util = require('../../utils/util.js');
import { $wuxToptips } from '../../dist/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: []
  },

  toDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../myListDetail/myListDetail?id=${id}`,
    })
  },

  getMyBug() {
    let db = wx.cloud.database();
    let that = this;
    db.collection('bug').where({
      _openid: wx.getStorageSync('openid'),
    })
    .get({
      success: function (res) {
        let arr = res.data.reverse();
        that.setData({
          listArr: arr
        })
        var timer = null;
        timer = setTimeout(function () {
          wx.stopPullDownRefresh();
          wx.hideLoading();
          clearTimeout(timer);
        }, 500)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
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
    this.getMyBug();
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
    wx.showLoading({
      title: '正在加载',
    })
    this.getMyBug();
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