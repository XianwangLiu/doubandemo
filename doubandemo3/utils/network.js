import {
  gobalUrls
} from "urls.js"

const network = {
  getMovieList: function(params) {
    params.type = "movie";
    this.getItemList(params);
  },
  getTVList: function(params) {
    params.type = "tv";
    this.getItemList(params);
  },
  getShowList: function(params) {
    params.type = "show";
    this.getItemList(params);
  },

  getItemList: function(params) {
    var url = "";
    if (params.type == "movie") {
      // 请求电影的url
      url = gobalUrls.movieList;
    } else if (params.type == "tv") {
      //请求电视剧的url
      url = gobalUrls.tvList;
    } else if (params.type == "show") {
      //请求综艺的url
      url = gobalUrls.showList;
    }
    var count = params.count ? params.count : 7;
    wx: wx.request({
      url: url,
      data: {
        count: count
      },
      success: function(res) {
        var items = res.data.subject_collection_items;
        var itemsCount = items.length;
        var left = itemsCount % 3;
        if (left == 2) {
          items.push(null);
        }
        if (params && params.success) {
          params.success(items);
        }

      },

    });
  },

  getItemDetail: function(params) {
    var url = "";
    var id = params.id;
    var type = params.type;
    if (type == "movie") {
      // 请求电影详情的url
      url = gobalUrls.movieDetail + id;
    } else if (type == "tv") {
      //请求电视剧详情的url
      url = gobalUrls.tvDetail + id;
    } else if (type == "show") {
      //请求综艺详情的url
      url = gobalUrls.showDetail + id;
    }
    wx.request({
      url: url,
      success: function(res) {
        // console.log(res);
        var item = res.data;
        if (params.success) {
          params.success(item);
        }
      }
    })

  },

  getItemTags: function(params) {
    var type = params.type;
    var id = params.id;
    var url = "";
    if (type == "movie") {
      // 请求电影标签的url
      url = gobalUrls.movieTags(id);
    } else if (type == "tv") {
      //请求电视剧标签的url
      url = gobalUrls.tvTags(id);
    } else if (type == "show") {
      //请求综艺标签的url
      url = gobalUrls.showTags(id);
    }
    wx.request({
      url: url,
      success: function(res) {
        // console.log(res);
        var tags = res.data.tags;
        if (params.success) {
          params.success(tags);
        }
      }
    });
  },
  //获取等多短评
  getItemComments: function(params) {
    var type = params.type;
    var id = params.id;
    var count = params.count;
    console.log(params.start + "getitemComments");
    console.log(params.count + "   params.count");
    
    var start = params.start ? params.start : 0;
    var count = params.count ? params.count : 3;
    console.log(start + "请求的start");

    var url = "";
    if (type == "movie") {
      // 请求电影短评的url
      url = gobalUrls.movieComments(id, start, count);
    } else if (type == "tv") {
      //请求电视剧短评的url
      url = gobalUrls.tvComments(id, start, count);
    } else if (type == "show") {
      //请求综艺短评的url
      url = gobalUrls.showComments(id, start, count);
    }
    wx.request({
      url: url,
      success: function(res) {
        console.log(res);
        var data = res.data;
        if(params.success){
          params.success(data);
        }
      }
    });
  },

  //搜索item
  getSearch: function(params) {
    var q = params.q;
    var url = gobalUrls.searchUrl(q);
    wx.request({
      url: url,
      success: function(res){
        console.log(res);
        var subjects = res.data.subjects;
        if (params.success){
          params.success(subjects);
        }
      }
    })
  }

}

export {
  network
}