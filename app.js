var koa = require('koa');

var app = koa();

app.use(function *() {
  this.body = 'hello world';
})

app.listen(80, function() {
  console.log('server started on:80');
});