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
   
    // async signIn(email,plainPassword){
    //     try {
    //    //first step is fetch user by using email
    //    const user=await this.userRepository.getByEmail(email);
    //    //now compare plain password with encrypted passwrord
    //    const passwordsMatch=this.checkPassword(plainPassword,user.password);
    //  if(!passwordsMatch){
    //     console.log("password doesnt match");

    //     throw {error:"Incorrect password"};
       
    //  }    //if password matches then create a token and send to user
    //  const newJWT=this.createToken({email:user.email,id:user.id});
    //  return newJWT;        
    //     } catch (error) {
    //         console.log("Something went wrong in the signIn process");
    //         throw error;
            
    //     }


    // }
    async signIn(email, plainPassword) {
        try {
            // step 1-> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            // step 2-> compare incoming plain password with stores encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch) {
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            // step 3-> if passwords match then create a token and send it to the user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the sign in process");
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
checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
        console.log("Something went wrong in password comparison");
        throw error;
    }
}

}
module.exports=UserService;