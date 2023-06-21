
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 10,
    disabled: true,
    threshold: 0,
    rule: 'up',
    items: [
      { name: 'up', value: '温度上限', checked: 'ture' },
      { name: 'down', value: '温度下限' },
    ]
  },

  radioChange: function (e) {
    //保存报警规则到当前页面的数据
    if (e.detail.value != "") {
      this.setData({
        rule: e.detail.value
      })
    }
    console.log(this.data.rule)
  },

  send: function () {

    var theBaiDuAPPkey = "hkPSzoBHqE14KNh0S6t7OnX60KmTpb5h" //百度的AK, 此处要替换为你自己的APPKey

    //调用百度天气API
    wx.request({
      url: 'https://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=' + theBaiDuAPPkey, //百度天气API

      success: (res) => {
        console.log(`APPKey: ${theBaiDuAPPkey}`, res.data)
        // 利用正则字符串从百度天气API的返回数据中截出今天的温度数据
        try {
          var str = res.data.results[0].weather_data[0].date;
          var tmp1 = str.match(/实时.+/);
          var tmp2 = tmp1[0].substring(3, tmp1[0].length - 2);
          var tmp = +tmp2;
        } catch (e) {
          throw new Error(e)
        }

        //温度高于设置的门限值
        if (tmp > this.data.threshold) {
          if (this.data.rule == "up") {
            //规则为高于门限报警，于是报警
            wx.showModal({
              title: '温馨小贴士！',
              content: `不用穿太厚哦，当前温度${tmp}度,高于设定值${this.data.threshold}`
            })
          }
          //规则为低于门限报警，于是不报警
          else if (this.data.rule == "down") {
            wx.showModal({
              title: '今日freestyle～',
              content: `记得穿衣适度哦，当前温度${tmp}度,温度处于正常范围`
            })
          }
        }
        //温度低于设置的门限值
        else if (tmp <= this.data.threshold) {
          //规则为高于门限报警，于是不报警
          if (this.data.rule == "up") {
            wx.showModal({
              title: '今日freestyle～',
              content: `记得穿衣适度哦，当前温度${tmp}度,温度处于正常范围`
            })
          }
          //规则为低于门限报警，于是报警
          else if (this.data.rule == "down") {
            wx.showModal({
              title: '小可爱注意哦！',
              content: `记得加衣服哦，当前温度${tmp}度, 低于设定值${this.data.threshold}`
            })
          }
        }
      },

      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },

  change: function (e) {
    //当有输入时激活发送按钮，无输入则禁用按钮
    if (e.detail.value != "") {
      this.setData({
        threshold: e.detail.value,
        opacity: 1,
        disabled: false,
      })
    } else {
      this.setData({
        threshold: 0,
        opacity: 0.4,
        disabled: true,
      })
    }
  }
})