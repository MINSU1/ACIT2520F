const request = require('request');

var getWeather = (lat, lng, callback) => {
	request({
	    url: 'https://api.darksky.net/forecast/fb2d78ddaa5b88137bda186278187c8d/'+lat+','+lng,
	    json: true
	}, (error, response, body) => {
		if (error){
			callback('Cannot connect to Darksky.net');
		}else if(body.code == 400){
			callback('Cannot find weather form the address');
		}else{
			callback(undefined, {
				icon: `icon: ${body.currently.icon}`,
				summary: `Summary: ${body.currently.summary}`,
				temperature: `Temperature: ${body.currently.temperature} °F`,
				pressure: `Pressure: ${body.currently.pressure}`
			});
		}
	});
};

var getAddress = (address, callback) => {
	request({
	    url: 'http://maps.googleapis.com/maps/api/geocode/json' +
	        '?address=' + encodeURIComponent(address),
	    json: true
	}, (error, response, body) => {
		if (error){
			callback('Cannot connect to Google Maps');
		}else if (body.status == 'ZERO_RESULTS'){
			callback('Cannot find requested address');
		}else if (body.status == 'OK'){
			callback(undefined, {
				lat: body.results[0].geometry.location.lat,
				lng: body.results[0].geometry.location.lng
			})
		}
	});
};

var getpic = (input, callback) =>{
	var URL = "https://pixabay.com/api/?key=8709818-dabc1eee988fc07d7dac28d29"+"&q="+encodeURIComponent("red roses");
	request({
		url: URL,
		json: true
	},(error,response,body) => {
		if (error){
			callback('Cannot connect to Pic');
		}else if (body.status == 'ZERO_RESULTS'){
			callback('Cannot find Pic');
		}else if (body.status == 'OK'){
			callback(undefined, {
				largepicurl: hits[0].largeImageURL,
				pageurl: hits[0].pageURL,
				webformaturl: hits[0].webformatURL
			})
		}
	})
}
module.exports = {
	getWeather,
	getAddress,
	getpic
};