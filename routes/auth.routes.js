const express = require('express')
const bcrypt = require('bcrypt');
const router  = express.Router();
const {user,blogdata,dailyfeed,likes, comments} = require('../models/modal')
const {check, validationResult} = require('express-validator');

router.post("/signin-user",(req,res,next) => {
    let getUser;
    user.findOne({
        email:req.body.email
    })
    .then((user1) => {
        if(!user1){
            return res.status(401).json({
                message:"Authentication failed"
            })
        }
        getUser = user1;
        return bcrypt.compare(req.body.password, user1.password)
    })
    .then((response) => {
        if(!response) {
            return res.status(402).json({
                message:"Authentication failed"
            })
        }
        res.status(200).json({
            message:"User authenticated",
            msg:getUser
        })
    })
    .catch((err) => {
        res.status(401).json({
            message:"Authentication Failed",
            error:err
        })
    })
})



router.post('/register-user',[
    check('email','email is not valid').not().isEmpty().isEmail(),
    check('password','password should be between 5 to 8 characters').not().isEmpty().isLength({min:5})
],(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json(errors.array())

    }
    else{
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const user1 = new user({
              
              email: req.body.email,
              password: hash,
            });
            user1
              .save()
              .then((response) => {
                res.status(201).json({
                  message: 'User successfully created!',
                  result: response,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  error: error,
                });
              });
          });
    }
});
router.get("/allusers", (req, res) => {
    user.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})
router.get('/allusers/:id', (req, res, next) => {
    user.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data,
        });
      }
    });
  });
  router.get('/blogdata', async(req,res) => {
    try{
           const blogdata1 = await blogdata.find()
           res.json(blogdata1)
    }catch(err){
        res.send('Error ' + err)
    }
}
)
router.get('/dailyfeed', async(req,res) => {
  try{
         const dailyfeed2 = await dailyfeed.find()
         res.json(dailyfeed2)
  }catch(err){
      res.send('Error ' + err)
  }
}
)
router.get('/likes', async(req,res) => {
    try{
           const like2 = await likes.find()
           res.json(like2)
    }catch(err){
        res.send('Error ' + err)
    }
  }
  )
  router.get('/comments', async(req,res) => {
    try{
           const comment2 = await comments.find()
           res.json(comment2)
    }catch(err){
        res.send('Error ' + err)
    }
  }
  )
  router.get('/comments/:id', async(req,res) => {
    try{
           const comment2 = await comments.findById(req.params.id)
           res.json(comment2)
    }catch(err){
        res.send('Error ' + err)
    }
  }
  )
router.get('/dailyfeed/:id', async(req,res) => {
    
  try{
         const dailyfeed2 = await dailyfeed.findById(req.params.id)
         res.json(dailyfeed2)
  }catch(err){
      res.send('Error ' + err)
  }
})
router.get('/blogdata/:id', async(req,res) => {
  
  try{
         const blogdata1 = await blogdata.findById(req.params.id)
         res.json(blogdata1)
  }catch(err){
      res.send('Error ' + err)
  }
})
router.post('/blogdata', async(req,res) => {

      
  const blogdata1 = new blogdata({
     star_name:req.body.star_name,
     description:req.body.description,
     
     setId:req.body.setId,
     image:req.body.image
})


if(blogdata1){
    // res.status(200).json(star)
    const a1 =  await blogdata1.save() 
    res.json(a1)
}else{
    res.send('Error')
}
})
router.post('/comments', async(req,res) => {

      
    const comment1 = new comments({
       email:req.body.email,
       set_id:req.body.set_id,
       comment:req.body.comment
  })
  
  
  if(comment1){
      // res.status(200).json(star)
      const a1 =  await comment1.save() 
      res.json(a1)
  }else{
      res.send('Error')
  }
  })
router.post('/dailyfeed',async(req,res) => {
   
    
  const dailyfeed2 = new dailyfeed({
   star_name:req.body.star_name,
   description:req.body.description,
   set_id:req.body.set_id,
   imageLink:req.body.imageLink,
   userEmail:req.body.userEmail
})


if(dailyfeed2){
    // res.status(200).json(star)
    const a1 =  await dailyfeed2.save() 
    res.json(a1)
}else{
    res.send('Error')
}
})
router.post('/likes',async(req,res) => {
   
    
    const likes2 = new likes({
        email:req.body.email,
     set_id:req.body.set_id
  })
  
  
  if(likes2){
      // res.status(200).json(star)
      const a1 =  await likes2.save() 
      res.status(200).json({
          message:"got liked",
          result:a1
      })
  }else{
      res.status(500).json({
          message:"error"
      })
  }
  })
router.put('/dailyfeed/:id',async(req,res) => {    
  if(dailyfeed){
      // res.status(200).json(star)
      let dailyfeed2 = await dailyfeed.findOneAndUpdate({_id:req.params.id},{
          $set:{
              star_name:req.body.star_name,
              description:req.body.description,
              set_id:req.body.set_id,
              imageLink:req.body.imageLink,
              userEmail:req.body.userEmail 
          }
      },{new:true})
      res.send(dailyfeed2)
      
  }else{
      res.send('Error')
  }
} )
router.put('/allusers/:id',async (req,res) => { 
    const {email, password} =  req.body   
    if(user){
        // res.status(200).json(star)
            if(password != "undefined"){
             await bcrypt.hash(req.body.password,10).then(async (hash) => {
                
                    let user2 =  await user.findOneAndUpdate({_id:req.params.id},{
                        $set:{
                            email:email,
                            password:hash 
                        }
                    },{new:true})
                    res.send(
                        user2
                    
                    ) 
               
                
            })
           }
           else{
            let user2 =  await user.findOneAndUpdate({_id:req.params.id},{
                $set:{
                    email:email,
                 
                }
            },{new:true})
            res.json(
              user2
            )
           }
        
        
    }else{
        res.send('Error')
    }
  } )
router.put('/blogdata/:id',async(req,res) => {    
  if(blogdata){
      // res.status(200).json(star)
      let blogdata1 = await blogdata.findOneAndUpdate({_id:req.params.id},{
          $set:{
              star_name:req.body.star_name,
              description:req.body.description,
              
              setId:req.body.setId,
              image:req.body.image
              
          }
      },{new:true})
      res.send(blogdata1)
      
  }else{
      res.send('Error')
  }
} )
router.delete('/dailyfeed/:id', async(req,res) => {    
  if(dailyfeed){
      // res.status(200).json(star)
      let dailyfeed2 = await dailyfeed.findByIdAndDelete({_id:req.params.id})
      res.send(dailyfeed2)
      
  }else{
      res.send('Error')
  }
})
router.delete('/blogdata/:id', async(req,res) => {    
  if(blogdata){
      // res.status(200).json(star)
      let blogdata1 = await blogdata.findByIdAndDelete({_id:req.params.id})
      res.send(blogdata1)
      
  }else{
      res.send('Error')
  }
})
router.delete('/likes/:id', async(req,res) => {    
    if(likes){
        // res.status(200).json(star)
        let likes1 = await likes.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({
            message:"Disliked",
            response:likes1
        })
        
    }else{
        res.status(500).json({
            message:"error"
        })
    }
  })
  router.delete('/allusers/:id', async(req,res) => {    
    if(user){
        // res.status(200).json(star)
        let user1 = await user.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({
            message:"User Removed",
            response:user1
        })
        
    }else{
        res.status(500).json({
            message:"error"
        })
    }
  })


module.exports = router