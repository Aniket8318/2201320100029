const mongoose = require('mongoose');


const Sch = new mongoose.Schema(
    {
        shortid:{
            type:String,
            required:true,
            unique:true,
        },
        actualurl:{
            type:String,
            required:true
        },
        ipadd:{
            type:String,
            required:true
        },
        
    },{ timestamps: true }
);

const url = mongoose.model('url',Sch);

module.exports=url;