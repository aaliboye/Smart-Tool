let User = require("../models/user.model");
let Location = require("../models/location.model");
let Zone = require("../models/zone.model");


/**
 * @author Ousmane NDIAYE.
 * @module Location management
 */

module.exports = {


    /**
     * @api {post} /location add a new Location
     * @apiName CreateLocation
     * @apiGroup Location
     *
     * @apiHeader authorization Bearer token
     *
     * @apiParam {String} name Mandatory location name
     * @apiParam {String} description Not mandatory description
     *
     * @apiSuccess (Success 201) {Boolean} success If it works ot not
     * @apiSuccess (Success 201) {String} message Response message
     * 
     * @apiError (Error 401) {Boolean} success If it works ot not (false)
     * @apiError (Error 401) {String} message Response message
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Success
     *     {
     *       "success": true,
     *       "message": "Successfully created."
     *     }
     */
    async createLocation(req, res) {
        try {
            const newLocation = new Location({
                name: req.body.name,
                description: req.body.description,
                user_id: req.userID || req.boUserID
            });
            newLocation.save(function (error, doc) {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                }
                else {
                    res.status(201).send({
                        id:doc._id,
                        success: true,
                        message: 'Successfully created.'
                    });
                }


            });

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

    /**
     * @api {post} /location/shape add a GPS shape to location
     * @apiHeader {String} authorization User unique token
     * @apiName AddShape
     * @apiGroup Location
     * 
     * @apiParam {String} polygon in the format lat,lon;lat,lon;lat,lon;lat,lon
     * @apiParam {Number} idlocation of the location
     *
     *
     * @apiSuccess (Success 201) {Boolean} success If it works ot not
     * @apiSuccess (Success 201) {Object} Zone a Zone object
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     *     {
     *       "success": true,
     *       "message": "Successfully updated."
     *     }
     */
    async addShape(req, res) {
        let idlocation = req.body.idlocation;
        const location = await Location.findById(idlocation);
        if (location) {
            //lat,lon;lat,lon;lat,lon;lat,lon
            const spolygone = req.body.polygon + '';

            spolygone.split(";").map(function (latlon) {
                location.gps_shape.push({
                    latitude: latlon.split(",")[0],
                    longitude: latlon.split(",")[1],
                });
            });
            const filter = { _id: location._id };

            Location.findOneAndUpdate(filter, location, function (error, doc) {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                }
                else {
                    //console.log(doc);
                    res.status(201).send({
                        success: true,
                        message: 'Successfully updated.'
                    });
                }
            });
        }
        else {
            res.status(401).send({ success: false, message: 'Location not found' });
        }




    },

    /**
     * @api {post} /location/central Add GPS center of location
     * @apiHeader {String} authorization User unique token
     * @apiName AddCentral
     * @apiGroup Location
     * 
     * @apiParam {String} point in the format lat,lon
     * @apiParam {Number} idlocation of the location
     *
     *
     * @apiSuccess (Success 201) {Boolean} success If it works ot not
     * @apiSuccess (Success 201) {Object} Zone a Zone object
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     *     {
     *       "success": true,
     *       "message": "Successfully updated."
     *     }
     */
    async addCentral(req, res) {
        let idlocation = req.body.idlocation;
        const location = await Location.findById(idlocation);
        if (location) {
            //lat,lon;lat,lon;lat,lon;lat,lon
            const gpspoint = req.body.point + ''.split(",");
            location.gps_central_point = {
                latitude: gpspoint[0],
                longitude: gpspoint[1],
            };
            const filter = { _id: location._id };

            Location.findOneAndUpdate(filter, location, function (error, doc) {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                }
                else {
                    //console.log(doc);
                    res.status(201).send({
                        success: true,
                        message: 'Successfully updated.'
                    });
                }
            });
        }
        else {
            res.status(401).send({ success: false, message: 'Location not found' });
        }




    },

    /**
    * @api {post} /location/rasp Add a rasp pi module
    * @apiHeader {String} authorization User unique token
    * @apiName AddRpi
    * @apiGroup Location
    * 
    * @apiParam {Number} idlocation of the location
    * @apiParam {String} ip_address The Local IP adresse
    * @apiParam {String} dns_address The Local DNS adresse
    * @apiParam {String} description A description of the Raspi
    *
    *
    * @apiSuccess (Success 201) {Boolean} success If it works ot not
    * @apiSuccess (Success 201) {Object} Zone a Zone object
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 201 Created
    *     {
    *       "success": true,
    *       "message": "Successfully updated."
    *     }
    */
     async addrpi(req, res) {
        let idlocation = req.body.idlocation;
        const location = await Location.findById(idlocation);
        if (location) {

            location.raspberry.push({
                ip_address: req.body.ip_address,
                dns_address: req.body.dns_address,
                description: req.body.description,
            });

            const filter = { _id: location._id };

            Location.findOneAndUpdate(filter, location, function (error, doc) {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                }
                else {
                    //console.log(doc);
                    res.status(201).send({
                        success: true,
                        message: 'Successfully updated.'
                    });
                }
            });
        }
        else {
            res.status(401).send({ success: false, message: 'Location not found' });
        }




    },


    /**
    * @api {post} /location/rasp/sensor Add a sensor to a rasp pi
    * @apiHeader {String} authorization User unique token
    * @apiName addrpisensor
    * @apiGroup Location
    * 
    * @apiParam {Number} idlocation  ID of the location
    * @apiParam {Number} idrpi ID  of a Rpi of the location
    * @apiParam {String} type The  type of the sensor
    * @apiParam {JSON} pins  The input PINs ON the RPI
    *
    *
    * @apiSuccess (Success 201) {Boolean} success If it works ot not
    * @apiSuccess (Success 201) {Object} Zone a Zone object
    *
    * @apiParamExample {json} Request-Example:
    *     {
    *       "pins": [
    *                           { 
    *                               number:10,
    *                               type:"input",
    *                               param:[
    *                                   {
    *                                       key:"voltage",
    *                                       value:"5V"
    *                                   }
    *                               ]
    *                           }
    *                       ],
    *     }
    */
     async addrpisensor(req, res) {
        let idlocation = req.body.idlocation;
        let idrpi = req.body.idrpi;
        const location = await Location.findById(idlocation);
        if (location) {
            let rpi_indice = location.raspberry.findIndex(item => item._id == idrpi);
            location.raspberry[rpi_indice].sensor.push({
                type: req.body.type,
                pins: req.body.pins,
            });

            const filter = { _id: location._id };

            Location.findOneAndUpdate(filter, location, function (error, doc) {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                }
                else {
                    //console.log(doc);
                    res.status(201).send({
                        success: true,
                        message: 'Successfully updated.'
                    });
                }
            });
        }
        else {
            res.status(401).send({ success: false, message: 'Location not found' });
        }




    },

    /**
     * @api {post} /location/rasp/module Add a submodule to raspPi
     * @apiHeader {String} authorization User unique token
     * @apiName addrpisubmodule
     * @apiGroup Location
     * 
     * @apiParam {Number} idlocation  ID of the location
     * @apiParam {Number} idrpi ID  of a Rpi of the location
     * @apiParam {String} type The  type of the sensor
     * @apiParam {JSON}   link  The link PINs or USB reference ON the RPI
     *
     *
     * @apiSuccess (Success 201) {Boolean} success If it works ot not
     * @apiSuccess (Success 201) {Object} Zone a Zone object
     *
     *
     */
     async addrpisubmodule(req, res) {
        let idlocation = req.body.idlocation;
        let idrpi = req.body.idrpi;
        const location = await Location.findById(idlocation);
        if (location) {
            let rpi_indice = location.raspberry.findIndex(item => item._id == idrpi);
            location.raspberry[rpi_indice].modules.push({
                type: req.body.type,
                pins: req.body.pins,
            });

            const filter = { _id: location._id };

            Location.findOneAndUpdate(filter, location, function (error, doc) {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                }
                else {
                    //console.log(doc);
                    res.status(201).send({
                        success: true,
                        message: 'Successfully updated.'
                    });
                }
            });
        }
        else {
            res.status(401).send({ success: false, message: 'Location not found' });
        }




    },

    /**
     * @api {post} /location/rasp/module/sensor Add a sensor submodule
     * @apiHeader {String} authorization User unique token
     * @apiName AddmoduleSensor
     * @apiGroup Location
     * 
     * @apiParam {Number} idlocation  ID of the location
     * @apiParam {Number} idrpi ID  of a Rpi of the location
     * @apiParam {Number} idmodule ID  of a module of the Rpi
     * @apiParam {Number} idzone ID  of a Rpi of the location
     * @apiParam {String} type The  type of the sensor
     * @apiParam {JSON}   link  The link PINs or USB reference ON the RPI
     *
     *
     * @apiSuccess (Success 201) {Boolean} success If it works ot not
     * @apiSuccess (Success 201) {Object} Zone a Zone object
     *
     *
     */
     async addrpisubmodulesensor(req, res) {
        let idlocation = req.body.idlocation;
        let idrpi = req.body.idrpi;
        let idmodule = req.body.idmodule;
        const location = await Location.findById(idlocation);
        if (location) {
            let rpi_indice = location.raspberry.findIndex(item => item._id == idrpi);
            let module_indice =location.raspberry[rpi_indice].modules.findIndex(m => m._id == idmodule);
            location.raspberry[rpi_indice].modules[module_indice].sensor.push({
                type: req.body.type,
                zone_id:req.body.zone_id,
                pins: req.body.pins,
            });

            const filter = { _id: location._id };

            Location.findOneAndUpdate(filter, location, function (error, doc) {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                }
                else {
                    //console.log(doc);
                    res.status(201).send({
                        success: true,
                        message: 'Successfully updated.'
                    });
                }
            });
        }
        else {
            res.status(401).send({ success: false, message: 'Location not found' });
        }




    },


    /**
     * @api {GET} /locations get all User Location
     * @apiHeader {String} authorization User unique token
     * @apiName getLocations
     * @apiGroup Location
     * 
     *
     * @apiSuccess (Success 200) {String} locations[i]._id ID
     * @apiSuccess (Success 200) {String} locations[i].name name
     * @apiSuccess (Success 200) {String} locations[i].description description
     * @apiSuccess (Success 200) {String} locations[i].user_id user_id
     * @apiSuccess (Success 200) {JSON} locations[i].gps_shape gps_shape
     * @apiSuccess (Success 200) {JSON} locations[i].gps_central_point gps_central_point
     * @apiSuccess (Success 200) {JSON} locations[i].raspberry raspberry
     * @apiSuccess (Success 200) {JSON} locations[i].zones zones
     * @apiParamExample {json} Request-Example:
     *[{
     *   name: jardin Majorelle,
     *   description: Ce jardin se trouve au Maroc,
     *   user_id: 111aaa-111,
     *   gps_shape: [],
     *   gps_central_point: {},
     *   raspberry: [],
     *   zones: []
    }]
     *
     */
      getLocations(req, res) {
        
        Location.find({ user_id: req.userID }).
        populate({
          path: 'zone'
        }).then(locations => {
            res.send(locations);
        }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving users."
                });
            });

    },

    /**
     * @api {GET} /location/:idlocation get A User Location
     * @apiHeader {String} authorization User unique token
     * @apiName getLocation
     * @apiGroup Location
     * 
     * @apiParam {Number} idlocation  ID of the location
     *
     * @apiSuccess (Success 200) {String} location._id ID
     * @apiSuccess (Success 200) {String} location.name name
     * @apiSuccess (Success 200) {String} location.description description
     * @apiSuccess (Success 200) {String} location.user_id user_id
     * @apiSuccess (Success 200) {JSON} location.gps_shape gps_shape
     * @apiSuccess (Success 200) {JSON} location.gps_central_point gps_central_point
     * @apiSuccess (Success 200) {JSON} location.raspberry raspberry
     * @apiSuccess (Success 200) {JSON} location.zones zones
     * @apiParamExample {json} Request-Example:
     * [{
     *   name: jardin Majorelle,
     *   description: Ce jardin se trouve au Maroc,
     *   user_id: 111aaa-111,
     *   gps_shape: [],
     *   gps_central_point: {},
     *   raspberry: [],
     *   zones: []
     * }]
     *
     */
    getLocation(req, res) {
        
        Location.findOne({ user_id: req.userID, _id:req.params.idlocation }).
        populate({
          path: 'zone'
        }).then(location => {
            res.send(location);
        }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving users."
                });
            });

    },



    

}