var cheerio = require('cheerio'); // require cheerio
var	request = require('request'); // require request
var fs = require('fs');           // require file server

//var newimages =[];
var images = [];
var finalArray = [];
var flickrImagesFinal = [];
var hashtag = "NewYork" // hard coded hashtag for testing
  request('https://www.flickr.com/search/?text=' +hashtag,function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
    $('div.photo-list-photo-view').each(function(){
      var img = $(this).attr('style');

      images.push(img);

    });
  }

  //loop through images and format the strings to get usable url
  for(var i = 0; i < images.length; i++ ){
      // get the text in between the brackets (this is the URL)
      var string_url = images[i].substring(images[i].lastIndexOf("(")+1,images[i].lastIndexOf(")"));
      //trim the forward slash at the beginning
      var final_strings = string_url.slice(2);
      final_strings = 'http://'+final_strings;
     console.log(final_strings);
     //flickrImagesFinal.push(final_strings);
     flickrImagesFinal.push(final_strings);

  }
  console.log("finalArray");
  console.log(flickrImagesFinal);
});
