/*global exports*/
var news = require('./lib/news.js');

exports.handler = function (event, context) {
  'use strict';
  //gusto 2610, latest sports 23847 local-news 30
  console.log(event)
  console.log(context)
  if (event.path == '/category') {
    var category_id = event.queryStringParameters.category_id;
    news.getCategory(category_id).then(function(feed_response) {
      context.succeed({
    		statusCode: 200,
    		headers: { 'Content-Type': 'application/json' },
    		body: JSON.stringify(feed_response),
    	});
    }).catch(function(reason) {
      context.fail('Unable to get news. Try again later.' + reason)
    });
  } else {
    news.getRecent().then(function(feed_response) {
      context.succeed({
    		statusCode: 200,
    		headers: { 'Content-Type': 'application/json' },
    		body: JSON.stringify(feed_response),
    	});
    }).catch(function(reason) {
      context.fail('Unable to get news. Try again later.' + reason)
    });
  }

};
