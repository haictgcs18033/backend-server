const mongoose=require('mongoose')

const PageSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category',
      required:true,
      unique:true
    },
    type:{
        type:String
    },
    createdBy:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       required:true
    },
    bannerImages:[
        {
            img:{
                type:String
            },
            navigate:{
                type:String
            }
        }
    ],
    productImages:[
        {
            img:{
                type:String,
            },
            navigate:{
                type:String
            }
        }
    ],
},{timestamps:true})
module.exports=mongoose.model('Page',PageSchema)