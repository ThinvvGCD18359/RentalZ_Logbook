const express = require('express');
const app = express();
const port = 3000;
const route = require('./routes');

app.use(
   express.urlencoded({
      extended: true,
   }),
);

app.use(express.json());

route(app);

app.listen(port, () => {
   console.log(`The server is running on http://localhost:${port}`);
});