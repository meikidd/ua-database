var fs = require('fs');
var koa = require('koa');

var app = koa();
app.use(function *() {
  var filePath = __dirname+'/ua-data.json';
  var uaData = fs.readFileSync(filePath);
  uaData = JSON.parse(uaData);
  console.log(uaData);
  uaData.push({ua:"heihei"});
  console.log(uaData);

  fs.writeFileSync(filePath, JSON.stringify(uaData));
  this.body = JSON.stringify(uaData);
});

app.listen(process.env.PORT || 7001, function() {
  console.log('server started on: 7001');
});