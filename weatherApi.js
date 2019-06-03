var request = require( 'request' );

var query = process.argv[2];

request( 'https://www.metaweather.com/api/location/search/?query=' + query , function (error, responce, body) {
    if (error) {
        console.log("error occured", error);
    }
    else if (responce.statusCode === 200) {
        //console.log(body);
        var data = JSON.parse (body);
        var weatherId = data[0]['woeid']
        //console.log('The weather ID', weatherId);
        
        request ( 'https://www.metaweather.com/api/location/'+ weatherId + '/', function (
                    error, response, body) {
                        if ( response.statusCode === 200) 
                        {
                            // console.log(body);
                            var data = JSON.parse(body);
                            var temp = data.consolidated_weather[0]['the_temp'];
                            console.log('Temperture in ', query, 'is ', temp);
                        }
                    }
                ) 
    }
}
);