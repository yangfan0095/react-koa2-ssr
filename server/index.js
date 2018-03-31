require('./ignore.js')();
require("babel-register");
require('babel-polyfill');
require('asset-require-hook')({
    extensions: ['jpg', 'png', 'gif','webp'],
    limit: 10000,
    name:'static/media/[name].[ext]'
});
require('./app.js');
