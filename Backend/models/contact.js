const mongoose = require ('mongoose');


const contactSchema = mongoose.Schema({
name :{
    type:String,
    required:true,

},
email:{
    type:String,
    required:true,

},
subject:{
    type:String,
    required:true
},

message:{
    type:String,
    required:true
},














});

contactSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

contactSchema.set('toJSON',{
    virtuals:true,
});


    
const Contact = mongoose.model('Contact',contactSchema);


module.exports = Contact ;