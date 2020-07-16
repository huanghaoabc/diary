Page({

  /**
   * 页面的初始数据
   */
  data: {
    levelArr: ['普通', '一般', '重要', '很重要', '非常重要'], 
    planArr: [
      {
        
      }
    ]
  },
  getPlan() {
    wx.showLoading({
      title: '正在加载',
    })
    let db = wx.cloud.database();
    let that = this;
    db.collection('users').where({
      _openid: wx.getStorageSync('openid'),
    })
      .get({
        success: function (res) {
          let arr = JSON.parse(JSON.stringify(res.data[0].plan));
          console.log(arr)

          for(var i=0; i<arr.length; i++) {
            let arrs = arr[i].date1.split(',');
            arr[i].date1 = `${arrs[0]}-${arrs[1]}-${arrs[2]}`
          }
          console.log(arr)

          that.setData({
            planArr: arr
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
  delPlan(e){
    let that = this;
    let id = e.currentTarget.dataset.index
    let openid = wx.getStorageSync('openid');
    //var planArr = JSON.parse(JSON.stringify(that.data.planArr));
    var planArr = that.data.planArr
    
    wx.showModal({
      title: '是否删除',
      content: '删除后不可恢复',
      success(res) {
        if (res.confirm) {
          planArr.splice(id, 1);
          for (var i = 0; i < planArr.length; i++) {
            let arrs = planArr[i].date1.split('-');
            planArr[i].date1 = `${arrs[0]},${arrs[1]},${arrs[2]}`
          }
          let db = wx.cloud.database();
          db.collection('users').where({
             _openid: openid
           }).update({
            data: {
              plan:planArr
            },
            success(res) {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000,
                
              });
              
            },
            complete(){
              console.log("complete")
             
            }
          });
          
        } else {
          //none
        }
        that.getPlan()
      }
    })

    
  },

  addPlan() {
    wx.navigateTo({
      url: '../addPlan/addPlan',
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
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPlan()
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
    this.getPlan()
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