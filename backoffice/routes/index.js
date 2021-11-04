const multer = require('multer');

const {
  UserController, GardenController, ZoneController
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

  //Gardens
  app.post('/garden', GardenController.createGarden);
  app.post('/garden/shape', GardenController.addShape);
  app.post('/garden/central', GardenController.addCentral);
  app.post('/garden/rasp', GardenController.addrpi);
  app.post('/garden/rasp/sensor', GardenController.addrpisensor);
  app.post('/garden/rasp/module', GardenController.addrpisubmodule);
  app.post('/garden/rasp/module/sensor', GardenController.addrpisubmodulesensor);
  app.get('/user', auth, GardenController.getGarden);
  app.get('/user/refresh_token', auth, GardenController.getGardens);
  //Zones into garden
  app.post('/garden/zone', ZoneController.addZone);
  app.post('/garden/zone/shape', ZoneController.addShape);
  app.post('/garden/zone/central', ZoneController.addCentral);
  app.get('/garden/zone/:idzone', auth, ZoneController.getZone);
  app.get('/garden/zones/:idgarden', auth, ZoneController.getZones);


  
};
