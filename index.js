var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var busboy = require('connect-busboy');
var exec = require('child_process').exec;
var serveStatic = require('serve-static');
var path = require('path');
var fs = require('fs');

var app = express();

app.use(bodyParser.raw({ type: 'audio/wav', limit: '10mb' }));
app.use(methodOverride());
// app.use(busboy());
app.use(serveStatic(path.join(__dirname, 'client')));

app.post('/audio', function (req, res) {
  fs.writeFile('/tmp/audio.wav', req.body, 'binary', function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    exec('play /tmp/audio.wav', function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Ok');
    });
  });
});

var server = app.listen(8088, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
