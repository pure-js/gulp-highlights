// through2 is a thin wrapper around node transform streams
const fs = require('fs');
const Highlights = require('highlights');

// Consts
const PLUGIN_NAME = 'gulp-highlights';

// Plugin level function(dealing with files)
function gulpHighlights(opt) {
  const folder = './exercises/';
  const tmpFolder = '.tmp/';

  fs.mkdir(tmpFolder, function(err) {
    if (err) throw err;
  });

  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      if(file.indexOf('.') !== -1) {
        let contents = fs.readFileSync(folder + file, 'utf8');

        highlighter = new Highlights();
        let html = highlighter.highlightSync({
          fileContents: contents,
          scopeName: 'source.js'
        });

        let htmlFile = file.replace(/\.[^/.]+$/, '.html');

        fs.writeFile(tmpFolder + htmlFile, html, (err) => {
          if (err) throw err;
          console.log(htmlFile + ' is saved!');
        });
      }
    });
  });
}

// Exporting the plugin main function
module.exports = gulpHighlights;
