const express = require('express')
const bcrypt  = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')

const passport = require('passport')

const secret = require('../../config/keys').secretOrKey

const router = express.Router()

//Car Model
const Car = require('../../models/Car')
//User Model
const User = require('../../models/User')
//Favorite Model
const Favorite = require('../../models/Favorite')
const { populate } = require('../../models/User')
const { route } = require('./users')

//@route GET /test 
//@desc test API
//PUBLIC
router.get('/test',(req,res)=>{
    res.json('This is car controller')
})


//@route POST /add_post 
//@desc Add new POST
//PRIVATE
router.post('/add_post',
    passport.authenticate('jwt', { session: false }),
    (req,res)=>{
        const newCar = new Car({
            user: req.user.id,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            vin: req.body.vin,
            titleStatus: req.body.titleStatus,
            location: req.body.location,
            seller: req.body.seller,
            engine: req.body.engine,
            drivetrain: req.body.drivetrain,
            transmission: req.body.transmission,
            bodyStyle: req.body.bodyStyle,
            exteriorColor: req.body.exteriorColor,
            interiorColor: req.body.interiorColor,
            date: req.body.date
        })
        newCar.save()
            .then(car=>{
                res.json(car)
            })
            .catch(err=>console.log('Error: '+err))
    }
)




//@route POST /add_post 
//@desc Get all posts
//PUBLIC
router.get('/post/all/:limit',
    (req,res)=>{
        Car.find().limit(req.params.limit)
            .then(cars=>{
                if(cars)
                    res.json(cars)
                else
                    res.status(200).json('Error')
            })
    }
)


//@route GET /post/:user_id 
//@desc Get user's posts
//PUBLIC
router.get('/post/user/:userId',(req,res)=>{
    const id = req.params.userId
    User.findById(id)
        .then(user=>{
            if(!user)
                res.status(400).json('User not found')
            else{
                Car.find({user:id})
                    .sort({date:-1})
                    .populate('user',['login','email'])
                    .then(cars=>{
                        if(cars){
                            res.send(cars)
                        }else
                            res.json('Posts not found')
                    })
            }
        })
    
})



//@route GET /post/:id 
//@desc Get post by id
//PUBLIC
router.get('/post/:id',(req,res)=>{
    const id = req.params.id
    
    Car.findById(id)
        .populate('user',['login','email'])
        .then(car=>{
            if(car){
                res.json(car)
            }else
                res.status(400).json('Post not found')
        })
})



//@route DELETE /post/delete/:id 
//@desc Delete post by id
//PRIVATE
router.delete('/post/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req,res)=>{
        const id = req.params.id;
        Car.findById(id)
            .then(post=>{
                if(post){
                    post.remove().then(()=>res.json({succes:true}))
                }else
                    res.status(200).json('Error')
            })
    }
)



//favorites
//@route GET /post/favo/add/:id 
//@desc Add post to favorite
//PRIVATE
router.get('/post/favo/add/:id',
    passport.authenticate('jwt', { session: false }),
    (req,res)=>{
    const id = req.params.id  
    Car.findById(id)
        .populate('user',['login','email'])
        .then(car=>{
            if(car){
                Favorite.findOne({user:req.user.id})
                    .populate('user',['login'])
                    .populate('posts',['make','model'])
                    .then(favo=>{
                        if(favo){
                            favo.posts.unshift(car.id)
                            favo.save()
                                .then(f=> res.json(f))
                                .catch(err=> res.status(200).json('Error'))
                        }
                        else{
                            const newFavo = new Favorite({
                                user: req.user.id,
                            })
                            newFavo.posts.unshift(car.id)
                            newFavo.save()
                                .then(f=>res.json(f))
                                .catch(err=>res.status(200).json('Error'))
                        }
                    })
            }else
                res.status(400).json('Post not found')
                
        })
})




//favorites
//@route GET /post/favo/user/
//@desc Get all favorite posts of user
//PRIVATE
router.get('/post/favo/user',
    passport.authenticate('jwt', { session: false }),
    (req,res)=>{
    const id = req.user.id  
    
    Favorite.findOne({user:id})
        .populate('user',['login'])
        .populate('posts',['make','model'])
        .then(favo=>{
            if(favo){
                res.json(favo)
            }
            else{
                res.status(400).json('Your list is empty')
            }
        })
            
})




//favorites
//@route DELETE /post/favo/user/
//@desc Get all favorite posts of user
//PRIVATE
router.delete('/post/favo/delete/:id',
    passport.authenticate('jwt', { session: false }),
    (req,res)=>{
        const id = req.user.id
        Favorite.findOne({user:id})
            .populate('')
            .then(favo=>{
                if(favo){
                    const buf = favo.posts
                        .map(item => item.id[0])
                    // for(let i=0;i<buf.length;i++){
                    //     console.log(buf[i])
                    // }
                       // .indexOf(req.params.id)
                    // const temp = JSON.parse(buf.toString())
                    //console.log(favo.posts[0].toString())
                    console.log(buf)
                    // favo.posts.slice(index,1)
                    // favo.save().then(()=>res.json({succes:true})).catch(err=>{
                    //     console.log('Error')
                    //     res.status(400).json('Error')
                    // })
                    //favo.remove(()=>res.json({succes:true}))
                }
                    
                else 
                    res.status(400).json('Error')
            })
    }
)



module.exports = router