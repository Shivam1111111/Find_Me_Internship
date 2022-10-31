const express = require ('express');
const app = express();
const con = require('./connection');
const multer = require('multer');
const path = require('path');   

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
}));


// https://expressjs.com/en/resources/middleware/multer.html 

app.use('/images',express.static(path.resolve('../public/uploaded')));

const storage = multer.diskStorage({  // storage is object
    //Each function gets passed both the request (req) and some information about the file (file) to aid with the decision.

    destination : function(req,file,cb){   // destination and file name is noting but function as key value pair of storage object
        cb(null,'../public/uploaded/')  // setting the destination through callback function cd.
    },

    // Filename is used to determine what the file should be named inside the folder. If no filename is given, each file will be given
    // a random name that doesn’t include any file extension.
    // file is variable which contain actual file
    filename:(req,file,cb)=>{
        // cb(null,Date.now() + path.extname(file.originalname));
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
// request.file gives the following stats, from which you would just need to pick request.file.originalname
// or request.file.filename to get the new filename created by nodejs app.

const upload = multer({ storage : storage }) // this whole is middleware and multer is object with Storage key and another storag object is value with all detais of file .

app.post('/upload', upload.single('file') ,(req,res)=>{
    // console.log(req.file.filename);
    if (!req.file) {
        console.log("No file upload");
    } else{
        // console.log(req.file.originalname)
        var imgsrc = '/images/' + req.file.filename
        var imgsrc2 = '/images/' + req.file.filename
        var insertData = "INSERT INTO Image(Image1, Image2) VALUES (?,?)"
        con.query(insertData, [imgsrc, imgsrc2], (err, result) => {
            if (err) throw err
            console.log("file uploaded");
            res.send("Upload File");
        })
    }
})

app.get('/getImage', (req,res)=>{
    con.query('SELECT Image1 FROM Image',(error,result)=>{
        if(error){
            res.send(error);
            console.log(error);
        }        
        else{
            res.send(result);
            console.log(result);
        }
    });
})

app.listen(3500,()=>{
    console.log('Your server at 3500');
})                   