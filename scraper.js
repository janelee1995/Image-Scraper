var cheerio = require('cheerio');
var	request = require('request');
var fs = require('fs');

var finalUnsplashImages =[];
var unsplashImages = [];
var twitterImages =[];
var flickrImages = []; // orginal array before it is trimmed to get just the sources of the images
var flickrImagesFinal = [];
var pinterestImages =[];
var finalArray =[]; // array of all images scraped from different sources

var hashtag; // search word for each source to be scraped
var limit; // limit of images to be returned to user



//get unsplash images
exports.getUnsplashImages = function(hashtag,limit) {
  request('https://unsplash.com/search/'+hashtag,function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
    $('a','div.Nqw-T').each(function(){
      var img = $(this).attr('href');

      unsplashImages.push(img);

    });
  }
  for (var i=unsplashImages.length-1; i>=0; i--) {
    if (unsplashImages[i].substring(0, 4) !== 'http') {
  unsplashImages.splice(i, 1);
  }
}

  for(var i = 0; i < unsplashImages.length; i++ ){
    //console.log(newimages);
    var theStringMinusOne = unsplashImages[i].substring(0,47);
    finalUnsplashImages.push(theStringMinusOne);
  //var  str = newimages[i].substring(0, newimages[i].length - 1);
}

console.log(finalUnsplashImages);

})
};


exports.getTwitterImages = function(hashtag,limit) {
  request('https://twitter.com/search?q=%23'+hashtag+'&src=typd',function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
      $('img','div.stream').each(function(){
        var img = $(this).attr('src');
        twitterImages.push(img);
      });

    // return the media images as opposed to other formats (profile pictures/GIFS etc..)
    var search_term = 'https://pbs.twimg.com/media';
    //var search_term1 = 'https://pbs.twimg.com/profile_images';

    for (var i=twitterImages.length-1; i>=0; i--) {
      if (twitterImages[i].substring(0, 27) !== search_term) {
      twitterImages.splice(i, 1);
      }
    }
  }
console.log(twitterImages);

})
};


exports.getPinterestImages = function(hashtag,limit) {
  request('https://www.pinterest.com/search/pins/?q='+hashtag,function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
    $('img','div.SearchPageContent').each(function(){
      var img = $(this).attr('src');

      pinterestImages.push(img);

    });
  }

  for (var i=pinterestImages.length-1; i>=0; i--) {
    if (pinterestImages[i].substring(0, 5) !== 'https') {
        pinterestImages.splice(i, 1);
    }
  }
console.log(pinterestImages);
})
};


exports.getFlickrImages = function(hashtag,limit) {
  request('https://www.flickr.com/search/?text=' +hashtag,function(err,res,body){
    if(!err){
      var $ = cheerio.load(body);
      $('div.photo-list-photo-view').each(function(){
        var img = $(this).attr('style');
        flickrImages.push(img);
      });
    }
    for(var i = 0; i < flickrImages.length; i++ ){
        // get the text in between the brackets (this is the URL)
        var StringUrl = flickrImages[i].substring(flickrImages[i].lastIndexOf("(")+1,flickrImages[i].lastIndexOf(")"));
        //trim the forward slash at the beginning
        var finalString = StringUrl.slice(2);
      //  console.log(finalString);
        flickrImagesFinal.push(finalString);
    }
if(limit){
  //  if (flickrImagesFinal.length > limit)
    flickrImagesFinal = flickrImagesFinal.slice(0, limit);
    //console.log(flickrImagesFinal);
  }

  //  finalArray.push(flickrImagesFinal);
  console.log(flickrImagesFinal);
  })
  };

exports.getAllImages = function(hashtag,limit) {
  request('https://unsplash.com/search/'+hashtag,function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
    $('a','div.Nqw-T').each(function(){
      var img = $(this).attr('href');

      unsplashImages.push(img);

    });
  }
  for (var i=unsplashImages.length-1; i>=0; i--) {
    if (unsplashImages[i].substring(0, 4) !== 'http') {
  unsplashImages.splice(i, 1);
  }
  }

  for(var i = 0; i < unsplashImages.length; i++ ){
    //console.log(newimages);
    var theStringMinusOne = unsplashImages[i].substring(0,47);
    finalUnsplashImages.push(theStringMinusOne);
  //var  str = newimages[i].substring(0, newimages[i].length - 1);
  }
})
  request('https://twitter.com/search?q=%23'+hashtag+'&src=typd',function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
      $('img','div.stream').each(function(){
        var img = $(this).attr('src');
        twitterImages.push(img);
      });

    // return the media images as opposed to other formats (profile pictures/GIFS etc..)
    var search_term = 'https://pbs.twimg.com/media';
    //var search_term1 = 'https://pbs.twimg.com/profile_images';

    for (var i=twitterImages.length-1; i>=0; i--) {
      if (twitterImages[i].substring(0, 27) !== search_term) {
      twitterImages.splice(i, 1);
      }
    }
  }
})
  request('https://www.flickr.com/search/?text=' +hashtag,function(err,res,body){
    if(!err){
      var $ = cheerio.load(body);
      $('div.photo-list-photo-view').each(function(){
        var img = $(this).attr('style');
        flickrImages.push(img);
      });
    }
    for(var i = 0; i < flickrImages.length; i++ ){
        // get the text in between the brackets (this is the URL)
        var StringUrl = flickrImages[i].substring(flickrImages[i].lastIndexOf("(")+1,flickrImages[i].lastIndexOf(")"));
        //trim the forward slash at the beginning
        var finalString = StringUrl.slice(2);
      //  console.log(finalString);
        flickrImagesFinal.push(finalString);
    }
  if(limit){
  //  if (flickrImagesFinal.length > limit)
    flickrImagesFinal = flickrImagesFinal.slice(0, limit);
    //console.log(flickrImagesFinal);
  }
})

  request('https://www.pinterest.com/search/pins/?q='+hashtag,function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
    $('img','div.SearchPageContent').each(function(){
      var img = $(this).attr('src');

      pinterestImages.push(img);

    });
  }

  for (var i=pinterestImages.length-1; i>=0; i--) {
    if (pinterestImages[i].substring(0, 5) !== 'https') {
        pinterestImages.splice(i, 1);
    }
  }



})
};





