const Chance = require('chance');
let OTP = require("../models/otp.model");
let User = require("../models/user.model");
const { sendSms, sendSmsGSIE } = require('./smsProvider');
const { cryptoUtil } = require('../utils');
const chance = new Chance();

module.exports = {
  async generateOTP(phoneNumber) {
    code = chance.string({
      length: 4,
      pool: '0123456789',
    });

    console.log({ associatedPhoneNumber: phoneNumber });
    //const sphone = cryptoUtil.getSID(phoneNumber, process.env.JWT_SECRET);
    await OTP.deleteMany({ associatedPhoneNumber: phoneNumber });
    const newOtp = new OTP({ code: code, associatedPhoneNumber: phoneNumber });
    newOtp.save().then((opt) => {
      if (!phoneNumber.includes("+221")) {
         sendSmsGSIE(phoneNumber, `Bienvenue sur xxxx votre code est: ${code}`);
      } else {
         sendSms(phoneNumber, `Bienvenue sur xxxx votre code est: ${code}`);
      }
      return otp;
    }).catch((error) => res.status(400).send(error));

  },

  async verifyOtp({ code, phone }) {
    const exist = await OTP.find({associatedPhoneNumber: phone,code:code});
     
    if (exist && exist.length) {
      await OTP.deleteMany({ associatedPhoneNumber: phone });
      
      const filter = {  phone: phone };
      const update = { active: 'active' };
      let doc = await User.findOneAndUpdate(filter, update);
      return true;
    }
    return false;
  }
}

