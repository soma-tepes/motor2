const { DataTypes } = require('sequelize')

const { db }  = require('../basedata/config')


const User = db.define('users',{

id:{
    type:DataTypes.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true
},
name:{
    type:DataTypes.STRING,
    allowNull:false,

},
email:{
    type:DataTypes.STRING,
    allowNull:false,
    
},
password:{
    type:DataTypes.STRING,
    allowNull:false,
    
},
role:{
    type:DataTypes.ENUM('client','employee'),
    allowNull:false,
    defaultValue : 'client'
},
status:{
    type:DataTypes.ENUM('available','notavailable'),
    allowNull:false,
    defaultValue:'available'
},
})

module.exports = User