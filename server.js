const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const address_finder = require('./address_finder.js')
const weather_file = require('./public/infoget.js')

var app = express();

const port = process.env.PORT || 8080;

var lat = '49.2834444',
	lng = '-123.1196331',
	largepicurl='"https://pixabay.com/get/ea34b50d2df6083ed1584d05fb1d4e91e37eead411ac104497f3c970a0e5b3bd_1280.jpg"',
	pageurl='',
	webformaturl2='https://pixabay.com/get/ea34b50d2df6083ed1584d05fb1d4e91e37eead411ac104497f3c970a0e5b3bd_1280.jpg',
	username = 'Guest',
	address = '460 Westveiw St, coquitlam, bc, canada',
	dest_address = 'bcit, bc, ca',
	validity = 0,
	weather_body = '';

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
})


function weather_fetcher(){
	weather_file.geocode(address).then((result) =>{
		return weather_file.weather(result.lat, result.lng);
	}).then((result)=>{
		weather_body = result;
	}).catch((error)=>{
		console.log(error)
	})
}

function get_pic_url(address){
	
	address_finder.getpic(address, (errorMessage, results) =>{
		if (errorMessage){
			console.log("PicError");
			largepicurl = '',
			pageurl = '',
			webformaturl2='';
		} else{
			largepicurl = JSON.stringify(results.largepicurl,undefined, 2)
			pageurl = JSON.stringify(results.pageurl,undefined, 2)
			webformaturl2 = JSON.stringify(results.webformaturl,undefined, 2)
		}
	});
}

// app.get('/',(request, response) =>{
// 	response.send({
// 		name: 'MIN',
// 		school :[
// 		'BCIT',
// 		'SFU',
// 		'UBC'
// 		]
// 	})
// });

app.get('/',(request,response)=> {
	response.render('about.hbs',{
		title: 'About page',
		year: new Date().getFullYear(),
		welcome: 'Hello'
	});
});

app.get('/input',(request,response)=> {
	get_pic_url("cat");
	response.render('input.hbs',{
		welcome: 'Hello',
		imgsrc: largepicurl,
		webformaturl3 :webformaturl2
	});
});

app.get('/404',(request, response)=>{
	response.send({
		error: 'Page not found'
	})
})

app.get('/main', (request, response) => {
	var distance_fee = 0,
		distance = '',
		ori = '',
		dest = '';
	weather_fetcher()
	weather_file.distance_calc(address, dest_address).then((result)=>{
		distance = result.dis;
		distance_fee = parseInt(result.dis.split(' ')[0])*5;
		ori = result.ori;
		dest = result.dest;

		console.log(weather_body, '!!');
		response.render('main.hbs', {
			welcome:"HELLO",
			summary: weather_body.summary,
			icon:weather_body.icon,
			temp:weather_body.temperature,
			humid:weather_body.humidity,
			winds:weather_body.windSpeed
		});
	}).catch((error)=>{
		console.log(error);
	});
});

app.listen(port, ()=> {
	console.log(`Server is up on the port ${port}`);
});