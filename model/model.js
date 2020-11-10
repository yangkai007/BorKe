// 创建 引用同级的 index。js
var mongoose =require('./index')

// 4创建一个schema：规则【验证】爹构造
var userSchema=mongoose.Schema({
    username:String,
    password:String,
    password2:String,
});
// 5将schema编译成一个Model Class---实例化后可操作数据
var Users = mongoose.model('Kitten', userSchema);

var userTitle=mongoose.Schema({
    title:String,
    content:String,
    username:String,
    id:Number
});
// 5将schema编译成一个Model Class---实例化后可操作数据
var Tle = mongoose.model('Tel', userTitle);

module.exports={
    Users,
    Tle
}
