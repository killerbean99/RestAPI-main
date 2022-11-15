const mongoose = require('mongoose')
const Schema = mongoose.Schema
const favorite = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    },
    posts:[{
        type: Schema.Types.ObjectId,
        ref:'cars'
    }]
})

module.exports = Favorite = mongoose.model('favotite',favorite)