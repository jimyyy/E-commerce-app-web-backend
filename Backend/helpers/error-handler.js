function errorHandler(err,req,res,next){
    if(err.name ==='UnauthorizedError'){
        //jwt authentification eror
        res.status(401).json({message:"the user is not authorized"});
    }

    if(err.name === 'ValidationError'){
        return res.status(401).json({message:err})
    }


    return res.status(500).json(err);

}


module.exports=errorHandler;