const Joi = require('joi');
const { response } = require('express');
const express = require('express');
const app = express();

app.use(express.json());



const patientsList = [
    { id: 1, firstName: 'Ebaneo Enrique', lastName: 'vk', birthDay: '23/10/1989', gender: 'Male', fileName: 'https://i.pinimg.com/originals/47/89/80/4789805f0254cc84bc3d0e8007c177b8.jpg', diagnosis: 'Hansome', email: 'hi@hi.com', type: 'Doctor' },
    { id: 2, firstName: 'Marya', lastName: 'R.', birthDay: '20/06/1991', gender: 'Female', fileName: 'https://cdn.myanimelist.net/r/360x360/images/characters/5/400410.jpg?s=082051644061d55f196b0c1fa70676dd', diagnosis: 'Beautiful', email: 'hi@hi.com', type: 'Admin' },
    { id: 3, firstName: 'Ragib', lastName: 'I.', birthDay: '11/11/1994', gender: 'Male', fileName: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1G6gu9cNHuSG2fHFfjf38JAUKMOYy8teCbA&usqp=CAU', diagnosis: 'Handsome', email: 'hi@hi.com', type: 'Patient' },
];

app.get('/api/patient', (req, res) => {
    res.send(patientsList);
});

//GET REQUESTS


app.get('/api/patient/:id', function (req, res) {
    // First read existing users.
    // res.send(req.params.id);
    const patient = patientsList.find(c => c.id === parseInt(req.params.id));
    if (!patient) return res.status(404).send('the course not found');
    res.send(patient);
})

// HTTP POST

app.post('/api/patient', (req, res) => {
    const { error } = validateUser(req.body) // ==result.error
    if (error) {
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    const patient = {
        id: patientsList.lenght + 1,
        name: req.body.firstName,
        lastName: req.body.lastName,
        birthDay: req.body.birthDay,
        gender: req.body.gender,
        fileName: req.body.fileName,
        diagnosis: req.body.diagnosis,
        email: req.body.email,
        type: req.body.type



    };
    patientsList.push(patient);
    res.send(patientsList);
});

//HTTP PUT

app.put('/api/patient/:id', (req, res) => {
    //look up 
    //if not existing return 404
    const patient = patientsList.find(c => c.id === parseInt(req.params.id));
    if (!patient) {
        return res.status(404).send('the patient was  not found');
    }
    //validate
    //if invalidad return 400

    //const result = validateCourse(req.body);
    const { error } = validateUser(req.body) // ==result.error
    if (error) {
        //400 bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    //update course
    patient.firstName = req.body.firstName;
    res.send(patient);
});

//http delete

app.delete('/api/patient/:id', (req, res) => {
    //look up course
    //if dosent exist, return 404
    const patient = patientsList.find(c => c.id === parseInt(req.params.id));
    if (!patient) {
        return res.status(404).send('the patient was  not found');
    }
    //delete

    const index = patientsList.indexOf(course);
    patientsList.splice(index, 1);

    res.send(patient);
});


function validateUser(course) {
    const schema = {
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
