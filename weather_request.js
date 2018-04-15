weather.getAddress(argv.address, (errorMessage, results) =>{
	if (errorMessage){
		console.log(errorMessage);
	} else{
		var lat = JSON.stringify(results.lat, undefined, 2),
			lng = JSON.stringify(results.lng, undefined, 2);

		weather.getWeather(lat, lng, (errorMessage, results) => {
			if (errorMessage){
				console.log(errorMessage);
			} else{
				var outcome = results;
				console.log(outcome.icon +'\n'+outcome.summary+'\n'+outcome.temperature+'\n'+outcome.pressure);
			}
		});
	}
});

// --------------------------location API--------------------------------------------------------------
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    messagebox.setPosition(pos);
    messagebox.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function getAddress(address, callback) {
    messagebox.setPosition(pos);
    request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json' + '?address=' + encodeURIComponent(address),
        json: true
    }, (error, response, body) => {
        if (error) {
          callback('Can not connect to google maps');
        } else if (body.status === 'ZERO_RESULTS') {
          callback('Can not find requested address');
        } else if (body.status === 'OK') {
          var messs_d=body.results[0].formatted_address
          callback(undefined, body.results[0].formatted_address);
        }
    });
    messagebox.setContent(messs_d);
};
