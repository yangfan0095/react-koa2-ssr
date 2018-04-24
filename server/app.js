const Koa = require('koa')
const path = require('path');
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const react = require('koa-react-view');
const index = require('./routes/index')
const users = require('./routes/users')
const debug = require('debug')('demo:server');
const http = require('http');
const staticCache  = require("koa-static-cache");
const app = new Koa()
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
// routes
app.use(index.routes(), index.allowedMethods())
app.use(require('koa-static')(__dirname + '../build'))
app.use(staticCache (path.resolve(__dirname,'../build'),{
  maxAge: 365 * 24 * 60 * 60,
  gzip:true
}));
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '3008';
// app.set('port', port);

app.listen(port, () => {
  console.log('listen on:' + port);
});
