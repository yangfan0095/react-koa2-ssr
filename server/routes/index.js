const { render } = require('../render/render')
const router = require('koa-router')()

router.get('/', render)

router.get('/string', async(ctx, next) => {
  ctx.body = 'koa2 string'
})
// router.get('/', async(ctx, next) => {
//   let html =   ctx.render('index',{url:ctx.url});
//   console.log(html);
//   ctx.body =html;
// })

router.get('/json', async(ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})


module.exports = router