const express = require('express');
const Router = express.Router();
const roleRouter = require('../controllers/RoleController');
const {auth, adminOnly} = require('../middleware/Auth');

Router.get('/', roleRouter.getAllRoles);

Router.post('/add', roleRouter.addRole);

Router.put('/update', [auth, adminOnly], roleRouter.updateRole);

Router.delete('/delete', [auth, adminOnly], roleRouter.deleteRole);


module.exports = Router;