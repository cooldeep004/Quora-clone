const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/k_development');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error connecting"));
db.once('open',function(){
    console.log('connected::mongoDB');
})
module.exports=db;