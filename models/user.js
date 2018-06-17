const mongoose              = require('mongoose');
const Schema                = mongoose.Schema;
const timestamps            = require('mongoose-timestamp');
const autoIncrement         = require('mongoose-auto-increment');

const userSchema            = new Schema ({

    name : { type : String, required : [true , "Name is required"] },

    email : { type : String, lowercase : true, required : [true, "Email is required"], unique : true },

    mobile : { type : String, required : [true , "Mobile number is required"], unique : true },

    password : { type : String, required : [true , "Password is required"] }

})

userSchema.plugin(autoIncrement.plugin, { model: 'user', field: 'userId', startAt : 1 });

userSchema.plugin(timestamps,{ createdAt : "created_at", updatedAt : "updated_at"});

module.exports              = mongoose.model('user',userSchema);