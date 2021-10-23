const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        slug: { type: String, index: true },
        name: {
            first: { type: String, required: true },
            last: { type: String, required: true },
            midle: { type: String, required: false },
        },
        phone: { type: String, required: true },
        active: { type: Boolean, required: true },
        userName: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 20
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['superadmin', 'admin'],

        },
        createdById:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "backOfficeUser",
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
userSchema.pre('save', async function (next) {
    this.slug = slugify(this.name.first+this.name.midle+this.name.last);
    next();
});
const BackOfficeUser = mongoose.model("backOfficeUser", userSchema);

module.exports = BackOfficeUser;