var cheerio = require('cheerio');
var	request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');

var newimages =[];
var images = [];
var hashtag = "NewYork"
  request('https://www.pinterest.com/search/pins/?q=newyork',function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
    $('img','div.SearchPageContent').each(function(){
      var img = $(this).attr('src');

      images.push(img);

    });
  }

  for (var i=images.length-1; i>=0; i--) {
    if (images[i].substring(0, 5) !== 'https') {
        images.splice(i, 1);
    }
  }
  console.log(images);


mkdirp('/images/', function (err) {
  if (err) {console.error(err)
  }
  else{
    for(var i = 0; i < newimages.length; i++ ){
    request(newimages[i]).pipe(fs.createWriteStream('pinterest'+hashtag+ '' +i+ '.jpg'));
    }
     console.log('Done!')
   }
});
  /**/
});
