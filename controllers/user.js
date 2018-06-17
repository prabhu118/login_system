const passport              = require('passport');
const User                  = require('../models/user');
const bcrypt                = require('bcrypt');
const saltRounds            = 10 ;

module.exports.signup = (req,res) => {

    var user = new User();
    user.name = req.body.name;
    user.mobile = req.body.mobile;
    user.email = req.body.email.toLowerCase();
    user.password = bcrypt.hashSync(req.body.password, saltRounds);

    user.save().then((data) => {
        if(data) return res.status(201).json({type:true})
        if(!data) return res.status(500).json({type:false});
    }).catch((err) => {
        console.log(err)
    })
}

// bcrypt.compareSync(myPlaintextPassword, hash);
module.exports.signin = (req,res) => {
    passport.authenticate('local-signin', (err,user,info) => {

    })
}