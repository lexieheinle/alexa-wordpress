/*global exports*/
var news = require('./lib/news.js');

exports.handler = function (event, context) {

	/*context.succeed({
		statusCode: 200,
		headers: { 'Content-Type': 'application/json' },
		body: getNews(),
	});*/
  news.getRecent().then(function(feed_response) {
    context.succeed({
  		statusCode: 200,
  		headers: { 'Content-Type': 'application/json' },
  		body: feed_response,
  	});
  }).catch(function(reason) {
    context.fail('Unable to get news. Try again later.' + reason)
  });

};
