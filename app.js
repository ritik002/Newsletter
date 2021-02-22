//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    const url ="https://us17.api.mailchimp.com/3.0/lists/696ecc20c7";
    const options = {
        method: "POST",
        auth: "Ritik:ac695e90786d5c8ac4175146ce82c1c8-us17"
    }
    const request= https.request(url,options,function(response) {
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }

    })
    app.post("/failure.html",function(req,res){
        res.redirect("/");
    })
    request.write(jsonData);
    request.end(); 
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running at port 3000");
});
