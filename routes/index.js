var express = require('express');
var router = express.Router();

// 导入数据库模板
let {Tle} =require('../model/model')
var moment = require('moment');


router.get('/',async function(req, res, next) {

  let page=req.query.page ||1
  console.log('page'+page);
  // 获取文章列表
  // Tle.find(function(err,datalist){
  //   console.log(datalist);
  // })

    let data={
      totle:'', //总页数
      currentPage:page,//当前页
      list:[],//当前页渲染的数据列表
    }
    let pageSize=3 //每页显示几条
// limit 限制条数  最大限制  sort 排序 
    let datalist= await Tle.find() //datalist当前查询结果
    .limit(pageSize)  //每一页显示pageSize条
    .sort({_id:-1}) //倒序
    .skip(pageSize*(data.currentPage-1)) //跳过本页之前数据
    // 总页码数 向上取整  datalist.length/pageSize
    data.totle=Math.ceil(await Tle.find().count()/pageSize)
    // data.totle=datalist.length/pageSize 
    console.log(data.totle);

    // 遍历数组 转换时间格式
    datalist.map(item=>{
      item['time']=moment(item.id).format('MMMM Do YYYY, h:mm:ss a');
    })
    // console.log(datalist);
    // 页面数据
    data.list=datalist


  // 渲染首页先从session拿到用户名
  let username= req.session.username||'';
  res.render('index', { username,data:data}); //Tle传输出去
});
// 注册
router.get('/register', function(req, res, next) {
  res.render('register', {});
});
// 登录
router.get('/login', function(req, res, next){ //路由
  res.render('login', {});//---对应ejs名
});
// 文章
router.get('/wenzhang',async function(req, res, next){ //路由

  // 获取传输过来的ID
    var username=req.session.username||'';
    var id=parseInt(req.query.id)
    var page=req.query.page
    
    var item={
      title:'',
      content:''
    }
    if(id){
      // 查找数据
      item=await Tle.findOne({id:id})
      item.page=page
      console.log(item);
      // 渲染页面
      res.render('wenzhang',{username,item})
    }else{
      // 新增
      res.render('wenzhang', {username,item});//---对应ejs名
    }

});
module.exports = router;
