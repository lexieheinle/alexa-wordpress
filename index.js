"use strict";
console.log("Loading hello world function");
exports.handler = function(event, context) {
    console.log(event);
    console.log(context);
    var request = require("request");
    var name = "World";
    var responseCode = 200;
    console.log("request: " + JSON.stringify(event));
    function generateUUID() {
        var d = Date.now();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=="x" ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
    var feed = [];
    function jsonCleanup(jsonresponse) {
      var posts = jsonresponse.posts;
      for(var i = 0; i < 6; i++) {
        var post = posts[i];
        var clean_post = {"uid": generateUUID(), "updateDate": post.modified, "titleText": post.title_plain, "mainText": post.excerpt, "redirectionUrl": post.url};
        feed.push(clean_post)
      }
    }

    var jsonLink = "http://buffalonews.com/?json=1";
    request(jsonLink, (error, responsed, body)=> {
      if (!error && responsed.statusCode === 200) {
        const fbResponse = JSON.parse(body)
        jsonCleanup(fbResponse);
        var response = {
            statusCode: responseCode,
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify(feed);
        };
        console.log("response: " + JSON.stringify(response))
        context.succeed(response);
      } else {
        console.log("Got an error: ", error, ", status code: ", response.statusCode)
      }
    });
};
/*[
  {
    "uid": "EXAMPLE_CHANNEL_MULTI_ITEM_JSON_TTS_1",
    "updateDate": "2016-04-10T00:00:00.0Z",
    "titleText": "Multi Item JSON (TTS)",
    "mainText": "This channel has multiple TTS JSON items. This is the first item.",
    "redirectionUrl": "https://www.amazon.com"
   },
  {
    "uid": "EXAMPLE_CHANNEL_MULTI_ITEM_JSON_TTS_2",
    "updateDate": "2016-04-10T00:00:00.0Z",
    "titleText": "Multi Item JSON (TTS)",
    "mainText": "This channel has multiple TTS JSON items. This is the second item.",
    "redirectionUrl": "https://www.amazon.com"
  }
]
*/
