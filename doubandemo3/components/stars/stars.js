// components/stars/stars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rate: {
      type: Number,
      value: 0,
      observer(newVal, oldVal, changedPath) {
        this.updateRate();
      }
    },
    starsize: {
      type: Number,
      value: 26
    },
    fontsize: {
      type: Number,
      value: 26
    },
    fontcolor: {
      type: String,
      value: "#ccc"
    },
    istext: {
      type: Boolean,
      value: true
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateRate: function() {
      var that = this;
      // console.log(that.properties.rate)
      var rate = that.properties.rate;
      var intRate = parseInt(rate);
      var light = parseInt(intRate / 2);
      var half = intRate % 2;
      var gray = (5 - light - half);
      // console.log(light);
      // console.log(half);
      // console.log(gray);
      var lights = [];
      var halfs = [];
      var grays = [];
      for (var i = 1; i <= light; i++) {
        lights.push(i);
      }
      for (var i = 1; i <= half; i++) {
        halfs.push(i);
      }
      for (var i = 1; i <= gray; i++) {
        grays.push(i);
      }
      // console.log(rate);
      var rateText = rate && rate > 0 ? rate.toFixed(1) : "未评分";
      // console.log(rateText);    
      this.setData({
        lights: lights,
        halfs: halfs,
        grays: grays,
        rateText: rateText
      });
    }
  },

  lifetimes: {
    attached: function() {
      this.updateRate();
      
    }



  }

})