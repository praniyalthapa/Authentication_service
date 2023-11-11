const UserService=require('../services/user-service');
const userService=new UserService();
const create=async(req,res)=>{
    try {
        const response=await userService.create({
            email:req.body.email,
            password:req.body.password
        });
        return res.status(201).json({
            success:true,
            message:"Successfully created a new user",
            err:{},
            data:response
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            data:{},
            success:false,
            err:error
        });
        
    }
}
const signIn=async (req,res)=>{
    try {
        const response=await userService.signIn(req.body.email,req.body.data);
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:"Successfully signed In"
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            data:{},
            success:false,
            err:error
        });
        
    }
}
module.exports={
    create,
    signIn
}