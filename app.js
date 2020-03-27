const express = require('express');
const app = express();
var PORT = process.env.PORT || 3000;

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.listen(PORT, function() {
  console.log('Server running on port:', PORT);
});

app.use('/', function(req, res){
  res.render('index.html');
});