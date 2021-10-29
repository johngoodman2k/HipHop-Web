const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AlbumSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        default: null,
    },
    description: {
        type:String,
        required: true,
    },
    public: {
        type: Boolean,
        default: false
    },
    owner:{
        type:String,
        required:true
    },
    datecreate:{
        type:Date,
        default: Date.now
    },
    dateupdate:{
        type:Date,
        default: Date.now
    },
    song: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    favoriteuser:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
    
})

const Album = mongoose.model('Album',AlbumSchema)
module.exports = Album