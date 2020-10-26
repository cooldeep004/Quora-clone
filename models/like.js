const mongoose=require('mongoose');


const likeSchema = new mongoose.Schema({
   
    user :{
        type: mongoose.Schema.ObjectId,
       
    },

    likeable:{
        type: mongoose.Schema.ObjectId,
        requird : true,
        refPath :'onModel'
    },
    onModel:{
        type:String,
        requird:true,
        enum:['Post' ,'Comment']
    }
},{
    timestamps :true
});

const Like= mongoose.model('Like', likeSchema);
module.exports = Like;