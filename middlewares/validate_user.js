module.exports.signup = (req,res,next) => {
    req.checkBody('name')
        .trim().isLength({min:1, max : undefined}).withMessage("Name is required")
        .matches(/^[a-zA-Z ]{2,50}$/).withMessage('Name must contain characters');
    
    req.checkBody('email')
        .trim().isLength({min:1, max : undefined}).withMessage("Email is required")
        .isEmail().withMessage('Invalid Email Id');

    req.checkBody('mobile')
        .trim().isLength({min:1, max : undefined}).withMessage("Mobile number is required")
        .matches(/^(0|\+?91)?[7-9][0-9]{9}$/).withMessage('Invalid Mobile Number');

    req.checkBody('password')
        .trim().isLength({min:1, max : undefined}).withMessage("Password is required")
        .equals(req.body.cpassword).withMessage('Password mismatch');

    var errors = req.validationErrors();
    if(errors) {
        return res.status(500).json({type:false,errType:"validation",error:errors})
    }
    else {
        next();
    }
}

module.exports.signin = (req,res,next) => {
    req.check('username')
        .trim().isLength({min:1, max : undefined}).withMessage("Username is required")

    req.check('password')
        .trim().isLength({min:6, max : undefined}).withMessage("Password is required")

    var errors = req.validationErrors();
    if(errors) {
        return res.status(500).json({type:false,errType:"validation",error:errors})
    }
    else {
        next();
    }
}