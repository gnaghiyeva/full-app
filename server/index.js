const express = require('express')
const app = express()
const crypto = require("crypto")
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
app.use( bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())



const StudentsSchema = new mongoose.Schema({
        name:String,
        surname:String,
        birthdate:String,
        faculty:String,
        occupation:String,
        GPA:Number,
        isMarried:Boolean
})
const StudentModel = mongoose.model('Students',StudentsSchema)

mongoose.connect('mongodb+srv://gulnar_admin:Admin123@spotify.13fyfgh.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('Mongodb connected'));


// const Validation = require("./validation/StudentsScheme")
const PORT = 5050

// const STUDENTS=[
//     {
//         id:1,
//         name:"Gulnar",
//         surname:"Naghiyeva",
//         birthdate:"22-09-2002",
//         faculty:"Applied Mathematic SABAH groups",
//         occupation:"Front end developer",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:2,
//         name:"Nigar",
//         surname:"Naghiyeva",
//         birthdate:"17-05-2002",
//         faculty:"Chemistry",
//         occupation:"teacher",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:3,
//         name:"Gulnar",
//         surname:"Naghiyeva",
//         birthdate:"22-09-2002",
//         faculty:"Applied Mathematic SABAH groups",
//         occupation:"Front end developer",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:4,
//         name:"Nigar",
//         surname:"Naghiyeva",
//         birthdate:"17-05-2002",
//         faculty:"Chemistry",
//         occupation:"teacher",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:5,
//         name:"Gulnar",
//         surname:"Naghiyeva",
//         birthdate:"22-09-2002",
//         faculty:"Applied Mathematic SABAH groups",
//         occupation:"Front end developer",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:6,
//         name:"Nigar",
//         surname:"Naghiyeva",
//         birthdate:"17-05-2002",
//         faculty:"Chemistry",
//         occupation:"teacher",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:7,
//         name:"Gulnar",
//         surname:"Naghiyeva",
//         birthdate:"22-09-2002",
//         faculty:"Applied Mathematic SABAH groups",
//         occupation:"Front end developer",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:8,
//         name:"Nigar",
//         surname:"Naghiyeva",
//         birthdate:"17-05-2002",
//         faculty:"Chemistry",
//         occupation:"teacher",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:9,
//         name:"Gulnar",
//         surname:"Naghiyeva",
//         birthdate:"22-09-2002",
//         faculty:"Applied Mathematic SABAH groups",
//         occupation:"Front end developer",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:10,
//         name:"Nigar",
//         surname:"Naghiyeva",
//         birthdate:"17-05-2002",
//         faculty:"Chemistry",
//         occupation:"teacher",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:11,
//         name:"Gulnar",
//         surname:"Naghiyeva",
//         birthdate:"22-09-2002",
//         faculty:"Applied Mathematic SABAH groups",
//         occupation:"Front end developer",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:12,
//         name:"Nigar",
//         surname:"Naghiyeva",
//         birthdate:"17-05-2002",
//         faculty:"Chemistry",
//         occupation:"teacher",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:13,
//         name:"Gulnar",
//         surname:"Naghiyeva",
//         birthdate:"22-09-2002",
//         faculty:"Applied Mathematic SABAH groups",
//         occupation:"Front end developer",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:14,
//         name:"Nigar",
//         surname:"Naghiyeva",
//         birthdate:"17-05-2002",
//         faculty:"Chemistry",
//         occupation:"teacher",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:15,
//         name:"Gulnar",
//         surname:"Naghiyeva",
//         birthdate:"22-09-2002",
//         faculty:"Applied Mathematic SABAH groups",
//         occupation:"Front end developer",
//         GPA:95,
//         isMarried:false
//     },
//     {
//         id:16,
//         name:"Nigar",
//         surname:"Naghiyeva",
//         birthdate:"17-05-2002",
//         faculty:"Chemistry",
//         occupation:"teacher",
//         GPA:95,
//         isMarried:false
//     },
    
// ]


app.get('/api', (req, res) => {
  res.send('Hello World!')
})

//get all stundent
app.get("/api/students",async (req,res)=>{
    const {name} = req.query;
    const students = await StudentModel.find();
    let page = req.query.page
    let limit = req.query.limit
    if(page&&limit){
        let start = (page-1)*limit
        let end = (page*limit)
        res.send({
            totalCount:students.length,
            totalPage:Math.ceil(students.length/limit),
            data:students.slice(start,end)
        })
    }

    if(name===undefined){
       res.status(200).send({
        data:students,
        message:"data get success"
       })
    }
    
   
    else{
        res.status(200).send({
            data:students.filter((x)=>x.name.toLowerCase().trim().includes(name.toLowerCase().trim())),
            message:"data get success"
        })
    }
  
});


//get student by id
app.get("/api/students/:id",async(req,res)=>{
    const id = req.params.id
    const student = await StudentModel.findById(id);
    console.log('student found', student);
    if(!student){
        res.status(204).send("student not found")
    } 
    else{
        res.status(200).send({
            data:student,
            message:"student is finded"
        })
    }
})

//delete student
app.delete("/api/students/:id", async(req,res)=>{
    const id = req.params.id
    const student = await StudentModel.findByIdAndDelete(id);
       
    if(student===undefined){
        res.status(404).send("student not found")
    }else{
        res.status(203).send({
            data:student,
            message:"student succesfully deleted"
        })
    }
})

//post
app.post("/api/students", async(req,res)=>{
    const{name,surname,birthdate,faculty,occupation,isMarried,GPA} = req.body
    if(name!=="" || surname!==""){
        const newStudent = new StudentModel({
            name: name,
            surname: surname,
            birthdate:birthdate,
            faculty:faculty,
            occupation:occupation,
            isMarried:isMarried,
            GPA:GPA
          });

        //   STUDENTS.push(newStudent);
        await newStudent.save();
        res.status(201).send("created succesfully");
    }
    else{
        res.status(404).send("created not succesfully");
    }
    });

//edit put
//put u dersde hele yazmamisiq
app.put("/api/students/:id",(req, res) => {
    const id = req.params.id;
    const{name,surname,birthdate,faculty,occupation,isMarried,GPA} = req.body
    const existedStudent = STUDENTS.find((x) => x.id == id);
    if (existedStudent == undefined) {
      res.status(404).send("artist not found!");
    } else {
      if (name) {
        existedStudent.name = name;
      }
      if (surname) {
        existedStudent.surname = surname;
      }
      if (birthdate) {
        existedStudent.birthdate = birthdate;
      }
      if (faculty) {
        existedStudent.faculty = faculty;
      }
      if (occupation) {
        existedStudent.occupation = occupation;
      }
      if (isMarried) {
        existedStudent.isMarried = isMarried;
      }
      if (GPA) {
        existedStudent.GPA = GPA;
      }
      res.status(200).send(`student: ${existedStudent.name}`);
    }
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})