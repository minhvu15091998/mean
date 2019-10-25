var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var schema = new Schema({
    email : {type:String, require:true},
    fullName: {type:String, require:true},
    password:{type:String, require:true}
});

// schema.statics.hashPassword = function hashPassword(password){
//     return bcrypt.hashSync(password,10);
// }
schema.pre('save', function (next) {
    var user = this; // hash the password only if the password has been changed or user is new 
    if (!user.isModified('password')) return next(); 
    // generate the hash 
    bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) return next(err); // change the password to the hashed version 
    user.password = hash;
    next(); 
    });
    });
schema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('users',schema);