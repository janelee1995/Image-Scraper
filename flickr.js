var cheerio = require('cheerio');
var	request = require('request');
var fs = require('fs');

var newimages =[];
var images = [];
var hashtag = "NewYork"
  request('https://www.flickr.com/search/?text=' +hashtag,function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
    $('div.photo-list-photo-view').each(function(){
      var img = $(this).attr('style');

      images.push(img);

    });
  }
  for(var i = 0; i < images.length; i++ ){
      // get the text in between the brackets (this is the URL)
      var StringUrl = images[i].substring(images[i].lastIndexOf("(")+1,images[i].lastIndexOf(")"));
      //trim the forward slash at the beginning
      var finalString = StringUrl.slice(2);
      console.log(finalString);
  }
});
