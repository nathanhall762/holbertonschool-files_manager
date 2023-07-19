// server.js
const express = require('express');
const routes = require('./routes');

const app = express();

// Load all routes from the routes/index.js file
app.use(routes);

// Set the port to listen on from the environment variable PORT or default to 5000
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
