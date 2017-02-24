/*global exports*/
var rp = require('request-promise');

module.exports = {
  getRecent: getRecent,
  getCategory: getCategory,
};

function getRecent() {
  var options = {
    uri: 'http://buffalonews.com/?json=1',
    timeout: 500,
  }
  return rp(options)
    .then(function(body) {
      var response = JSON.parse(body);
      var feed_response = [];
      if (response.status == 'ok') {
        for (var i = 0; i < 15; i++) {
          var item = {};
          item['uid'] = response.posts[i].id;
          item['updateDate'] = new Date(response.posts[i].date);
          item['titleText'] = response.posts[i].title;
          item['mainText'] = response.posts[i].excerpt;
          item['redirectionUrl'] = response.posts[i].url;
          feed_response.push(item);
        }
      }
      return feed_response;
    })
  }
  function getCategory(category_id) {
    var options = {
      uri: 'http://buffalonews.com/?json=get_category_posts&category_id=' + category_id,
      timeout: 500,
    }
    return rp(options)
      .then(function(body) {
        var response = JSON.parse(body);
        var feed_response = [];
        if (response.status == 'ok') {
          for (var i = 0; i < 15; i++) {
            var item = {};
            item['uid'] = response.posts[i].id;
            item['updateDate'] = new Date(response.posts[i].date);
            item['titleText'] = response.posts[i].title;
            console.log('***********Content*******');
            console.log(response.posts[i].content);
            item['mainText'] = response.posts[i].excerpt;
            console.log('***********Excerpt******');
            console.log(response.posts[i].excerpt);
            item['redirectionUrl'] = response.posts[i].url;
            feed_response.push(item);
          }
        }
        //console.log(feed_response);
        return feed_response;
      })
    }
