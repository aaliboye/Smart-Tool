let User = require("../models/user.model");
let Garden = require("../models/garden.model");
let Zone = require("../models/zone.model");


/**
 * @author Ousmane NDIAYE.
 * @module Zone management
 */

module.exports = {

    /**
    * @api {post} /garden/zone Add a zone into the garden
    * @apiHeader {String} authorization User unique token
    * @apiName AddZone
    * @apiGroup Zone
    * 
    * @apiParam {Number} idgarden of the garden
    * @apiParam {String} name The Local IP adresse
    * @apiParam {String} type The type off the Zone
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
     async addZone(req, res) {
        try {
            const newZone = new Zone({
                name: req.body.name,
                description: req.body.description,
                garden_id: req.body.idgarden,
                type: req.body.type,
            });

            let idgarden = req.body.idgarden;
            const garden = await Garden.findById(idgarden);

            newZone.save(function (error, doc) {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                }
                else {
                    garden.zones.push(doc._id);
                    const filter = { _id: garden._id };
                    Garden.findOneAndUpdate(filter, garden);
                    res.status(201).send({
                        id: doc._id,
                        success: true,
                        message: 'Successfully added.'
                    });
                }


            });

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }




    },


    /**
     * @api {post} /garden/zone/shape Add GPS Polygone
     * @apiHeader {String} authorization User unique token
     * @apiName AddShape
     * @apiGroup Zone
     * 
     * @apiParam {String} polygon in the format lat,lon;lat,lon;lat,lon;lat,lon
     * @apiParam {Number} idzone id of the zone
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
        let idzone = req.body.idzone;
        const zone = await Zone.findById(idzone);
        if (zone) {
            //lat,lon;lat,lon;lat,lon;lat,lon
            const spolygone = req.body.polygon + '';

            spolygone.split(";").map(function (latlon) {
                zone.gps_shape.push({
                    latitude: latlon.split(",")[0],
                    longitude: latlon.split(",")[1],
                });
            });
            const filter = { _id: zone._id };

            Zone.findOneAndUpdate(filter, zone, function (error, doc) {
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
     * @api {post} /garden/zone/central Add GPS center
     * @apiHeader {String} authorization User unique token
     * @apiName AddCentral
     * @apiGroup Zone
     * 
     * @apiParam {String} point in the format lat,lon
     * @apiParam {Number} idzone of the garden
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
        let idzone = req.body.idzone;
        const zone = await Zone.findById(idzone);
        if (zone) {
            //lat,lon;lat,lon;lat,lon;lat,lon
            const gpspoint = req.body.point + ''.split(",");
            zone.gps_central_point = {
                latitude: gpspoint[0],
                longitude: gpspoint[1],
            };
            const filter = { _id: zone._id };

            Zone.findOneAndUpdate(filter, zone, function (error, doc) {
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
     * @api {GET} /garden/zones get all Zones from garden 
     * @apiHeader {String} authorization User unique token
     * @apiName AddmoduleSensor
     * @apiGroup Zone
     * 
     * @apiParam {Number} idgarden  ID of the garden
     *
     * @apiSuccess (Success 200) {String} zones[i]._id ID
     * @apiSuccess (Success 200) {String} zones[i].name name
     * @apiSuccess (Success 200) {String} zones[i].description description
     * @apiSuccess (Success 200) {String} zones[i].garden_id garden_id
     * @apiSuccess (Success 200) {JSON}   zones[i].gps_shape gps_shape
     * @apiSuccess (Success 200) {JSON}   zones[i].gps_central_point gps_central_point
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
    async getZones(req, res) {

        let idgarden = req.params.idgarden;

        const garden = await Garden.findById(idgarden);
        if (garden && garden.user_id==req.userID) {
            Zone.find({ garden_id: req.body.idgarden }).
            populate({
                path: 'garden'
            }).then(zones => {
                res.send(zones);
            }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving users."
                });
            });
        }else {
            res.status(401).send({ success: false, message: 'garden not found' });
        }

    },

    /**
     * @api {GET} /garden/zone get A Zone belongs to the connected User 
     * @apiHeader {String} authorization User unique token
     * @apiName getZone
     * @apiGroup Zone
     * 
     * @apiParam {Number} idgarden  ID of the garden
     * @apiParam {Number} idzone  ID of the zone
     *
     * @apiSuccess (Success 200) {String} zone._id ID
     * @apiSuccess (Success 200) {String} zone.name name
     * @apiSuccess (Success 200) {String} zone.description description
     * @apiSuccess (Success 200) {String} zone.garden_id garden_id
     * @apiSuccess (Success 200) {JSON} zone.gps_shape gps_shape
     * @apiSuccess (Success 200) {JSON} zone.gps_central_point gps_central_point
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
    async getZone(req, res) {
        //let idgarden = req.body.idgarden;
        let idzone = req.params.idzone;

        const zone = await Zone.findById(idzone).populate({path: 'garden'});

        if (zone && zone.garden_id.user_id==req.userID) {
            res.send(zone);
        }else {
            res.status(401).send({ success: false, message: 'zone not found' });
        }
           

        },
    }