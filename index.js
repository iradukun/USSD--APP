var PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Users = require('./model/user');




// CONNECT TO MONGODB
const dbURI = 'mongodb+srv://valens:vava2003@dev.tdp0lg7.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT, printME()))
    .catch((error) => console.log(error)
    );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("RESTFUL API!")
})

app.post('/', (req, res) => {
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;
    let response = '';
    if (text == '') {
        response = `CON 1. Register. \n2. View User(s).`;
    }
    if (text !== '') {
        let get_input_array = text.split('*');
        // console.log(get_input_array.length);
        // console.log(get_input_array);

        if (get_input_array.length === 1) {
            if (parseInt(get_input_array[0]) === 1) {
            response = `CON Enter your Full Name.`;
            }
            else if (parseInt(get_input_array[0]) === 2) {
// erreneous.../not working as expected 
Users.find()
.then((users) => {
users_data = `${
users.length < 1 ? 
`No data found`:
`${
users.map((item, index) => {
return  `${index+1}. ${item.fullname}\n`
}
).join("")}`
}`
response = `END Current users. \n ${users_data}`;
})


response = `END No data found.`;

            }
            else{
        response = `END Invalid input.`;
    }
        }
        else if (get_input_array.length === 2) {
                    response = `CON Enter your ID Number.`;
        } 
        else if (get_input_array.length === 3) {
                response = `CON Please confirm if you want to save the data. \n 1. Confirm \n 2. Cancel`;
        } 
    else if (get_input_array.length === 4) {
        if (parseInt(get_input_array[3]) === 1) {
        const Newblog = new Users();
        Newblog.fullname = get_input_array[0] ;
         Newblog.id_number = get_input_array[1] ;
        Newblog.save();
           response = `END Data saved successfully.` 
        }
     else if (parseInt(get_input_array[3]) === 2) {
            response = `END Process cancelled.`
        }
        else{
        response = `END Invalid input.`;
    }

} else{
    response = `END Error from the application.`
}
    }



    res.set('Content-Type: text/plain');
    res.send(response);
});





function printME() {
    console.log('NODE.JS APP STARTED ON ' + PORT);
}