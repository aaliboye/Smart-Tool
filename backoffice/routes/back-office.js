const express = require('express');
const router = express.Router();

const {
    UserController, BackOfficeUserController
} = require('./../controller');

const { boAuth } = require('./../middlewares');

// Back Office Users
router.post('/bo-user/auth', BackOfficeUserController.auth);
router.post('/bo-user', boAuth, BackOfficeUserController.create);
router.get('/bo-user', boAuth, BackOfficeUserController.getAll);
router.put('/bo-user/updatePassword', boAuth, BackOfficeUserController.updatePassword);
router.get('/bo-user/:id', boAuth, BackOfficeUserController.get);
router.put('/bo-user/:id', boAuth, BackOfficeUserController.update);
router.get('/bo-user/:id/change-statut', boAuth, BackOfficeUserController.changeStatut);

// End Users
router.get('/user', boAuth, UserController.get);
router.get('/users', boAuth, UserController.getAllUsers);





module.exports = router;
