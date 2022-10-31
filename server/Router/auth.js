const router = require('express').Router();
const bcrypt = require('bcryptjs');
const con = require('../connection');

const JWT = require('jsonwebtoken');


router.post('/Student', (req,res)=>{
    const {userName, email, password} = req.body;
    const role = 0;
    try{
        con.query(`SELECT * FROM userRegister WHERE email = ?`, [email], async (error, result)=>{
            if(result.length > 0){
                res.status(401).json({error : 'User Already Exist'});
                return;
            }
            const hash = await bcrypt.hash(password, 10);

            con.query(`INSERT INTO userRegister (userName, email, password, role) VALUES (?,?,?,?)`, [userName, email, hash, role], (error, result)=>{
                if(error){
                    res.status(401).json({error : "Error in submission of data "});
                    return
                }
                console.log(result);
                res.status(201).send({message : "Successfull Registeration 😃"});
            })
        })
    }
    catch{
        console.log(error);
        res.status(401).send({message : "There is something wrong ! Please try later"});
    }
})

router.post('/Admin', (req,res)=>{
    const {userName, email, password} = req.body;
    const role = 1;
    try{
        con.query(`SELECT * FROM adminRegister WHERE email = ?`, [email], async (error, result)=>{
            if(result.length > 0){
                res.status(401).json({error : 'User Already Exist'});
                return;
            }
            const hash = await bcrypt.hash(password, 10);

            con.query(`INSERT INTO adminRegister (userName, email, password, role) VALUES (?,?,?,?)`, [userName, email, hash, role], (error, result)=>{
                if(error){
                    res.status(401).json({error : "Error in submission of data "});
                    return
                }
                console.log(result);
                res.status(201).send({message : "Successfull Registeration 😃"});
            })
        })
    }
    catch{
        console.log(error);
        res.status(401).send({message : "There is something wrong ! Please try later"});
    }
})

router.post('/Adminlogin', (req,res)=>{
    const{ email , password} = req.body;
    try{
        con.query(`SELECT * FROM adminRegister WHERE email = ?`, [email], async (error, result) => {
            if(result.length <= 0){
                res.status(401).json({error : "Invalid Credentials !"})
                return;
            }
            if(error){
                res.status(401).json({message : "There is something wrong"})
                return;
            }

            const pass = result[0].password;
            let isMatch = await bcrypt.compare(password, pass);
            if(!isMatch){
                res.status(401).json({error : "Invalid Password !"})
                return;
            }

            let NameOfuser = result[0].userName;
            const token = await JWT.sign(
                {
                userName : NameOfuser,
                email : email
                },
                process.env.JWT_SECRET_KEY_ADMIN,
                {
                    expiresIn : "24h"
                }
            )
            res.status(201).json({token, message : 'Loged in 😃', role : result[0].role})
        })
    }
    catch{
        return res.status(500).json({ error: error.message });
    }
})

router.post('/Studentlogin', (req,res)=>{
    const{ email , password} = req.body;
    try{
        con.query(`SELECT * FROM userRegister WHERE email = ?`, [email], async (error, result) => {
            if(result.length <= 0){
                res.status(401).json({error : "Invalid Credentials !"})
                return;
            }
            if(error){
                res.status(401).json({message : "There is something wrong"})
                return;
            }

            const pass = result[0].password;
            let isMatch = await bcrypt.compare(password, pass);
            if(!isMatch){
                res.status(401).json({error : "Invalid Password !"})
                return;
            }

            let NameOfuser = result[0].userName;
            const token = await JWT.sign(
                {
                userName : NameOfuser,
                email : email
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn : "24h"
                }
                )
            res.status(201).json({token, message : 'Loged in 😃', role : result[0].role})
        })
    }
    catch{
        return res.status(500).json({ error: error.message });
    }
})

module.exports = router;