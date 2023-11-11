const UserRepository=require('../repository/user-repository');
const {JWT_KEY}=require('../config/serverConfig');
const jwt = require('jsonwebtoken');
class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }
    async create(data){
   try {
    const user=await this.userRepository.create(data);
    return user; 
   } catch (error) {
    console.log("Error occured in service layer");
    throw error;
    
   }
    }
     createToken(user){ //using this user object we are going to create token 
      try {
        const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' }); //jwt.sign takes two argument one is user and next one is KEY which is in my .env file and next argument tell timing to expire jwt token
            return result;
        
      } catch (error) {
        
        console.log("Error occured!");
        throw error;
      }


    }
verifyToken(token){
    try {
        const response=jwt.verify(token,JWT_KEY); //in argument we pass token and same jwt_key from which we created token 
        return response;
        
    } catch (error) {
        console.log("Oops! Something went wrong!",error);
        throw error;
        
    }

}

}
module.exports=UserService;