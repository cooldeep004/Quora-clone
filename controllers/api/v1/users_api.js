const User=require('../../../models/user');
const jwt=require('jsonwebtoken');




module.exports.createSession =async function (req, res) {
try{
let user = await User.findOne({email:req.body.email});
if(!user || user.password!=req.body.password)
{
    return res.json(422,{
        message:"invalid username/password"
    });
}
return res.json(200,{
    message: 'sign in',
    data:{
        token: jwt.sign(user.toJSON(), 'kuldeep',{expiresIn:'100000'})
    }
})
}
catch(err)
{
console.log('errror',err);
return res.json(422,{
    message:"invalid username/password"
});
}
}
