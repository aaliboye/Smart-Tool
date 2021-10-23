const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personSchema = new Schema(
    {
        slug: { type: [String], index: true },
        name: [{
            first: {type: String,required: true},
            last: String,
            midle: String,
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                index: true
            },
            visible: {
                type: Boolean,
                default: true,
            },
            vote: {
                type: Number,
                default: 0,
            }
        }],
        gender: [{
            value: {
                type: String,
                enum: ['M', 'F']
            },
            visible: {
                type: Boolean,
                default: true,
            },
            vote: {
                type: Number,
                default: 0,
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                index: true
            }

        }],
        dateofbirth: [{
            value: {
                type: Date
            },
            visible: {
                type: Boolean,
                default: true,
            },
            vote: {
                type: Number,
                default: 0,
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                index: true
            }

        }],
        dateofdeath: [{
            value: {
                type: Date
            },
            visible: {
                type: Boolean,
                default: true,
            },
            vote: {
                type: Number,
                default: 0,
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                index: true
            }

        }],
        address: [{
            value: {
                type: String,
                required: true
            },
            visible: {
                type: Boolean,
                default: true,
            },
            vote: {
                type: Number,
                default: 0,
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                index: true
            }

        }],
        phone: [{
            value: {
                type: String,
                required: true
            },
            visible: {
                type: Boolean,
                default: true,
            },
            vote: {
                type: Number,
                default: 0,
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                index: true
            }

        }],
        position: [{
            latitude: Number,
            longitude: Number,
            altitude: Number,
            visible: {
                type: Boolean,
                default: true,
            },
            vote: {
                type: Number,
                default: 0,
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                index: true
            }
        }],

        email: [{
            value: {
                type: String,
                required: true
            },
            visible: {
                type: Boolean,
                default: true,
            },
            vote: {
                type: Number,
                default: 0,
            },
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                index: true
            }

        }],
        parent: {
            father: [
                {
                    _id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "person",
                        index: true
                    },
                    name: {
                        first: String,
                        last: String,
                        midle: String
                    },
                    slug: String,
                    visible: {
                        type: Boolean,
                        default: true,
                    },
                    vote: {
                        type: Number,
                        default: 0,
                    },
                    user_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "user",
                        index: true
                    }
                }
            ],
            mother: [
                {
                    _id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "person",
                        index: true
                    },
                    name: {
                        first: String,
                        last: String,
                        midle: String
                    },
                    slug: String,
                    visible: {
                        type: Boolean,
                        default: true,
                    },
                    vote: {
                        type: Number,
                        default: 0,
                    },
                    user_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "user",
                        index: true
                    }
                }
            ],
        },
        sons: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "person",
                    index: true
                },
                name: {
                    first: String,
                    last: String,
                    midle: String
                },
                slug: String,
                visible: {
                    type: Boolean,
                    default: true,
                },
                vote: {
                    type: Number,
                    default: 0,
                },
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                    index: true
                }
            }
        ],
        marriage: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "person",
                    index: true
                },
                name: {
                    first: String,
                    last: String,
                    midle: String
                },
                slug: String,
                visible: {
                    type: Boolean,
                    default: true,
                },
                vote: {
                    type: Number,
                    default: 0,
                },
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                    index: true
                }
            }
        ],
        events: [
            {
                title: String,
                body: String,
                startdate: Date,
                enddate: Date,
                place: String,
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                    index: true
                },
                visible: {
                    type: Boolean,
                    default: true,
                },
                vote: {
                    type: Number,
                    default: 0,
                },
                sourcelink: [
                    {
                        title: String,
                        url: String,
                        type: String
                    }
                ]
            }
        ],
        links: [
            {
                title: String,
                url: String,
                type: String,
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "user",
                    index: true
                },
                visible: {
                    type: Boolean,
                    default: true,
                },
                vote: {
                    type: Number,
                    default: 0,
                },
            }
        ],
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            index: true
        }

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
personSchema.pre('save', async function (next) {
    this.slug.push(slugify(this.name.first + this.name.midle + this.name.last));
    next();
});
const Person = mongoose.model("person", personSchema);
module.exports = Person;