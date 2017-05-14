var cheerio = require('cheerio'); // require cheerio
var	request = require('request'); // require request
var fs = require('fs');           // require file server
var mkdirp = require('mkdirp');   // require mkdir for making directory

var newimages =[];
var images = [];
var hashtag = "NewYork" // hard coded hashtag for testing

  // go to url of pinterest site
  request('https://www.pinterest.com/search/pins/?q=newyork',function(err,res,body){

  if(!err){
    var $ = cheerio.load(body); // load content of page into cheerio
    $('img','div.SearchPageContent').each(function(){ // search for images in these divs
      var img = $(this).attr('src'); // get src attribute of each image found

      images.push(img); // push to images array
    });
  }


  // loop through array and remove everything that doesn't begin with https
  // Many useless formats such as gifs, this filters whats returned
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
});
