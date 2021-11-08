let User = require("../models/user.model");
let Location = require("../models/location.model");
let SubLocation = require("../models/sublocation.model");


/**
 * @author Ousmane NDIAYE.
 * @module SubLocation management
 */

module.exports = {

    /**
    * @api {post} /location/subLocation Add a subLocation into the location
    * @apiHeader {String} authorization User unique token
    * @apiName AddSubLocation
    * @apiGroup SubLocation
    * 
    * @apiParam {Number} idlocation of the location
    * @apiParam {String} name The Local IP adresse
    * @apiParam {String} type The type off the SubLocation
    * @apiParam {String} description A description of the Raspi
    *
    *
    * @apiSuccess (Success 201) {Boolean} success If it works ot not
    * @apiSuccess (Success 201) {Object} SubLocation a SubLocation object
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 201 Created
    *     {
    *       "success": true,
    *       "message": "Successfully updated."
    *     }
    */
     async addSubLocation(req, res) {
        try {
            const newSubLocation = new SubLocation({
                name: req.body.name,
                description: req.body.description,
                location_id: req.body.idlocation,
                type: req.body.type,
            });

            let idlocation = req.body.idlocation;
            const location = await Location.findById(idlocation);

            newSubLocation.save(function (error, doc) {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                }
                else {
                    location.subLocations.push(doc._id);
                    const filter = { _id: location._id };
                    Location.findOneAndUpdate(filter, location);
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
     * @api {post} /location/subLocation/shape Add GPS Polygone
     * @apiHeader {String} authorization User unique token
     * @apiName AddShape
     * @apiGroup SubLocation
     * 
     * @apiParam {String} polygon in the format lat,lon;lat,lon;lat,lon;lat,lon
     * @apiParam {Number} idsubLocation id of the subLocation
     *
     *
     * @apiSuccess (Success 201) {Boolean} success If it works ot not
     * @apiSuccess (Success 201) {Object} SubLocation a SubLocation object
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     *     {
     *       "success": true,
     *       "message": "Successfully updated."
     *     }
     */
     async addShape(req, res) {
        let idsubLocation = req.body.idsubLocation;
        const subLocation = await SubLocation.findById(idsubLocation);
        if (subLocation) {
            //lat,lon;lat,lon;lat,lon;lat,lon
            const spolygone = req.body.polygon + '';

            spolygone.split(";").map(function (latlon) {
                subLocation.gps_shape.push({
                    latitude: latlon.split(",")[0],
                    longitude: latlon.split(",")[1],
                });
            });
            const filter = { _id: subLocation._id };

            SubLocation.findOneAndUpdate(filter, subLocation, function (error, doc) {
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
     * @api {post} /location/subLocation/central Add GPS center
     * @apiHeader {String} authorization User unique token
     * @apiName AddCentral
     * @apiGroup SubLocation
     * 
     * @apiParam {String} point in the format lat,lon
     * @apiParam {Number} idsubLocation of the location
     *
     *
     * @apiSuccess (Success 201) {Boolean} success If it works ot not
     * @apiSuccess (Success 201) {Object} SubLocation a SubLocation object
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     *     {
     *       "success": true,
     *       "message": "Successfully updated."
     *     }
     */
     async addCentral(req, res) {
        let idsubLocation = req.body.idsubLocation;
        const subLocation = await SubLocation.findById(idsubLocation);
        if (subLocation) {
            //lat,lon;lat,lon;lat,lon;lat,lon
            const gpspoint = req.body.point + ''.split(",");
            subLocation.gps_central_point = {
                latitude: gpspoint[0],
                longitude: gpspoint[1],
            };
            const filter = { _id: subLocation._id };

            SubLocation.findOneAndUpdate(filter, subLocation, function (error, doc) {
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
     * @api {GET} /location/subLocations get all SubLocations from location 
     * @apiHeader {String} authorization User unique token
     * @apiName AddmoduleSensor
     * @apiGroup SubLocation
     * 
     * @apiParam {Number} idlocation  ID of the location
     *
     * @apiSuccess (Success 200) {String} subLocations[i]._id ID
     * @apiSuccess (Success 200) {String} subLocations[i].name name
     * @apiSuccess (Success 200) {String} subLocations[i].description description
     * @apiSuccess (Success 200) {String} subLocations[i].location_id location_id
     * @apiSuccess (Success 200) {JSON}   subLocations[i].gps_shape gps_shape
     * @apiSuccess (Success 200) {JSON}   subLocations[i].gps_central_point gps_central_point
     * @apiParamExample {json} Request-Example:
     * [{
     *   name: jardin Majorelle,
     *   description: Ce jardin se trouve au Maroc,
     *   user_id: 111aaa-111,
     *   gps_shape: [],
     *   gps_central_point: {},
     *   raspberry: [],
     *   subLocations: []
     * }]
     *
     */
    async getSubLocations(req, res) {

        let idlocation = req.params.idlocation;

        const location = await Location.findById(idlocation);
        if (location && location.user_id==req.userID) {
            SubLocation.find({ location_id: req.body.idlocation }).
            populate({
                path: 'location'
            }).then(subLocations => {
                res.send(subLocations);
            }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving users."
                });
            });
        }else {
            res.status(401).send({ success: false, message: 'location not found' });
        }

    },

    /**
     * @api {GET} /location/subLocation get A SubLocation belongs to the connected User 
     * @apiHeader {String} authorization User unique token
     * @apiName getSubLocation
     * @apiGroup SubLocation
     * 
     * @apiParam {Number} idlocation  ID of the location
     * @apiParam {Number} idsubLocation  ID of the subLocation
     *
     * @apiSuccess (Success 200) {String} subLocation._id ID
     * @apiSuccess (Success 200) {String} subLocation.name name
     * @apiSuccess (Success 200) {String} subLocation.description description
     * @apiSuccess (Success 200) {String} subLocation.location_id location_id
     * @apiSuccess (Success 200) {JSON} subLocation.gps_shape gps_shape
     * @apiSuccess (Success 200) {JSON} subLocation.gps_central_point gps_central_point
     * @apiParamExample {json} Request-Example:
     *[{
     *   name: jardin Majorelle,
     *   description: Ce jardin se trouve au Maroc,
     *   user_id: 111aaa-111,
     *   gps_shape: [],
     *   gps_central_point: {},
     *   raspberry: [],
     *   subLocations: []
    }]
     *
     */
    async getSubLocation(req, res) {
        //let idlocation = req.body.idlocation;
        let idsubLocation = req.params.idsubLocation;

        const subLocation = await SubLocation.findById(idsubLocation).populate({path: 'location'});

        if (subLocation && subLocation.location_id.user_id==req.userID) {
            res.send(subLocation);
        }else {
            res.status(401).send({ success: false, message: 'subLocation not found' });
        }
           

        },
    }