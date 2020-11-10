// 连接
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Borke')
    .then(()=>{
        console.log("数据库连接成功");
    })
    .catch((err)=>{
        console.log('数据库连接失败-提示：'+err);
    })

// 导出
module.exports=mongoose