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

   





    
}
module.exports=UserRepository;