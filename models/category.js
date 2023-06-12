const mongoose = require('mongoose');



const categoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon:
    {
        type: String

    },

    color:
    {

        type: String
    }
})

module.exports = mongoose.model('Category', categoriesSchema);