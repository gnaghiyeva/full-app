const express = require('express')
const app = express()
const crypto = require("crypto")
const cors = require('cors')
const bodyParser = require('body-parser')
app.use( bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

// const Validation = require("./validation/StudentsScheme")
const PORT = 5050

const STUDENTS=[
    {
        id:1,
        name:"Gulnar",
        surname:"Naghiyeva",
        birthdate:"22-09-2002",
        faculty:"Applied Mathematic SABAH groups",
        occupation:"Front end developer",
        GPA:95,
        isMarried:false
    },
    {
        id:2,
        name:"Nigar",
        surname:"Naghiyeva",
        birthdate:"17-05-2002",
        faculty:"Chemistry",
        occupation:"teacher",
        GPA:95,
        isMarried:false
    },
    {
        id:3,
        name:"Gulnar",
        surname:"Naghiyeva",
        birthdate:"22-09-2002",
        faculty:"Applied Mathematic SABAH groups",
        occupation:"Front end developer",
        GPA:95,
        isMarried:false
    },
    {
        id:4,
        name:"Nigar",
        surname:"Naghiyeva",
        birthdate:"17-05-2002",
        faculty:"Chemistry",
        occupation:"teacher",
        GPA:95,
        isMarried:false
    },
    {
        id:5,
        name:"Gulnar",
        surname:"Naghiyeva",
        birthdate:"22-09-2002",
        faculty:"Applied Mathematic SABAH groups",
        occupation:"Front end developer",
        GPA:95,
        isMarried:false
    },
    {
        id:6,
        name:"Nigar",
        surname:"Naghiyeva",
        birthdate:"17-05-2002",
        faculty:"Chemistry",
        occupation:"teacher",
        GPA:95,
        isMarried:false
    },
    {
        id:7,
        name:"Gulnar",
        surname:"Naghiyeva",
        birthdate:"22-09-2002",
        faculty:"Applied Mathematic SABAH groups",
        occupation:"Front end developer",
        GPA:95,
        isMarried:false
    },
    {
        id:8,
        name:"Nigar",
        surname:"Naghiyeva",
        birthdate:"17-05-2002",
        faculty:"Chemistry",
        occupation:"teacher",
        GPA:95,
        isMarried:false
    },
    {
        id:9,
        name:"Gulnar",
        surname:"Naghiyeva",
        birthdate:"22-09-2002",
        faculty:"Applied Mathematic SABAH groups",
        occupation:"Front end developer",
        GPA:95,
        isMarried:false
    },
    {
        id:10,
        name:"Nigar",
        surname:"Naghiyeva",
        birthdate:"17-05-2002",
        faculty:"Chemistry",
        occupation:"teacher",
        GPA:95,
        isMarried:false
    },
    {
        id:11,
        name:"Gulnar",
        surname:"Naghiyeva",
        birthdate:"22-09-2002",
        faculty:"Applied Mathematic SABAH groups",
        occupation:"Front end developer",
        GPA:95,
        isMarried:false
    },
    {
        id:12,
        name:"Nigar",
        surname:"Naghiyeva",
        birthdate:"17-05-2002",
        faculty:"Chemistry",
        occupation:"teacher",
        GPA:95,
        isMarried:false
    },
    {
        id:13,
        name:"Gulnar",
        surname:"Naghiyeva",
        birthdate:"22-09-2002",
        faculty:"Applied Mathematic SABAH groups",
        occupation:"Front end developer",
        GPA:95,
        isMarried:false
    },
    {
        id:14,
        name:"Nigar",
        surname:"Naghiyeva",
        birthdate:"17-05-2002",
        faculty:"Chemistry",
        occupation:"teacher",
        GPA:95,
        isMarried:false
    },
    {
        id:15,
        name:"Gulnar",
        surname:"Naghiyeva",
        birthdate:"22-09-2002",
        faculty:"Applied Mathematic SABAH groups",
        occupation:"Front end developer",
        GPA:95,
        isMarried:false
    },
    {
        id:16,
        name:"Nigar",
        surname:"Naghiyeva",
        birthdate:"17-05-2002",
        faculty:"Chemistry",
        occupation:"teacher",
        GPA:95,
        isMarried:false
    },
    
]


app.get('/api', (req, res) => {
  res.send('Hello World!')
})

//get all stundent
app.get("/api/students",(req,res)=>{
    res.send({
        data:STUDENTS,
        message:'data get succesfully'
    })
})
// app.get("/students/paginate", paginatedResults(STUDENTS), (req, res) => {
//     res.json(res.paginatedResults);
//   });

// function paginatedResults(model) {
//     // middleware function
//     return (req, res, next) => {
//       const page = parseInt(req.query.page);
//       const limit = parseInt(req.query.limit);
   
//       // calculating the starting and ending index
//       const startIndex = (page - 1) * limit;
//       const endIndex = page * limit;
   
//       const results = {};
//       if (endIndex < model.length) {
//         results.next = {
//           page: page + 1,
//           limit: limit
//         };
//       }
   
//       if (startIndex > 0) {
//         results.previous = {
//           page: page - 1,
//           limit: limit
//         };
//       }
   
//       results.results = model.slice(startIndex, endIndex);
   
//       res.paginatedResults = results;
//       next();
//     };
//   }

//get student by id
app.get("/api/students/:id",(req,res)=>{
    const id = req.params.id
    const student = STUDENTS.find((x)=>x.id==id)
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
app.delete("/api/students/:id",(req,res)=>{
    const id = req.params.id
    const student = STUDENTS.find((x)=>x.id==id)
   
    if(student===undefined){
        res.status(404).send("student not found")
    }else{
        const index = STUDENTS.indexOf(student)
        STUDENTS.splice(index,1)
        res.status(203).send({
            data:student,
            message:"student succesfully deleted"
        })
    }
})

//post
app.post("/api/students",(req,res)=>{
    const{name,surname,birthdate,faculty,occupation,isMarried,GPA} = req.body
    if(name!=="" || surname!==""){
        const newStudent = {
            id: crypto.randomUUID(),
            name: name,
            surname: surname,
            birthdate:birthdate,
            faculty:faculty,
            occupation:occupation,
            isMarried:isMarried,
            GPA:GPA
          };

          STUDENTS.push(newStudent);
          res.status(201).send("created succesfully");
    }
    else{
        res.status(404).send("created not succesfully");
    }
    });

//edit put
app.put("/api/students/:id", (req, res) => {
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