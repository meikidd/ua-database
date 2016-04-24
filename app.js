var fs = require('fs');
var koa = require('koa');
var view = require('koa-views');
var static = require('koa-static');
var UA_FILE_PATH = __dirname+'/data/ua.json';

var app = koa();
app.use(static(__dirname+'/htdocs'));
app.use(view('templates'));

// home page
app.use(function *(next) {
  if(this.path !== '/') return yield next;

  var ua = this.headers['user-agent'];
  yield this.render('home.ejs', { ua });
});

// record ua object
app.use(function *(next) {
  if(this.path !== '/record') return yield next;

  var ua = this.headers['user-agent'];
  var uaObject = {
    ua: ua,
    browser: {
      name: this.query.browser, 
      version: this.query.version
    },
    os: { 
      name: this.query.os
    },
    device: {
      name: this.query.device
    }
  }
  var uaData = JSON.parse(fs.readFileSync(UA_FILE_PATH));
  var find = uaData.find(function(obj) {
    if(obj.ua === ua) return true;
    return false;
  });
  if(find) {
    find = uaObject;
  } else {
    uaData.unshift(uaObject);
  }
  fs.writeFileSync(UA_FILE_PATH, JSON.stringify(uaData, null, '  '));

  this.body = JSON.stringify(uaData);
});

// get ua data
app.use(function *(next) {
  if(this.path !== '/list') return yield next;

  this.body = '' + fs.readFileSync(UA_FILE_PATH);
});

// clear ua.json file

// listen
app.listen(process.env.PORT || 7001, function() {
  console.log('server started on: 7001');
});