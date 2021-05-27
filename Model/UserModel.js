const mongoose =   require('mongoose');  
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    roles: [String],
    confirmation_code: String,
    confirmed: { type: Boolean, default: false },
    facebook: {
        id: String,
        token: String,
        email: String,
        firstName: String,
        lastName: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

module.exports = userModel = mongoose.model("user",userSchema);