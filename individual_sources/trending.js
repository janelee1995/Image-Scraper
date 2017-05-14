var cheerio = require('cheerio'); // require cheerio
var	request = require('request'); // require request
var fs = require('fs');           // require file server

var trending =[];
  request('https://hashtagnow.co/',function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
    		//$('img','div.stream').each(function(){
    $('a','div.trending-hashtags-twitter').each(function(){
      var img = $(this).attr('href');
      // hashtags begin with /hashtag/ so this is removed, leaving only the name of the hashtag
      var trim = img.slice(9);

      //push to array after trim
      trending.push(trim);


    });
  console.log(trending);
  }
})
