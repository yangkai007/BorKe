var express = require('express');
const {Users} =require('../model/model')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 创建注册接口
router.post('/register',function(req,res,next){
  let userDate={
    username:req.body.username,
    password:req.body.password,
    password2:req.body.password2,

  }
  res.send(userDate)
  

  var userInfo =new Users(userDate);
  userInfo.save(function (err,user){
    if(err) return console.error(err);
    console.log("注册成功");
  })
});
// 创建登录接口 find查找
router.post('/login',function(req,res,next){
  // 用户注册数据获取
  let userss={
    username:req.body.username,
    password:req.body.password,
  }
 
  // 使用find查找   获取的数据是否在数据库中  docs
Users.find(userss,function(error,docs){
  
  // console.log("asfasfasf"+er);
  if(error) return console.error(error);
  if(docs.length>0){
    console.log("成功");
    // 进行session回话储存 
    req.session.username=userss.username
    res.redirect('/')
  }else{
    console.log("失败");
    res.redirect('/login')
  }
})


})




module.exports = router;
