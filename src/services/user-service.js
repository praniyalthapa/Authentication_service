const UserRepository=require('../repository/user-repository');
const {JWT_KEY}=require('../config/serverConfig');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
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
    //token is created only if we have verified our password and email
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
checkPassword(userPlainPassword,encryptedPassword){ //two argument are need for checking the user entered password
    try {
        return bcrypt.compareSync(userPlainPassword,encryptedPassword);//bycrpt.comparesync need two arguments to compare and throw return
        
    } catch (error) {
        console.log("Something error occured in comapring your password");
        throw error;
        
    }

}

}
module.exports=UserService;