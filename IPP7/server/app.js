const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')

app.use(cors())

mongoose.connect("mongodb://localhost:27017/practice7", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("db is connected")});
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(4000, ()=> {
    console.log("listening for requests on 4000 port")
})