function sayHello(name, callback) {
    var myName = name.toUpperCase() + ",hello";
    return callback(myName)
}

var result = sayHello("Khoa",function(arg) {
    return arg
});

console.log(result)