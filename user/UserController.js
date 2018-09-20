const express = require("express");
const router = express.Router();
const bodyParse = require("body-parser");

router.use(bodyParse.urlencoded({extended:true}));
router.use(bodyParse.json());
var user = require('./user');


//creates a new user

router.post('/',function(req,res){

    user.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    },function(err,user){
        if(err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(user);
    });
});

//return all the user in the database

router.get('/',function(req,res){
    user.find({},function(err,users){
        if(err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    user.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    user.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    
    user.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});
module.exports = router;