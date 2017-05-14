var cheerio = require('cheerio');
var	request = require('request');
var fs = require('fs');
var targz = require('tar.gz');
var http = require('http-server');

var images =[];

var hashtag = 'saturday';

		request('https://twitter.com/search?q=%23'+hashtag+'&src=typd',function(err,res,body){

		if(!err){
			var $ = cheerio.load(body);
			$('img','div.stream').each(function(){
				var img = $(this).attr('src');
				images.push(img);
			});
		//	console.log(images);

			var search_term = 'https://pbs.twimg.com/media';


			for (var i=images.length-1; i>=0; i--) {
    		if (images[i].substring(0, 27) !== search_term) {
        images.splice(i, 1);
    }
}

for(var i = 0; i < images.length; i++ ){
request(images[i]).pipe(fs.createWriteStream(''+hashtag+ '' +i+ '.jpg'));
}
console.log(images); // console.log to show in console (this means its working)
		}

/*
// Create all streams that we need
var req = http.request(options, function(res) {

	var options = {
	    protocol : "http:",
	    host: "localhost",
	    port: 3000,
	    path: '/GetFile',
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/octet-stream',
	        'Content-Length': Buffer.byteLength(postData)
	    }
	};
});*/
});
  /*  var body = '';
    var file = fs.createWriteStream('./test4.tar.gz');

    res.on('data', function(chunk){
        file.write(chunk);
        }).on('end', function(){
          file.end();
        });
    });

req.write(postData);
req.end();
	});*/

/*
function getSearch(){
	var search = "New York"
		request('https://unsplash.com/search/' +search,function(err,res,body){

		if(!err){
			var $ = cheerio.load(body);
			$('img','div._3_WtK').each(function(){
				var img = $(this).attr('src');
				//console.log(img);
				images.push(img);
			});

			console.log(images);
		}

	});
}
getSearch();
/*request('https://twitter.com/',function(err,res,body){
	//console.log(res.statusCode);

	var $ = cheerio.load(body);
	$('img','div.stream').each(function(){
		var img = $(this).attr('src');
		console.log(body);
		images.push(img);


});
console.log(images);

});*/
