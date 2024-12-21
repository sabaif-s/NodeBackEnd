require('dotenv').config();
const express=require("express");
const app=express();
const cors=require("cors");
const {sequelize,created}=require("./config/database");
const dataRoute=require("./routes/dataRoute.js");
const data=require("./models/data");
const path=require("path");

app.use(express.urlencoded({ extended: true }));
app.use('/image',express.static(path.join(__dirname,'upload')));
app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5173' // Change this to your Vite app URL
// }));
app.use(cors());
app.use("/data",dataRoute);

app.get("/",(req,res)=>{
    res.json({sabaa:"saboo"});
})

if(created){
    sequelize.sync()
    .then(() => {
      console.log('Database & tables created!');
      
      app.listen(3000, () => {
        console.log(`Server is running on http://localhost:${3000}`);
      });
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}
else{
    console.log("not created either");
}
