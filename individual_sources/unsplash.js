var cheerio = require('cheerio');
var	request = require('request');
var fs = require('fs');

var finalUnsplashImages =[];
var images = [];
var hashtag = "cat";


exports.downloadUnsplash = function(hashtag) {
  request('https://unsplash.com/search/'+hashtag,function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
    $('a','div.Nqw-T').each(function(){
      var img = $(this).attr('href');

      images.push(img);

    });
  }
  for (var i=images.length-1; i>=0; i--) {
    if (images[i].substring(0, 4) !== 'http'){
  images.splice(i, 1);
  }
}

  for(var i = 0; i < images.length; i++ ){
    //console.log(newimages);
    var theStringMinusOne = images[i].substring(0,47);
    finalUnsplashImages.push(theStringMinusOne);
  //var  str = newimages[i].substring(0, newimages[i].length - 1);
}

console.log(finalUnsplashImages);
for(var i = 0; i < finalUnsplashImages.length; i++ ){
request(finalUnsplashImages[i]).pipe(fs.createWriteStream('unsplash_'+hashtag+ '' +i+ '.jpg'));
}
})
