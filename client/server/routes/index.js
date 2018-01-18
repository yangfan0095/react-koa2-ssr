const { render } = require('../render/render')
const router = require('koa-router')()

router.get('*', render)

module.exports = router