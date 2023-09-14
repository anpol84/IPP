let mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telephone: {
        mobile: {
            type: String,
            required: true
        },
        home:{ 
            type: String,
            required: true
        },
    }
});

module.exports = mongoose.model("contacts", contactSchema)