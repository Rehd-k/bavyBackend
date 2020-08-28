const mongoose = require('mongoose');
const Schema =  mongoose.Schema;



const appGenInfo = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Categories : [{
        Cicon_name: String,
        Cname : String 
    }],
    For: [{
        Ficon_name: String,
        Fname : String 
    }],
    
    Announcements: [String],

    indexExplore: [{
        ProductId : String,
        Price: String,
        Title: String,
        Company: String,
        productSubtitle: String,
        Image: {
            url : String,
            public_id: String

        }
    }]
})
module.exports = mongoose.model('Generic', appGenInfo)