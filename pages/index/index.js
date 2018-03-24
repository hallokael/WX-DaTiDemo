var Rmode=1
Page({
  data: {
    mode:1,
    modemsg:'单人模式',
    Title:{
    Question:'Question1',
    Answer1: 'Answer1',
    Answer2: 'Answer2',
    Answer3: 'Answer3',
    Answer4: 'Answer4',
    Right:0,
    },
    Ans:'1',
    WaitNumber:0,
  },
  //事件处理函数
  bindViewTap1: function() {
    this.setData({ Ans: '1' })
    this.TitleReq()
  },
  bindViewTap2: function () {
    this.setData({ Ans: '2' })
    this.TitleReq()
  },
  bindViewTap3: function () {
    this.setData({ Ans: '3' })
    this.TitleReq()
  },
  bindViewTap4: function () {
    this.setData({ Ans: '4' })
    this.TitleReq()
  },
  ModeChange: function(){
    var that=this
    if (Rmode==1){
      Rmode=2
      this.setData({
        mode:2,
        modemsg:'双人模式',
      })
      that.PlusWait()
    }else{
      Rmode=1
      this.setData({
        mode: 1,
        modemsg:'单人模式',
      })
    }

  },
  TitleReq: function(){
    var that = this
    wx.request({
      url: 'http://xkad.shop:8000/polls/',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        console.log('111')
        that.setData({ 
          Title:{
            Question:res.data.Question,
            Answer1:res.data.Answer1,
            Answer2:res.data.Answer2,
            Answer3:res.data.Answer3,
            Answer4:res.data.Answer4,
            Right:res.data.Right,
          }
         })
      }
    })
  },
  GetWaitNumber:function(){
    var that = this
    wx.request({
      url: 'http://xkad.shop:8000/WaitNumber/',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        console.log('222')
        that.setData({
          Title: {
            WaitNumber: res.data.WaitNumber,
          }
        })
      }
    })    
  },
  PlusWait:function(){
    wx.request({
      url: 'http://xkad.shop:8000/WaitNumber/Plus',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
      }
    })     
  },
  onLoad: function () {
    // this.update()
    var that=this
    var id = setInterval(function () {
      //定时执行的代码
      that.GetWaitNumber()
      // clearInterval(id);//关闭定时器
    }, 2000);
  },

  update:function(){
    // this.GetWaitNumber()
    // console.log(x,y)
    var that = this
    setTimeout(function () {
     // console.log("asd")
      that.update();
    }, 1500);
  },
})
