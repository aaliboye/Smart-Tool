let User = require("../models/user.model");
let Person = require("../models/person.model");
const { otpProvider, jwt } = require('./../providers');


/**
 * @author Ousmane NDIAYE.
 * @module Person management
 */

 module.exports = {

    async create(req, res) {
        let father={};
        let mother={};
        try {
           /* if(req.body.father_id){
                father=await Person.findById(father_id).exec();
            }
            if(req.body.mother_id){
                mother=await Person.findById(mother_id).exec();
            }*/
            

            const newPerson = new Person({
                name: [{
                    first: req.body.firstname,
                    last: req.body.lastname,
                    midle: req.body.midlename,
                    user_id:req.userID||req.boUserID,
                    visible:true,
                    vote:0
                }],
                gender:[{
                    value:req.body.gender,
                    user_id:req.userID||req.boUserID,
                    visible:true,
                    vote:0 
                }],
                dateofbirth: [{
                    value:req.body.dateofbirth,
                    user_id:req.userID||req.boUserID,
                    visible:true,
                    vote:0 
                }],
                dateofdeath: [{
                    value:req.body.dateofdeath,
                    user_id:req.userID||req.boUserID,
                    visible:true,
                    vote:0 
                }],
                address: [{
                    value:req.body.address,
                    user_id:req.userID||req.boUserID,
                    visible:true,
                    vote:0 
                }],
                phone: [{
                    value:req.body.phone,
                    user_id:req.userID||req.boUserID,
                    visible:true,
                    vote:0 
                }],
                position: [{
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    altitude: req.body.altitude,
                    user_id:req.userID||req.boUserID,
                    visible:true,
                    vote:0 
                }],
        
                email: [{
                    value:req.body.email,
                    user_id:req.userID||req.boUserID,
                    visible:true,
                    vote:0 
                }],
                user_id:req.userID||req.boUserID
            });
            newPerson.save().then((person) => {
                res.status(201).send({
                    success: true,
                    message: 'Successfully created.'
                });
            }).catch((error) => res.status(400).send(error));

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },

 };