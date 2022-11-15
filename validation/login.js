const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput (data) {
    let errors = {}

    data.password = !isEmpty(data.password)? data.password:''
    data.login = !isEmpty(data.login)? data.login:''



    if(Validator.isEmpty(data.login)){
        errors.login = 'Login field must required'
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field must required'
    }
    {/*if(!Validator.isEmail(data.email)){
        errors.login = ' is incorrect'
    }*/}

    return{
        errors,
        isValid: isEmpty(errors)
    }
}