/*global exports*/
var rp = require('request-promise');

/**
 * Decodes html entities by name and number
 */
var decodeHtmlEntities = function(str) {
    return str.replace(/&#?(\w+);/g, function(match, dec) {
        if(isNaN(dec)) {
            chars = {quot: 34, singquot: 39, amp: 38, lt: 60, gt: 62, nbsp: 160, copy: 169, reg: 174, deg: 176, frasl: 47, trade: 8482}
            if (chars[dec] !== undefined){
                dec = chars[dec];
            }
        }
        return String.fromCharCode(dec);
    });
};
module.exports = {
  getRecent: getRecent,
  getCategory: getCategory,
};

function getRecent() {
  var date_chosen = new Date().toJSON().slice(0,10).replace(/-/g,'');
  var options = {
    uri: 'http://buffalonews.com/?json=get_date_posts&date=' + date_chosen,
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
          item['mainText'] = decodeHtmlEntities(response.posts[i].excerpt);
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
            if (response.posts[i].excerpt.slice(response.posts[i].excerpt-1) != '.') {
              console.log('need period');
              response.posts[i].excerpt += '.'
            }
            item['mainText'] = decodeHtmlEntities(response.posts[i].excerpt);
            item['redirectionUrl'] = response.posts[i].url;
            feed_response.push(item);
          }
        }
        console.log(feed_response);
        //console.log(feed_response);
        return feed_response;
      })
    }
    getCategory(23847);
