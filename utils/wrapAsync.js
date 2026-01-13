<<<<<<< HEAD
module.exports = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    }
=======
module.exports = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    }
>>>>>>> 73859dbc517a6651d4ba007b0089f8536e5da0d4
}