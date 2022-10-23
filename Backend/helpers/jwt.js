const { expressjwt: jwt } = require("express-jwt");

function authJwt(){
    const secret = process.env.secret;
    return jwt({
        secret,
        algorithms:["HS256"],
        iscRevoked: isRevoked

    }).unless({
        path:[
             {
                 url:/\/public\/uploads(.*)/,
                 methods:['GET','OPTIONS']
             },
             {
                 url:/\/api\/v1\/products(.*)/,
                 methods:['GET','OPTIONS']
             },
             {
                 url:/\/api\/v1\/categories(.*)/,
                 methods:['GET','OPTIONS']
             },
             {
                 url:/\/api\/v1\/orders(.*)/,
                 methods:['POST','OPTIONS']
             },

           
             '/api/v1/users/login',
             '/api/v1/users/register',
             '/api/v1/users/contact',
             
           

        ]
    })
}


async function isRevoked(req,payload,done){
    if(!payload.isAdmin){
        done(null, true)
    }

     done();

}

module.exports=authJwt;