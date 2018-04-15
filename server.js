const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
})

hbs.registerHelper('message', (text)=>{
	return text.toUpperCase();
})

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((request, response, next)=>{
	var time = new Date().toString();
	// console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error){
			console.log("Unable to log messages");
		}
	});
	next();
});

app.get('/', (request, response) => {
	response.render('about.hbs',{
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome:'Hello'
		// image: 'Capture.PNG'
	});
});

app.get('/info', (request,response) => {
	response.render('about.hbs',{
		title: 'About Page',
		year: new Date().getFullYear(),
		welcome:'Hello'
		// image: 'Capture.PNG'
	});
});

app.get('/404', (request,response) => {
	response.send({
		error: 'Page not found'
	});
});

app.listen(8080, () => {
	console.log('Server is on 8080');
});