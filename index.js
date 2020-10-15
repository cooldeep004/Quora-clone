const express=require('express');
const app=express();
const port=8000;
const expressLayout =require('express-ejs-layouts');
const db=require('./config/mongoose');
app.use(expressLayout);

//extract style and scripts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//look for the assets file like css nd js
app.use(express.static('./assets'))

//use express router
app.use('/',require('./routes'));

//set up the views
app.set('view engine','ejs');
app.set('views','./views');





// to run express server
app.listen(port,function(err){
    if(err){
        console.log(`error${err}`)
        return;  
    }
    // interpolation
    console.log(`port${port}`);
});
/*
npm init
npm install express  app.listen
create router and controllers
npm install ejs and set view engine
npm install express-ejs-layouts for partial and layouts _header and _footer
app.set layout extract to extract the styles
npm install mongoose to connect to database and fill mongoose.js 


*/