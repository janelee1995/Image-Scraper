var cheerio = require('cheerio');
var	request = require('request');
var fs = require('fs');


var images =[];

var hashtag = 'saturday';

		request('https://twitter.com/search?q=%23'+hashtag+'&src=typd',function(err,res,body){

		if(!err){
			var $ = cheerio.load(body);
			$('img','div.stream').each(function(){
				var img = $(this).attr('src');
				//console.log(img);
				images.push(img);
			});

		//	console.log(images);
			//var array = images; // Test
			var search_term = 'https://pbs.twimg.com/media';
			//var search_term1 = 'https://pbs.twimg.com/profile_images';

			for (var i=images.length-1; i>=0; i--) {
    		if (images[i].substring(0, 27) !== search_term) {
        images.splice(i, 1);
        // break;       //<-- Uncomment  if only the first term has to be removed
    }
}

for(var i = 0; i < images.length; i++ ){
request(images[i]).pipe(fs.createWriteStream(''+hashtag+ '' +i+ '.jpg'));
}
console.log(images);
		}

	});

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
