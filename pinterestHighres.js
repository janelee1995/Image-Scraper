var cheerio = require('cheerio');
var	request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
// Dependencies
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var dateTime = require('node-datetime');
var rp = require('request-promise');
// App variables
//var file_url = 'http://upload.wikimedia.org/wikipedia/commons/4/4f/Big%26Small_edit_1.jpg';

var newimages =[];
var images = [];
var hashtag = "NewYork"
  request('https://www.pinterest.com/search/pins/?q=newyork',function(err,res,body){

  if(!err){
    var $ = cheerio.load(body);
    $('img','div.SearchPageContent').each(function(){
      var img = $(this).attr('src');

      images.push(img);
//console.log(images);
    });
  }
})

function getTheImages(){
console.log("images");
console.log(images);

  for (var i=images.length-1; i>=0; i--) {
    if (images[i].substring(0, 5) !== 'https') {
        images.splice(i, 1);
    }
  }
  console.log(images);

//replace image size to original size
  for(var i=0; i < images.length; i++) {
   images[i] = images[i].replace(/236x/g, '564x');

  }

  console.log(images);

//mkdirp('/images', function (err) {
/*  if (err) {console.error(err)
  }
  else{*/
  //  for(var i = 0; i < images.length; i++ ){
//    request(images[i]).pipe(fs.createWriteStream('pinterest'+hashtag+ '' +i+ '.jpg'));
  //  }
     console.log('Done!');

    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d-H:M:S');
    console.log(formatted);
     var downloadDirectory = './images/';

     var mkdir = 'mkdir -p ' + downloadDirectory+formatted;
     var child = exec(mkdir,'0777', function(err, stdout, stderr) {
         if (err) throw err;

        for(var i = 0; i < images.length; i++ ){
         request(images[i]).pipe(fs.createWriteStream(downloadDirectory+formatted+'/pinterest'+hashtag+ '' +i+ '.jpg'));
          }
     });
     var mkdir = 'mkdir -p tarballs';
     var child = exec(mkdir,'0777', function(err, stdout, stderr) {
        if (err) throw err;
      });
      var fs = require('fs');
var targz = require('tar.gz');
function tar(){
// Create all streams that we need
var read = targz().createReadStream("./images/"+formatted);
var write = fs.createWriteStream('compressed.tar.gz');

// Let the magic happen
read.pipe(write);
}
setTimeout(tar, 3000);
console.log('done');
}
setTimeout(getTheImages,4000);
//require('child_process').execFile('tar', ['-cvf','tarball.tar',+ downloadDirectory+formatted+'/*']);

//console.log(downloadDirectory+formatted);
