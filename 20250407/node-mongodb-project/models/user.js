const mongoose = require('mongoose');
{ "UserName": "April CHAN", "UserEmail": "aprilchan@gmail.com", "userpassword": 123456, "Enrollmentdate": "02-Feb-2020", "UserAddress" : { "Street": "123 Main St", "City": "Hong Kong", "State": "HK", "Zip": "12345", "Country": "China" }, "UserRole": "user", "UserPhoneNumber": "+85212345678", "UserisVerified": false, "UsercreatedAt" : new Date() },
{ "UserName": "Bonita CHEUNG", "UserEmail": "BonitaCHEUNG@gmail.com", "Enrollmentdate": "03-Mar-2020" },
{ "UserName": "Ceci KWAN", "UserEmail": "CeciKWAN@gmail.com", "Enrollmentdate": "04-Apr-2020"  },
{ "UserName": "DiDi LEE", "UserEmail": "DiDiLEE@gmail.com", "Enrollmentdate": "05-May-2020" },
{  "UserName": "Elis MA", "UserEmail": "ElisMA@gmail.com", "Enrollmentdate": "06-Jun-2020"  },
{ "UserName": "Fiona YUA", "UserEmail": "FionaYUA@gmail.com", "Enrollmentdate": "07-Jul-2020" }

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
    },
    UserEmail: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Optimized email validation
    },
    UserPassword: {
        type: String,
        minlength: 6, // Minimum password length
    },
    Enrollmentdate: {
        type: Date,
        default: Date.now,
    },
    UserAddress: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zip: {
            type: String
        },
        country: {
            type: String
        },
    },
    UserRole: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    UserPhoneNumber: {
        type: String,
        match: /^(?:\+852|852)?[569]\d{7}$/, // Hong Kong phone number pattern
    },
    UserisVerified: {
        type: Boolean,
        default: false, // For email verification
    },
    UserCreatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);