module.exports;



/*

function getImages(){
// Twitter scraper
request('https://twitter.com/search?q=%23'+hashtag+'&src=typd',function(err,res,body){

if(!err){
  var $ = cheerio.load(body);
    $('img','div.stream').each(function(){
      var img = $(this).attr('src');
      twitterImages.push(img);
    });

  // return the media images as opposed to other formats (profile pictures/GIFS etc..)
  var search_term = 'https://pbs.twimg.com/media';
  //var search_term1 = 'https://pbs.twimg.com/profile_images';

  for (var i=twitterImages.length-1; i>=0; i--) {
    if (twitterImages[i].substring(0, 27) !== search_term) {
    twitterImages.splice(i, 1);
    }
  }

// keep first ten items (this is for the limit)
  //  if (twitterImages.length > limit) twitterImages = twitterImages.slice(0, 10);
    //return twitterImages;
    }






request('https://www.flickr.com/search/?text=' +hashtag,function(err,res,body){
  if(!err){
    var $ = cheerio.load(body);
    $('div.photo-list-photo-view').each(function(){
      var img = $(this).attr('style');
      flickrImages.push(img);
    });
  }
  for(var i = 0; i < flickrImages.length; i++ ){
      // get the text in between the brackets (this is the URL)
      var StringUrl = flickrImages[i].substring(flickrImages[i].lastIndexOf("(")+1,flickrImages[i].lastIndexOf(")"));
      //trim the forward slash at the beginning
      var finalString = StringUrl.slice(2);
    //  console.log(finalString);
      flickrImagesFinal.push(finalString);
  }

//  if (flickrImagesFinal.length > limit) flickrImagesFinal = flickrImagesFinal.slice(0, 10);
  //console.log(flickrImagesFinal);
//  finalArray.push(flickrImagesFinal);

//});
//});

module.exports = {
  getImages: function() {
request('https://www.pinterest.com/search/pins/?q='+hashtag,function(err,res,body){

if(!err){
  var $ = cheerio.load(body);
  $('img','div.SearchPageContent').each(function(){
    var img = $(this).attr('src');

    pinterestImages.push(img);

  });
}

for (var i=pinterestImages.length-1; i>=0; i--) {
  if (pinterestImages[i].substring(0, 5) !== 'https') {
      pinterestImages.splice(i, 1);
  }
}



  request('https://unsplash.com/search/'+hashtag,function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
    $('a','div.Nqw-T').each(function(){
      var img = $(this).attr('href');
      unsplashImages.push(img);
    });
  }

  for (var i=unsplashImages.length-1; i>=0; i--) {
    if (unsplashImages[i].substring(0, 4) !== 'http') {
    unsplashImages.splice(i, 1);
      }
  }

  for(var i = 0; i < unsplashImages.length; i++ ){
    var theStringMinusOne = unsplashImages[i].substring(0,47);
    finalUnsplashImages.push(theStringMinusOne);
  }

if(limit){
  //if (twitterImages.length > limit)
  twitterImages = twitterImages.slice(0, limit);
  //if (finalUnsplashImages.length > limit)
  finalUnsplashImages = finalUnsplashImages.slice(0, limit);
//  if (flickrImagesFinal.length > limit)
  flickrImagesFinal = flickrImagesFinal.slice(0, limit);
  //if (pinterestImages.length > limit)
  pinterestImages = pinterestImages.slice(0, limit);
}



 /*for(var i = 0; i < finalUnsplashImages.length; i++ ){
 request(finalUnsplashImages[i]).pipe(fs.createWriteStream('unsplash_'+hashtag+ '' +i+ '.jpg'));
 }*/
//});


//if (pinterestImages.length > limit) pinterestImages = pinterestImages.slice(0, 10);

//merge arrays together and return the final array
/*var mergedArray1 = twitterImages.concat(flickrImagesFinal);
var mergedArray2 = mergedArray1.concat(pinterestImages);
var finalArray = mergedArray2.concat(finalUnsplashImages);
//console.log(twitterImages);
console.log(finalArray);
//console.log(pinterestImages);
      });
    });
  });
});
}
getImages();
//module.exports = getImages;*/
