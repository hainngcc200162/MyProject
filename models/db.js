const mongoose = require('mongoose');

const url = "mongodb+srv://Ngochai09252002:Ngochai09252002@cluster0.pvw9ivp.mongodb.net/Restaurant?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true},(err) => {
    if(!err){ console.log("MongoDB Connection Succeeded");}
    else{
        console.log("An Error Occured");
    } 
})

require('./employee.model');
