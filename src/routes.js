const { Router } = require('express');
const routes = Router();
const DevController = require('./Controllers/DevController');
const SearchController = require('./Controllers/SearchController');

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.post('/devs/uptade', DevController.update);
routes.post('/devs/delete', DevController.destroy);
routes.get('/search', SearchController.index);



module.exports = routes;