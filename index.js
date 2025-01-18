const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const SharpMulter  =  require("sharp-multer");
const {response} = require('../BackEndRentDocs/utils/response');
const connect = require("../BackEndRentDocs/config/config");


// const router = require('./routes/index');
// const ephemeris = require('ephemeris');

 // const storage =  
 // SharpMulter ({
 //              destination:(req, file, callback) =>callback(null, "uploads"),
 //              imageOptions:{
 //               fileFormat: "jpg",
 //               quality: 80,
 //               resize: { width: 500, height: 500 },
 //                 },
                 
 //              filename: (req, file, callback) => {
 //                console.log("file--->",file)
 //                const uniqueName = `${Date.now()}-${path.extname(file.fileFormat)}`;
 //                callback(null, uniqueName);
 //              },
 //           });

const storage = SharpMulter({
  destination: (req, file, callback) => callback(null, "uploads"),
  imageOptions: {
    fileFormat: "jpg",
    quality: 100,
    resize: { width: 500, height: 500 },
  },
  filename: (req, file) => {
    console.log("File object:", file);

    // Generate a unique name using a timestamp and the desired file format
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;

    return uniqueName
  },
});
const upload  =  multer({ storage });


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({extended:false}));

// const upload = multer({ dest: 'uploads/' }); // Set upload directory




app.use('/insert',upload.single('image'),(req,res)=>{
    console.log("here--")
    try{
        const { name, mobile, address,email } = req.body;
        const image = req.file;
              console.log('Tenant Details:', { name, mobile, address,email,image });
              console.log(`INSERT INTO docs (name,mobile,address,image,user_number) values  ( ${name},${mobile},${address},'${image.filename}',${email})`);
            // console.log("req-->",req);
        connect.query(`INSERT INTO docs (name,mobile,address,image,user_number) values  ( '${name}',${mobile},'${address}','${image.filename}',${email})`, (err, result) => {
            if (err) {
              return console.error('Error executing query', err)
            }
            console.log(result.rows)
      })
          return  response(res,200,"success in try",{})       


        }catch{
         console.log("req-->",req.body);

        return response(res,200,"in catch",{})       
         }


});
app.use('/get',async(req,res)=>{
    console.log("here--",req.body.number);

    try{

        let query = `select name,mobile,address,'http://10.31.97.91:9005/uploads/' || image as image,user_number  from docs where user_number =  ${req.body.number}`;
        console.log("query  ",query)
        let data= await connect.query(query);
        console.log("data.rows[0]",data.rows)
        return  response(res,200,"success in try",{data:data.rows})       


        }catch{
         console.log("req-->",req.body);

        return response(res,200,"in catch",{})       
         }


});

app.use('/getUserDetails',async(req,res)=>{
    // console.log("here--",req.body.number);

    try{

        let query = `select *,0 as totalTenants from docs_users where mobile_number ='${req.body.id}'`;
        console.log("query  ",query)
        let data= await connect.query(query);
        console.log("data.rows[0]",data)
        return  response(res,200,"success in try",{data:data.rows})       


        }catch{
         console.log("req-->",req.body);

        return response(res,200,"in catch",{})       
         }


});

app.use('/getUserExists',async(req,res)=>{
    // console.log("here--",req.body.number);

    try{

        let query = `select * from docs_users where mobile_number ='${req.body.id}'`;
        console.log("query  ",query);
        let data= await connect.query(query);
        console.log("data.rows[0]",data)

        if(data.rowCount==0){
            return  response(res,200,"success in try",{data:false})       

        }
        return  response(res,200,"success in try",{data:true})       

        }catch{
         console.log("req-->",req.body);

        return response(res,200,"in catch",{data:false})       
         }


});

app.use('/createUser',async(req,res)=>{
    console.log("here--",req.body);
    let data = req.body;
    console.log("data",data)

    try{

let query = `
  INSERT INTO docs_users (mobile_number, name, state, district, taluka, goan, docs_digits) VALUES (
    '${data.id}', '${data.name}', '${data.state}', '${data.district}', '${data.talukas}', '${data.villages}', '${data.password}')`;
        console.log("query ",query);
        let result= await connect.query(query);
        console.log("data.rows[0]",result);
        return  response(res,200,"success in try",{data:true})       


        }catch(error){
         console.log("req-->",req.body);
        console.error("Error occurred:", error); // Log the actual error


        return response(res,200,"in catch",{data:false})       
         }


});




app.listen(9005,()=>{
    console.log("listening on port 9005")
});

