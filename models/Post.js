const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: String,
    area: String,
    content: String,
    img: String,
    lat: Number,
    lon: Number,
    poster: { 
        type: mongoose.Schema.ObjectId, 
        ref: "User" 
    },
    comments: [
        {
            text: String,
            createdAt: { type: Date, default: Date.now },
            poster: { 
                type: mongoose.Schema.ObjectId, 
                ref: "User" 
            }
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Post", PostSchema);