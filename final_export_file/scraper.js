// Dependencies
var cheerio = require('cheerio');
var	request = require('request');
var fs = require('fs');
var rp = require('request-promise');
var dateTime = require('node-datetime');
var fs = require('fs');
var targz = require('tar.gz');
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');

//define variables
var pinterest_images =[];
var unsplash_images =[];
var final_unsplash_images =[];
var twitter_images =[];
var flickr_images = [];
var final_flickr_images = [];
var pinterest_images =[];
var final_array =[];
var high_resolution_images =[];
var hashtag; // search word for each source to be scraped
var limit; // limit of images to be returned to user
var download_directory = './images/'; // specify download directory
var trending_hashtags =[];
var most_popular_hashtag;

var exports = module.exports = {};

exports.most_popular_hashtag = function() {

  var options = { // specify url to scrape and load into cheerio
      uri: 'https://hashtagnow.co/',
      transform: function (body) {
          return cheerio.load(body);
      }
  };
  return rp(options)
      .then(function ($) {
        $('a','div.trending-hashtags-twitter').each(function(){
          var img = $(this).attr('href');
          // hashtags begin with /hashtag/ so this is removed, leaving only the name of the hashtag
          var trim = img.slice(9);
          //push to array after trim
          trending_hashtags.push(trim);
        })

        // most popular hashtag
        most_popular_hashtag = trending_hashtags[0];
        return most_popular_hashtag;
    })
};
/*exports.highres = function(hashtag,compress,limit) {
  var images =[];
  var unsplash_images =[];
  var final_unsplash_images =[];


  var options = {
      uri: 'https://www.pinterest.com/search/pins/?q='+hashtag,
      transform: function (body) {
          return cheerio.load(body);
      }
  };*/
  // export functionality for scraping flickr.com
  exports.multiple_trending_hashtags = function() {
    var trending = [];


    var options = { // specify url to scrape and load into cheerio
        uri: 'https://hashtagnow.co/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    return rp(options)
        .then(function ($) {
          $('a','div.trending-hashtags-twitter').each(function(){
            var img = $(this).attr('href');
            // hashtags begin with /hashtag/ so this is removed, leaving only the name of the hashtag
            var trim = img.slice(9);
            //push to array after trim
            trending.push(trim);
          })
          console.log(trending);

          return trending;
      })
  };





















// export functionality for scraping flickr.com
exports.flickr = function(hashtag,compress,limit) {
  var flickr_images = []; // orginal array before it is trimmed
  var final_flickr_images = []; // final array of images from flickr.com

  var options = { // specify url to scrape and load into cheerio
      uri: 'https://www.flickr.com/search/?text=' +hashtag,
      transform: function (body) {
          return cheerio.load(body);
      }
  };
  return rp(options)
      .then(function ($) {
        $('div.photo-list-photo-view').each(function(){
          var img = $(this).attr('style');
          // add all images found in the above div under the 'style' attribute to an array
          flickr_images.push(img);
        })

        // check for limit, if defined trim the number of images returned


        for(var i = 0; i < flickr_images.length; i++ ){
            // get the text in between the brackets (this is the URL)
            var string_url = flickr_images[i].substring(flickr_images[i].lastIndexOf("(")+1,flickr_images[i].lastIndexOf(")"));
            // trim the forward slash at the beginning
            var final_strings = string_url.slice(2);
            // add http:// to beginning of each string so it can be recognised at a url
             final_strings = 'http://'+final_strings;
            // push to final array
            final_flickr_images.push(final_strings);
        }
        if(limit){
          final_flickr_images = final_flickr_images.slice(0, limit);
        }

      // get current date and time
      var dt = dateTime.create();
      // format date and time
      var formatted = dt.format('Y-m-d-H:M:S');

       // make folder with the name as the current date and time, place in images folder
       var mkdir = 'mkdir -p ' + download_directory+formatted;
       // set permissions for folder
       var child = exec(mkdir,'0777', function(err, stdout, stderr) {
           for(var i = 0; i < final_flickr_images.length; i++ ){
           // loop through array of images and add to folder
           request(final_flickr_images[i]).pipe(fs.createWriteStream(download_directory+formatted+'/flickr'+hashtag+ '' +i+ '.jpg'));
          }

          // check if compress variable is defined, if so, compress the folder which was just created
            if(compress ==true){
              // read folder from directory
              var read = targz().createReadStream("./images/"+formatted);
              // create tarball
              var write = fs.createWriteStream(formatted+'.tar.gz');
              read.pipe(write);
            }
       });
       // return final array of images
       return final_flickr_images;
    })
};





// export functionality for scraping unsplash.com
exports.unsplash = function(hashtag,compress,limit) {
  var unsplash_images =[];
  var final_unsplash_images =[];

  var options = { // specify url to scrape and load into cheerio
      uri: 'https://unsplash.com/search/'+hashtag,
      transform: function (body) {
          return cheerio.load(body);
      }
  };
  return rp(options)
      .then(function ($) {
        $('a','div.Nqw-T').each(function(){
          var img = $(this).attr('href');
          // add all images found in the above div under the 'href' attribute to an array
          unsplash_images.push(img);
      })

      // check for limit, if defined limit the number of images returned

      // loop through array
      for (var i=unsplash_images.length-1; i>=0; i--) {
      // remove all that do not being with 'http' (get all images)
        if (unsplash_images[i].substring(0, 4) !== 'http'){
      unsplash_images.splice(i, 1);
      }
    }
    // loop through array and trim
    // standard unsplash url is "http://unsplash.com/photos/LW3FskrgQ9M/download?force=true"
    // this trims the string to cut off everything past 'download'
    // all urls have a length of 47 up to this point
     for(var i = 0; i < unsplash_images.length; i++ ){
        var subStr = unsplash_images[i].substring(0,47);
        final_unsplash_images.push(subStr);
    }

    if(limit){
      final_unsplash_images = final_unsplash_images.slice(0, limit);
    }

    // get current date and time
    var dt = dateTime.create();
    // format date and time
    var formatted = dt.format('Y-m-d-H:M:S');

     // make folder with the name as the current date and time, place in images folder
     var mkdir = 'mkdir -p ' + download_directory+formatted;
     // set permissions for folder
     var child = exec(mkdir,'0777', function(err, stdout, stderr) {
           for(var i = 0; i < final_unsplash_images.length; i++ ){
           request(final_unsplash_images[i]).pipe(fs.createWriteStream(download_directory+formatted+'/unsplash'+hashtag+ '' +i+ '.jpg'));
            }
            if(compress ==true){

              var read = targz().createReadStream("./images/"+formatted);
              var write = fs.createWriteStream(formatted+'.tar.gz');
              read.pipe(write);
            }
       });
return final_unsplash_images;
    })
};

// export functionality for scraping pinterest.com
exports.pinterest = function(hashtag,compress,limit) {
  var pinterest_images =[];

  var options = {
      uri: 'https://www.pinterest.com/search/pins/?q='+hashtag,
      transform: function (body) {
          return cheerio.load(body);
      }
  };


  return rp(options)
      .then(function ($) {
        $('img','div.SearchPageContent').each(function(){
          var img = $(this).attr('src');

          pinterest_images.push(img);
      })

      for (var i=pinterest_images.length-1; i>=0; i--) {
        if (pinterest_images[i].substring(0, 5) !== 'https') {
            pinterest_images.splice(i, 1);
        }
      }


    //images are made smaller as standard, changing the size will result in higher resolution
      for(var i=0; i < pinterest_images.length; i++) {
       pinterest_images[i] = pinterest_images[i].replace(/236x/g, '564x');

     }
     if(limit){
       pinterest_images = pinterest_images.slice(0, limit);
     }
     // get current date and time
     var dt = dateTime.create();
     // format date and time
     var formatted = dt.format('Y-m-d-H:M:S');

      // make folder with the name as the current date and time, place in images folder
      var mkdir = 'mkdir -p ' + download_directory+formatted;
      // set permissions for folder
      var child = exec(mkdir,'0777', function(err, stdout, stderr) {

          for(var i = 0; i < pinterest_images.length; i++ ){
           request(pinterest_images[i]).pipe(fs.createWriteStream(download_directory+formatted+'/pinterest'+hashtag+ '' +i+ '.jpg'));
            }
            if(compress ==true){
              // Create all streams that we need
              var read = targz().createReadStream("./images/"+formatted);
              var write = fs.createWriteStream(formatted+'.tar.gz');


              read.pipe(write);
            }
       });
  return pinterest_images;

    })
};

// export functionality for scraping twitter.com
exports.twitter = function(hashtag,compress,limit) {
  var twitter_images =[];
  var options = {
      uri: 'https://twitter.com/search?q=%23'+hashtag,
      transform: function (body) {
          return cheerio.load(body);
      }
  };


  return rp(options)
      .then(function ($) {

      	$('img','div.stream').each(function(){
          var img = $(this).attr('src');

          twitter_images.push(img);
      })

      var search_term = 'https://pbs.twimg.com/media';


			for (var i=twitter_images.length-1; i>=0; i--) {
    		if (twitter_images[i].substring(0, 27) !== search_term) {
        twitter_images.splice(i, 1);
    }
}

/*for(var i = 0; i < twitter_images.length; i++ ){
request(twitter_images[i]).pipe(fs.createWriteStream(''+hashtag+ '' +i+ '.jpg'));
}
      return twitter_images;
*/
if(limit){
  twitter_images = twitter_images.slice(0, limit);

}


      var dt = dateTime.create();
      var formatted = dt.format('Y-m-d-H:M:S');
      console.log(formatted);
       var download_directory = './images/';

       var mkdir = 'mkdir -p ' + download_directory+formatted;
       var child = exec(mkdir,'0777', function(err, stdout, stderr) {
           if (err) throw err;

          for(var i = 0; i < twitter_images.length; i++ ){
           request(twitter_images[i]).pipe(fs.createWriteStream(download_directory+formatted+'/twitter'+hashtag+ '' +i+ '.jpg'));
            }
            if(compress ==true){
              // Create all streams that we need
              var read = targz().createReadStream("./images/"+formatted);
              var write = fs.createWriteStream(formatted+'.tar.gz');


              read.pipe(write);
            }
       });
return twitter_images;

    })
};

module.exports;
