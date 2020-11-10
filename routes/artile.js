// 实现写文章页面 
/*
创建路由并导出   ---app
app引入 并。use使用
*/
var express = require('express');
const { Tle } = require('../model/model')
const fs =require('fs')
const session = require('express-session');
// 导出数据库模板
// const {**}= require('/model/model)
var router = express.Router();
var multiparty=require('multiparty')

// 创建写文章接口
router.post('/wenzhang',async function (req, res, next) {
  
    // let userDate = {
    //     Tle: req.body.title,
    //     content: req.body.content,
    //     username: req.session.username,
    //     id: Date.now()

    // }
    // res.send(userDate)

    // var userInfo = new Tle(userDate);
    // userInfo.save(function (err, user) {
    //     if (err) return console.error(err);
    //     console.log("注册成功");
    // })

    var id=parseInt(req.body.id)

    if(id){
  /*
    req.query
    req.body
    req.param
    */
        var page=req.body.page
        var title= req.body.title
        var content= req.body.content

        // 查找出当前数据findone 找到一个
        const article = await Tle.findOne({id})
        // 修改数据值
        article.set({
            title:title,
            content:content
        })
        // 保存到数据库
        article.save()
        //重新回归进来之前的页面 
        res.redirect('./?page='+page)
    }else{
        var data={
            title:req.body.title,
            content: req.body.content,
            username:req.session.username,
            id: Date.now()
        }
        let add = new Tle(data);
        add.save(function (err, user) {
        if (err) return console.error(err);
        console.log("注册成功");
        res.redirect('/')
    })
    }







})
//   上传文件接口
// ck配置接口 创建接口
router.post('/upload', function (req, res, next) {
    
    /*
    上传文件
    写入到服务器
    展示在富文本框
    */
    // 技术  fs,multiparty
    /**
     * 导入需要的包
     * npm install multiparty
     * artile 导入包
     * 使用包的Form
     * 使用form.parse()
     * fs操作文件及系统
     */
    // console.log("找到接口了");
    var form = new multiparty.Form()
    console.log(form);
    form.parse(req, function (err, fields, files) {
        if(err){
            console.log("上传失败");
        }else{
            let file=files.upload[0]
            // 读取文件
            let rs=fs.createReadStream(file.path)

            let newRs='/upload/'+file.originalFilename

            let ws=fs.createWriteStream('./public'+newRs) //写入

            rs.pipe(ws) //边读边写

            // 当文件读取关闭， 监听close事件
            ws.on('close',function(){

                // ck要求返回的参数
                res.send({uploaded:1,url:newRs})
            })
        }
    })

})

// 新增删除接口
router.get('/delete',async function(req,res,next){

    var id=parseInt(req.query.id)
    var page=req.query.page
    Tle.deleteMany({id},function (err){console.log('errrrrr'+err);});
    res.redirect('/?page='+page)

})


// 详情接口
// router.get('/details',async function(req,res,next){

//     let userDate = {
//         Tle: req.body.title,
//         content: req.body.content,
//         username: req.session.username,
//         id: Date.now()

//     }
//     res.send(userDate)

//     var userInfo = new Tle(userDate);
//     userInfo.save(function (err, user) {
//         if (err) return console.error(err);
//         // console.log("注册成功");
//     })

// })



module.exports = router;
