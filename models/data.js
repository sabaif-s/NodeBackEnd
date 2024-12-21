const {sequelize}=require("../config/database");
const {DataTypes}=require("sequelize");

const data=sequelize.define("data",{
  userID:{
    type:DataTypes.STRING,
    unique:true
  },
  data:{
    type:DataTypes.JSON,
  }
});

module.exports=data;
