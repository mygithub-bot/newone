const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const db = mysql.createPool({
        host:"localhost",
        user:"root",
        password:"mysql",
        database:"cruddb"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    const sqlInsert ="insert into CONTACTDETAILS(name,email,contact) VALUES ('patil','narayan@gmail.com',82882288282)"
    res.send("Hello Express")
    db.query(sqlInsert,(error,result)=>{
        console.log("error:",error)
        console.log("restlut:",result)
    })
})

app.get("/api/get",(req,res)=>{
    const sqlSelect = "select * from CONTACTDETAILS ";
    db.query(sqlSelect,(error,result)=>{
    //    if(error) res.send(error);
        res.send(result);
    })
})

app.post("/api/post",(req,res)=>{
    const {name,email,contact}=req.body;
    const sqlInsert ="insert into CONTACTDETAILS(name,email,contact) VALUES (?,?,?)"
    db.query(sqlInsert,[name,email,contact],(error,result)=>{
        console.log("error:",error)
        console.log("restlut:",result)
    })
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})