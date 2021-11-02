let User = require("../models/user.model");
let Garden = require("../models/garden.model");
let Zone = require("../models/zone.model");


/**
 * @author Ousmane NDIAYE.
 * @module Garden management
 */

module.exports = {


    /**
     * @api {post} /garden add a new Garden
     * @apiName CreateGarden
     * @apiGroup Garden
     *
     * @apiHeader authorization Bearer token
     *
     * @apiParam {String} name Mandatory garden name
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
    async createGarden(req, res) {
        try {
            const newGarden = new Garden({
                name: req.body.name,
                description: req.body.description,
                user_id: req.userID || req.boUserID
            });
            newGarden.save(function (error, doc) {
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
     * @api {post} /garden/shape add a shape to garden
     * @apiHeader {String} authorization User unique token
     * @apiName AddShape
     * @apiGroup Garden
     * 
     * @apiParam {String} polygon in the format lat,lon;lat,lon;lat,lon;lat,lon
     * @apiParam {Number} idgarden of the garden
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
        let idgarden = req.body.idgarden;
        const garden = await Garden.findById(idgarden);
        if (garden) {
            //lat,lon;lat,lon;lat,lon;lat,lon
            const spolygone = req.body.polygon + '';

            spolygone.split(";").map(function (latlon) {
                garden.gps_shape.push({
                    latitude: latlon.split(",")[0],
                    longitude: latlon.split(",")[1],
                });
            });
            const filter = { _id: garden._id };

            Garden.findOneAndUpdate(filter, garden, function (error, doc) {
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
            res.status(401).send({ success: false, message: 'Garden not found' });
        }




    },

    /**
     * @api {post} /garden/central Add center of garden
     * @apiHeader {String} authorization User unique token
     * @apiName AddCentral
     * @apiGroup Garden
     * 
     * @apiParam {String} point in the format lat,lon
     * @apiParam {Number} idgarden of the garden
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
        let idgarden = req.body.idgarden;
        const garden = await Garden.findById(idgarden);
        if (garden) {
            //lat,lon;lat,lon;lat,lon;lat,lon
            const gpspoint = req.body.point + ''.split(",");
            garden.gps_central_point = {
                latitude: gpspoint[0],
                longitude: gpspoint[1],
            };
            const filter = { _id: garden._id };

            Garden.findOneAndUpdate(filter, garden, function (error, doc) {
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
            res.status(401).send({ success: false, message: 'Garden not found' });
        }




    },

    /**
    * @api {post} /garden/rasp Add a rasp pi module
    * @apiHeader {String} authorization User unique token
    * @apiName AddRpi
    * @apiGroup Garden
    * 
    * @apiParam {Number} idgarden of the garden
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
        let idgarden = req.body.idgarden;
        const garden = await Garden.findById(idgarden);
        if (garden) {

            garden.raspberry.push({
                ip_address: req.body.ip_address,
                dns_address: req.body.dns_address,
                description: req.body.description,
            });

            const filter = { _id: garden._id };

            Garden.findOneAndUpdate(filter, garden, function (error, doc) {
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
            res.status(401).send({ success: false, message: 'Garden not found' });
        }




    },


    /**
    * @api {post} /garden/rasp/sensor Add a sensor to a rasp pi
    * @apiHeader {String} authorization User unique token
    * @apiName addrpisensor
    * @apiGroup Garden
    * 
    * @apiParam {Number} idgarden  ID of the garden
    * @apiParam {Number} idrpi ID  of a Rpi of the garden
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
        let idgarden = req.body.idgarden;
        let idrpi = req.body.idrpi;
        const garden = await Garden.findById(idgarden);
        if (garden) {
            let rpi_indice = garden.raspberry.findIndex(item => item._id == idrpi);
            garden.raspberry[rpi_indice].sensor.push({
                type: req.body.type,
                pins: req.body.pins,
            });

            const filter = { _id: garden._id };

            Garden.findOneAndUpdate(filter, garden, function (error, doc) {
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
            res.status(401).send({ success: false, message: 'Garden not found' });
        }




    },

    /**
     * @api {post} /garden/rasp/module Add a submodule to rasp pi
     * @apiHeader {String} authorization User unique token
     * @apiName AddRpi
     * @apiGroup Garden
     * 
     * @apiParam {Number} idgarden  ID of the garden
     * @apiParam {Number} idrpi ID  of a Rpi of the garden
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
        let idgarden = req.body.idgarden;
        let idrpi = req.body.idrpi;
        const garden = await Garden.findById(idgarden);
        if (garden) {
            let rpi_indice = garden.raspberry.findIndex(item => item._id == idrpi);
            garden.raspberry[rpi_indice].modules.push({
                type: req.body.type,
                pins: req.body.pins,
            });

            const filter = { _id: garden._id };

            Garden.findOneAndUpdate(filter, garden, function (error, doc) {
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
            res.status(401).send({ success: false, message: 'Garden not found' });
        }




    },

    /**
     * @api {post} /garden/rasp/module/sensor Add a sensor to a submodule
     * @apiHeader {String} authorization User unique token
     * @apiName AddmoduleSensor
     * @apiGroup Garden
     * 
     * @apiParam {Number} idgarden  ID of the garden
     * @apiParam {Number} idrpi ID  of a Rpi of the garden
     * @apiParam {Number} idmodule ID  of a module of the Rpi
     * @apiParam {Number} idzone ID  of a Rpi of the garden
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
        let idgarden = req.body.idgarden;
        let idrpi = req.body.idrpi;
        let idmodule = req.body.idmodule;
        const garden = await Garden.findById(idgarden);
        if (garden) {
            let rpi_indice = garden.raspberry.findIndex(item => item._id == idrpi);
            let module_indice =garden.raspberry[rpi_indice].modules.findIndex(m => m._id == idmodule);
            garden.raspberry[rpi_indice].modules[module_indice].sensor.push({
                type: req.body.type,
                zone_id:req.body.zone_id,
                pins: req.body.pins,
            });

            const filter = { _id: garden._id };

            Garden.findOneAndUpdate(filter, garden, function (error, doc) {
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
            res.status(401).send({ success: false, message: 'Garden not found' });
        }




    },


    /**
     * @api {GET} /gardens get all Garden belong to  User 
     * @apiHeader {String} authorization User unique token
     * @apiName AddmoduleSensor
     * @apiGroup Garden
     * 
     *
     * @apiSuccess (Success 200) {String} gardens[i]._id ID
     * @apiSuccess (Success 200) {String} gardens[i].name name
     * @apiSuccess (Success 200) {String} gardens[i].description description
     * @apiSuccess (Success 200) {String} gardens[i].user_id user_id
     * @apiSuccess (Success 200) {JSON} gardens[i].gps_shape gps_shape
     * @apiSuccess (Success 200) {JSON} gardens[i].gps_central_point gps_central_point
     * @apiSuccess (Success 200) {JSON} gardens[i].raspberry raspberry
     * @apiSuccess (Success 200) {JSON} gardens[i].zones zones
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
      getGardens(req, res) {
        
        Garden.find({ user_id: req.userID }).
        populate({
          path: 'zone'
        }).then(gardens => {
            res.send(gardens);
        }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving users."
                });
            });

    },

    /**
     * @api {GET} /gardens get A Garden belongs to the connected User 
     * @apiHeader {String} authorization User unique token
     * @apiName AddmoduleSensor
     * @apiGroup Garden
     * 
     * @apiParam {Number} idgarden  ID of the garden
     *
     * @apiSuccess (Success 200) {String} garden._id ID
     * @apiSuccess (Success 200) {String} garden.name name
     * @apiSuccess (Success 200) {String} garden.description description
     * @apiSuccess (Success 200) {String} garden.user_id user_id
     * @apiSuccess (Success 200) {JSON} garden.gps_shape gps_shape
     * @apiSuccess (Success 200) {JSON} garden.gps_central_point gps_central_point
     * @apiSuccess (Success 200) {JSON} garden.raspberry raspberry
     * @apiSuccess (Success 200) {JSON} garden.zones zones
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
    getGarden(req, res) {
        
        Garden.findOne({ user_id: req.userID, _id:req.body.idgarden }).
        populate({
          path: 'zone'
        }).then(garden => {
            res.send(garden);
        }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving users."
                });
            });

    },



    

}