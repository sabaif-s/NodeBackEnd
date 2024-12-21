const express=require("express");
const Router=express.Router();
const data=require("../models/data");
const upload=require("../multer/multerConfig");



Router.get("/",(req,res)=>{
   res.json({here:"here in routes"});
});

Router.post("/data",upload.single("image"),async (req, res) => {
    try {
      const { description, name, selectedMusic,uniqueId } = req.body;
      console.log(req.body);
     const profileImage=req.file.filename;
      // Validate the required fields
      if (!description || !name || !selectedMusic) {
        return res.status(400).json({ error: "Missing required fields." });
      }
      const newData = {
        description,
        name,
        selectedMusic,
        profileImage,
      
      };
  
      const newCreatedData = await data.create({
        userID: uniqueId,
        data: [newData],
      });
  
      // Respond with the created data
      return res.status(201).json(newCreatedData);
      
    } catch (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({ error: "An error occurred while creating data." });
    }
  });

  Router.get("/getUserData/:userID",async(req,res)=>{
       try{
            const userID=req.params.userID;
            const dataBack= await data.findOne({where:{
              userID:userID
            }});
            if(dataBack){
              console.log(dataBack);
              res.json(dataBack);
            }
            else{
              return res.status(404).json({error:"no such user"});
            }
       }
       catch(err){
        console.log(err);
        return res.status(500).json({error:"an error occurred while fetching"});
       }
  });

module.exports=Router;