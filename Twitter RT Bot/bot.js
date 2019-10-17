var twit = require("twit");

var Twitter = new twit({
    consumer_key: '---',
    consumer_secret: '---',
    access_token: '---',
    access_token_secret: '---',
    timeout_ms: 60 * 1000,
    strictSSL: false, 
})



var retweet = function () {
    var params = {
        q: '#FurSUDO', 
        result_type: 'recent',
        lang: 'en'
    }
    Twitter.get('search/tweets', params, function (err, data) {
        if (!err) {
                var retweetId = data.statuses[0].id_str;
                Twitter.post('statuses/retweet/:id', {
                    id: retweetId
                }, function (err, response) {
                    if (response) {
                        console.log('Retweeted!');
                    }
                    if (err) {
                          console.log(err);
                        console.log('already retweeted this tweet!');
                    }
                });
        }
        else {
            console.log('Error');
        }
    });
};

var ContinuouslyRT;
function doRT(){
 retweet();
 ContinuouslyRT = setTimeout(doRT, 10000) //replace 10000 with the time (in ms) you want to search for a new tweet to RT
}

doRT();