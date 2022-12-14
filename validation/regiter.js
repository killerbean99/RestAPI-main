const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput (data) {
    let errors = {}

    data.login = !isEmpty(data.login)? data.login:''
    data.email = !isEmpty(data.email)? data.email:''
    data.password = !isEmpty(data.password)? data.password:''
    {/*data.password2 = !isEmpty(data.password2)? data.password2:''*/}


    if(!Validator.isLength(data.login,{min:3,max:30})){
        errors.login = "login must be between 3 and 30 characters"
    }
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field must required'
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field must required'
    }
    {/*if(!Validator.equals(data.password,data.password2)){
        errors.password2 = 'Passwords must match'
    }*/}
    if(!Validator.isLength(data.password,{min:6,max:30})){
        errors.password = 'Password must be at least 6 characters'
    }
    {/*if(Validator.isEmpty(data.password2)){
        errors.email = 'Confirm Password field must required'
    }*/}
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is incorrect'
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}