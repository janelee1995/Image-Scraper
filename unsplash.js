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
    if (images[i].substring(0, 4) !== 'http') {
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
//};
//module.exports;


 /*for(var i = 0; i < newimages.length; i++ ){
 request(newimages[i]).pipe(fs.createWriteStream('unsplash_'+hashtag+ '' +i+ '.jpg'));
 }*/



//  var myArray = images[i].split(/[()]+/).filter(function(e) { return e; });

/*    for(var i = 0; i < images.length; i++ ){
      var rex = /\$\d+(?=\))/;
      var newstring = rex.exec(images[i]);
      console.log(newstring);
    }*/
/*var regExp = /\(([^)]+)\)/;
      var matches = regExp.exec("background-image: url('https://images.unsplash.com/photo-1470227244774-0481686cbb37?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop=&bg='); background-color: rgb(30, 31, 39); width: 100%; height: 240px");

      console.log(matches);*/
      //var str = "I expect five hundred dollars ($500) ($1).";

  //  }
  //  console.log(images);
