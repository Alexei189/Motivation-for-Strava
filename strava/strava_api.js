var StravaApiV3 = require('strava_api_v3');
var defaultClient = StravaApiV3.ApiClient.instance;


var strava_oauth = defaultClient.authentications['strava_oauth'];
strava_oauth.accessToken ='b12e6b36c61917aced60ea0bd6bc4f87f60004a2'

var api = new StravaApiV3.AthletesApi()

var id = 51487616; 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.getStats(id, callback);
