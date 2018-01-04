'use strict';
/**
 * content 上下文 data后期需要挂在的数据
 */
//<link href="/static/css/main.css" rel="stylesheet">
exports.layout = function (content, data) {
    return `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>React App</title>
    
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"> ${contetn}</div>
    <script type="text/javascript" src="/static/js/main.js"></script>
</body>

</html>
`;
};