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
var debug = require('debug')('demo:server');
var http = require('http');
const app = new Koa()
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))
const viewpath = path.join(__dirname, './views');
react(app, {
  views: viewpath,
  extname: 'js'
});
// logger
app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '3003';
// app.set('port', port);

app.listen(port, () => {
  console.log('listen on:' + port);
});