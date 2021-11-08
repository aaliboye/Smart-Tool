const multer = require('multer');

const {
  UserController, LocationController, SublocationController
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

  //Locations
  app.post('/location', LocationController.createLocation);
  app.post('/location/shape', LocationController.addShape);
  app.post('/location/central', LocationController.addCentral);
  app.post('/location/rasp', LocationController.addrpi);
  app.post('/location/rasp/sensor', LocationController.addrpisensor);
  app.post('/location/rasp/module', LocationController.addrpisubmodule);
  app.post('/location/rasp/module/sensor', LocationController.addrpisubmodulesensor);
  
  app.get('/location/:idlocation', auth, LocationController.getLocation);
  app.get('/locations', auth, LocationController.getLocations);
  //Sublocations into location
  app.post('/location/location', SublocationController.addSubLocation);
  app.post('/location/location/shape', SublocationController.addShape);
  app.post('/location/location/central', SublocationController.addCentral);
  app.get('/location/location/:idlocation', auth, SublocationController.getSubLocation);
  app.get('/location/locations/:idlocation', auth, SublocationController.getSubLocations);


  
};
