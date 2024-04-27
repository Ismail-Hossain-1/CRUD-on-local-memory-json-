const express = require('express');
const app = express();
const bodyParser= require('body-parser'); 
const fs = require('fs');



const PORT= 4000;
app.use(bodyParser.json());

const crudOP= require('./routes/CRUDroute');
app.use('/api',crudOP);



app.listen(PORT, ()=>{
    console.log(`running on ${PORT}`);
})
