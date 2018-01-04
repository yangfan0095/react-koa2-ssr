'use strict';
/**
 * content 上下文 data后期需要挂在的数据
 */
exports.layout = function (content, data) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charSet='utf-8'/>
    <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
    <meta name='renderer' content='webkit'/>
    <meta name='keywords' content='demo'/>
    <meta name='description' content='demo'/>
    <meta name='viewport' content='width=device-width, initial-scale=1'/>
    <link rel="stylesheet" href="/dist/css/style.css">
  </head>
  <body>
    <div id="root"><div>${content}</div></div>
  <script>
  </script>
 <script type="text/javascript" src="/static/js/bundle.js"></script>
  </body>
  </html>
`;
};