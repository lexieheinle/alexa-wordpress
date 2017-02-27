/*global exports*/
var rp = require('request-promise');

module.exports = {
  getRecent: getRecent,
  getCategory: getCategory,
};

function getRecent() {
  var options = {
    uri: 'http://buffalonews.com/?json=get_recent_posts',
    timeout: 500,
  }
  return rp(options)
    .then(function(body) {
      var response = JSON.parse(body);
      var feed_response = [];
      if (response.status == 'ok') {
        for (var i = 0; i < 5; i++) {
          var item = {};
          item['uid'] = response.posts[i].id.toString();
          item['updateDate'] = new Date(response.posts[i].date);
          item['titleText'] = response.posts[i].title;
          if (response.posts[i].excerpt.slice(response.posts[i].excerpt-1) != '.') {
            console.log('need period');
            response.posts[i].excerpt += '.'
          }
          item['mainText'] = response.posts[i].excerpt;
          item['redirectionUrl'] = response.posts[i].url;
          feed_response.push(item);
        }
      }
      console.log(feed_response);
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
          for (var i = 0; i < 5; i++) {
            var item = {};
            item['uid'] = response.posts[i].id.toString();
            item['updateDate'] = new Date(response.posts[i].date);
            item['titleText'] = response.posts[i].title;
            console.log('***********Content*******');
            console.log(response.posts[i].content);
            if (response.posts[i].excerpt.slice(response.posts[i].excerpt-1) != '.') {
              console.log('need period');
              response.posts[i].excerpt += '.'
            }
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
    getRecent()
