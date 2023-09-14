let express = require('express');
let server = express();
let routes = require('./routes/route');
let mongoose = require('mongoose');
const cors = require('cors');


mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("db is connected")});

    
server.use(cors());
server.use(express.json());
server.use(routes);


server.listen(8080, function check(error){
    if (error){
        console.log("error");
    }else{
        console.log("server start");
    }
});


