const express = require('express') ;
const bodyParser = require('body-parser') ;
const app = express() ;

const cors = require('cors') ;
const mysql = require("mysql")

const  db  = {
    host: "localhost",
    user: "root",
    password: "mySQL@2020",
    database: "cruddatabase",
    port: 3306,
    insecureAuth : true
};      
app.use(cors()) ;
app.use(express.json()) ; 
const con = mysql.createConnection(db);

app.use(bodyParser.urlencoded({extended:true})) ;

app.post("/register",(req,res)=>{
    const username = req.body.username ;
    const password = req.body.password ;
    const sqlInsert = "INSERT INTO `loginsystem` (username,password) VALUES (?, ?)" ;
    con.query(sqlInsert,[username,password],(err,result)=>{
        console.log(err) ;
    }) 

}) 

app.post("/login",(req,res)=>{
    const username = req.body.username ;
    const password = req.body.password ;
    const sqlInsert = "SELECT * FROM `loginsystem` WHERE username = ? AND password = ? " ;
    con.query(sqlInsert,[username,password],(err,result)=>{
        if (err) {res.send({err: err}) ;}
        if (result.length > 0){res.send(result)}
        else {
            res.send({ "message": "wrong combination"}) ;
        }

        })
        
    

}) ;

app.get("/api/get", (req,res)=>{
    const sqlSelect = "SELECT * FROM `birthdays` " ;
    con.query(sqlSelect,(err,result)=>{
        res.send(result) ;
    }) ;
}) ;

app.post("/api/insert",(req,res)=>{

    const Name = req.body.Name ;
    const DOB = req.body.DOB ;
    const month = req.body.month ;
    const sqlInsert = "INSERT INTO `birthdays` (Name , DOB , month) VALUES (?, ? , ?)" ;
    con.query(sqlInsert,[Name,DOB,month],(err,result)=>{
        console.log(err) ;
    }) 

}) ;

app.delete("/api/delete/:Name",(req,res)=>{

    const name = req.params.Name ;
    
    const sqlDelete = "DELETE FROM `birthdays` WHERE Name = ? " ;
    con.query(sqlDelete,name,(err,result)=>{
        if (err) console.log(err) ;
    }) 

}) ;

app.put("/api/update",(req,res)=>{

    const name = req.body.Name ;
    const dob = req.body.DOB ;
    const month = req.body.month ;
    const sqlUpdate = "UPDATE `birthdays` SET  DOB = ?,month = ? WHERE Name = ? " ;
    con.query(sqlUpdate,[dob,month,name],(err,result)=>{
        if (err) console.log(err) ;
    }) 

}) ;
/*app.get("/",(req,res)=>{
    const sqlInsert = "INSERT INTO `birthdays` (Name , DOB) VALUES ('xyz', '12/2/2001')" ;
    con.query(sqlInsert, (err, result)=>{
        res.send("hi disha") ;
    });

}) ;*/
;

app.listen(3001, ()=>{
    console.log("Running on port 3001");
})