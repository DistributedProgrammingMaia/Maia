const express = require('express');
const expbars  = require('express-handlebars');
const bodyParser = require('body-parser');
const flash= require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();

const username = "sys";
const password = "admin";

app.use(session({
    secret:'Keep it secret',
    name:'uniqueSessionID',
    resave: true,
    saveUninitialized:false
}))

app.post('/authenticate', bodyParser.urlencoded({ extended: true }) ,(req,res,next)=> {
    // Actual implementation would check values in a database
    if(req.body.username == username && req.body.password == password) {
        //res.locals.username = req.body.username;
        req.session.loggedIn = true;
        req.session.username = req.body.username;
        console.log(req.session);
        res.redirect('/');
    } else {
        res.sendStatus(401);
    }
})

//FOLDER FOR STATIC RESOURCES
app.use('/css' , express.static(__dirname + '/assets/css'));
app.use('/img' , express.static(__dirname + '/assets/img'));
app.use('/js' , express.static(__dirname + '/assets/js'));
app.use('/plugins' , express.static(__dirname + '/assets/plugins'));


app.engine('handlebars', expbars());
app.set('view engine', 'handlebars');



app.listen(3000, ()=>{
    console.log('Server is listening on port 3000');
})



app.get('/', (req, res) => {
    res.render('index', {title: 'Online platform to consult with Optometrists', layout: 'main'});
})


//ROUTE FOR LOGIN PAGE

app.get('/login', function(req, res) {
    res.render('login', {layout: 'login'});
});



app.get('/logout',(req,res)=> {
    req.session.destroy((err)=>{});
    res.redirect('/')

})

//Route for register

app.get('/register', function(req, res) {
    res.render('register', {layout: 'login'});
});
//Route for cabinet

app.get('/cabinet', function(req, res) {
    res.render('cabinetPersonal', {layout: 'cabinet'});
});

//Route for patientsList
app.get('/patientsList', function(req, res) {
    res.render('patientsList', {layout: 'cabinet'});
});

//Route for createRecord
app.get('/createRecord', function(req, res) {
    res.render('createRecord', {layout: 'cabinet'});
});

//Route for createRecord
app.get('/viewProfile', function(req, res) {
    res.render('viewProfile', {layout: 'cabinet'});
});







