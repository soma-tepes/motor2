const { DataTypes } = require('sequelize')

const { db }  = require('../basedata/config')


const Repair = db.define('repairs',{

id:{
    type:DataTypes.INTEGER,
    autoIncrement : true,
    allowNull : false,
    primaryKey : true
},
date:{
    type:DataTypes.DATE,
    allowNull:false,

},
userid:{
    type:DataTypes.ENUM('client','employee'),
    allowNull:false,
    default: false
},
status:{
    type:DataTypes.ENUM('available','notavailable'),
    allowNull:false,
    default:'available'
},
})

module.exports = Repair