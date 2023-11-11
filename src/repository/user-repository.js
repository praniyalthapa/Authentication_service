const {User}=require('../models/index');
class UserRepository{
    async create(data){
        try {
            const user=await User.create(data);
            return user;
            
        } catch (error) {
            console.log("Oops!error occured ");
            throw error;
            
        }
    }
    async destroy(userId){
        try {
         await User.destroy({
            where:{
                id:userId
            }
         });
         return true;
            
        } catch (error) {
            console.log("Sorry can't delete");
            throw error;
            
        }
    }
  async getById(userId){
    try {
        const user= await User.findByPk(userId,({ //it will give all the data along with password which we don't want so we use something called attribute
            attributes:['email','id']
        })); 
        return user;
        
    } catch (error) {
        console.log("Something went wrong on repository layer");
        throw error;
        
    }
  }
  async getByEmail(userEmail) {
    try {
        const user = await User.findOne({where: {
            email: userEmail
        }});
        return user;
    } catch (error) {
        console.log("Something went wrong on repository layer");
        throw error;
    }
}

   





    
}
module.exports=UserRepository;