const formRoute = require('./form');

const route = (app) => {
   app.use('/form', formRoute);
};

module.exports = route;