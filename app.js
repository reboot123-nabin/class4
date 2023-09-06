const express = require('express') //define package
const connectdb=require('./database/db');

const router=require('./routes/user_route');
connectdb();
const app = express() //app express feature use
app.use(express.json());//json format data store

app.use(router);//expres use router

app.get('/',  (req, res)=> {
  res.send('Hello World')
})


app.get('/header', function (req, res) {
    res.send('Hello Header')
})

app.listen(4000,function(){
    console.log('server is running at 4000 port')
})