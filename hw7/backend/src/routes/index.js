//application-level middleware assign routing, 與前端串接的  API endpoint 

import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import User from "../models/ScoreCard.js" //schema

const router = express.Router()
let addOrUpdate = ["Adding","Updating"];


dotenv.config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((res)=> console.log("mongo db connection created"));

const db = mongoose.connection;
db.on("error",(err)=> console.log(err));
db.once("open",async ()=>{
    

})


const saveUser = async (name,subject,score,res) => {  
    const existing = await User.find({ name,subject}); 
    
    if(Object.entries(existing).length===0) {
        try {    
            const newUser = new User({  name,subject,score });
            console.log("Created user", newUser);
            res.json({message:  'Adding('+name+','+subject+','+ score+')',
              card: "add"})

            return newUser.save();  } 

        catch (e) { throw new Error("User creation error: " + e); }
    }
    else{
        console.log(`data ${name},${subject} exists!!`);
        console.log(existing);
        try {    
            await User.updateOne({name,subject }, { score: score }); 
            res.json({message:  'Updating('+name+','+subject+','+ score+')',
            card: "add"})
            //return ?
              } 
        catch (e) { throw new Error("User updating error: " + e); }
    }
     
};

    const deleteDB = async () => {  
        try {    
            await User.deleteMany({});    
            console.log("Database deleted");  } 
        catch (e) { throw new Error("Database deletion failed"); }
    };

const searchQuery = async (queryType,queryString,res) => {

        if(queryType==="name"){
            const existing = await User.find({ name: queryString});
            let i =Object.entries(existing).length;
            //console.log(existing);

            if(i===0){
                res.json({message: `${queryType}(${queryString}) not found!` });
            }
            else{
                let msg =[];
                let singleMsg =``;
                //console.log(existing,i);
                 for(var j=0;j<i;j++){
                     singleMsg = `(${existing[j].name},${existing[j].subject},${existing[j].score})`
                    //  console.log(singleMsg);
                    msg=[...msg,singleMsg] ;
                 }
                 //console.log(msg);
                 res.json({messages:"query", message:msg});
            }

        }
        else{
            const existing = await User.find({ subject: queryString});
            let i =Object.entries(existing).length;
            //console.log(existing);
            if(i===0){
                res.json({message: `${queryType}(${queryString}) not found!` });
            }
            else{
                let msg =[];
                let singleMsg =``;
                //console.log(existing,i);

                 for(var j=0;j<i;j++){
                     singleMsg = `(${existing[j].name},${existing[j].subject},${existing[j].score})`
                     //console.log(singleMsg);
                    msg=[...msg,singleMsg] ;
                     
                 }
                 //console.log(msg);
                 res.json({messages:"query", message:msg});
            
        }
}}


router.post('/create-card',(req,res)=>{
    const {name,subject,score} = req.body;
    saveUser(name,subject,score,res);
})

router.get('/query-cards',(req,res)=>{
    const queryType=req.query.type;
    const queryString=req.query.queryString;
    searchQuery(queryType,queryString,res);

    })

router.delete('/clear-db',(_,res)=>{
    deleteDB();
    res.json({message: 'Database cleared'})
})

export default router