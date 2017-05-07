var path = require('path');

var inspect = require('eyes').inspector({maxLength:10000});
var pdf_extract = require('pdf-extract');
var absolute_path_to_pdf = path.basename('Hacking.pdf');
var file = process.argv[2];
var options = {
  type: 'text'  // extract the actual text in the pdf file 
};
var processor = pdf_extract(absolute_path_to_pdf, options, function(err) {
  if (err) {
    return errcallback(err);
  }
});
processor.on('complete', function(data) {
  inspect(data.text_pages, 'extracted text pages');
  errcallback(null, data.text_pages);
});
processor.on('error', function(err) {
  inspect(err, 'error while extracting pages');
  return errcallback(err);
});

function errcallback(err, data)
{
 if(err){
 console.log("something went wrong" + err);
 }
 console.log(data.text_pages);
}