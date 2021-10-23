const multer = require('multer');

const {
  UserController, PersonController
} = require('./../controller');

const { auth } = require('./../middlewares');
const { auth_non_active } = require('./../middlewares');

DIR='./files/prevalence';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = Date.now() + '-'+file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName);
  }
});

const uploadExecel = multer({storage: storage});

module.exports = (app) => {
  // End Users
  app.post('/user', UserController.create);
  app.get('/user', auth, UserController.get);
  app.get('/user/refresh_token', auth, UserController.refreshToken);
  app.post('/user/verify_code', auth_non_active, UserController.verifyCode);
  app.get('/user/init', UserController.seedUsers);

  app.post('/person',auth, PersonController.create);
  
};
