/*global exports*/
var rp = require('request-promise');

module.exports = {
  getRecent: getNews
};
var options = {
  uri: 'http://buffalonews.com/?json=1',
  timeout: 500,
}
function getNews() {
  return rp(options)
    .then(function(body) {
      var response = JSON.parse(body);
      var feed_response = [];
      if (response.status == 'ok') {
        for (var i = 0; i < 15; i++) {
          //console.log(response.posts[i]);
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
  getNews()
