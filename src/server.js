//
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
// Unused Ports in the range: 49152 to 65535
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
module.exports = app;