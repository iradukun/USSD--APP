const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({

    fullname: {
        type: String,
        required: true
    },
    id_number: {
        type: String,
        required: true
    }

},
    { timestamps: true }
);

const Users = mongoose.model('users', UserSchema);
module.exports = Users;