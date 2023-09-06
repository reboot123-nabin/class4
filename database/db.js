const mongoose = require('mongoose');

const connectdb=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/class4')
  .then(() => console.log('Connected!'))
  .catch(()=> console.log('failed'))
}

module.exports=connectdb;

