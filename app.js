var fs = require('fs');
var koa = require('koa');
var view = require('koa-views');
var static = require('koa-static');

var app = koa();
app.use(static(__dirname+'/htdocs'));
app.use(view('templates'));

// home page
app.use(function *(next) {
  if(this.path !== '/') return yield next;

  var ua = this.headers['user-agent'];
  yield this.render('home.ejs', { ua });
});

// clear ua.json file


// record ua object
app.use(function *(next) {
  if(this.path !== '/record') return yield next;

  var ua = this.headers['user-agent'];
  var uaObject = {
    ua: ua,
    browser: this.query.browser, 
    version: this.query.version, 
    os: this.query.os, 
    device: this.query.device
  }
  var filePath = __dirname+'/data/ua.json';
  var uaData = JSON.parse(fs.readFileSync(filePath));
  var find = uaData.find(function(obj) {
    if(obj.ua === ua) return true;
    return false;
  });
  if(find) {
    find = uaObject;
  } else {
    uaData.push(uaObject);
  }
  fs.writeFileSync(filePath, JSON.stringify(uaData, null, '  '));

  this.body = JSON.stringify(uaData);
});

// listen
app.listen(process.env.PORT || 7001, function() {
  console.log('server started on: 7001');
});