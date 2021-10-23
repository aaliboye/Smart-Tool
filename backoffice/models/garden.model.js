const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gardenSchema = new Schema(
    {
        slug: { type: String, index: true },
        name: {
            type: String,
            required: true
        },
        description: String,
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            index: true
        },
        gps_shape: [
            {
                latitude: Number,
                longitude: Number,
                altitude: Number
            }
        ],
        gps_central_point: {
            latitude: Number,
            longitude: Number,
            altitude: Number
        },
        raspberry: [
            {
                id: String,
                ip_address: String,
                dns_address: String,
                sensor: [
                    {
                        id: String,
                        type: String,
                        input_pins: [
                            { 
                                number:String,
                                type:String,
                                param:[
                                    {
                                        key:String,
                                        value:String
                                    }
                                ]
                            }
                        ],
                        output_pins: [
                            { 
                                number:String,
                                type:String,
                                param:[
                                    {
                                        key:String,
                                        value:String
                                    }
                                ]
                            }
                        ]
                    }
                ],
                modules: [
                    {
                        id: String,
                        type: String,
                        address: String,
                        sensor: [
                            {
                                id: String,
                                type: String,
                                zone_id:{
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: "zone",
                                    index: true
                                },
                                input_pins: [
                                    { 
                                        number:String,
                                        type:String,
                                        param:[
                                            {
                                                key:String,
                                                value:String
                                            }
                                        ]
                                    }
                                ],
                                output_pins: [
                                    { 
                                        number:String,
                                        type:String,
                                        param:[
                                            {
                                                key:String,
                                                value:String
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                    }
                ]
            }
        ],

    },
    {
        timestamps: true
    }
);
function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}
userSchema.pre('save', async function (next) {
    this.slug = slugify(this.name);
    next();
});
const Garden = mongoose.model("garden", gardenSchema);

module.exports = Garden;