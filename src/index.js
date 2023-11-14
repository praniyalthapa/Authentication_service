const express=require('express');
const {PORT}=require('./config/serverConfig');
const bodyParser=require('body-parser');
const db=require('./models/index');
const {User,Role}=require('./models/index');

const app=express();
const apiRoutes=require('./routes/index');
const userService=require('./services/user-service');
const user = require('./models/user');
//const UserService = require('./services/user-service');
const prepareAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
     app.use('/api',apiRoutes);

    app.listen(PORT,async()=>{
        console.log(`Server started on Port: ${PORT}`);
        // const repository=new UserRepository();
        // const response=await repository.getById(1);
        // console.log(response);
        // const incomingPwd='123453';
        // const hash=await User.findByPk(1);
        // const response=bcrypt.compareSync(incomingPwd,hash);
        // const service=new UserService();
        //  const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiBwcmFuaXlhbDEwMEBnbWFpbC5jb20iLCJpZCI6MiwiaWF0IjoxNjk5Njg2OTE3LCJleHAiOjE2OTk2ODY5NDd9.UUtXmJFJs2uNwOaCPaoi_eMyGb5lQSX6vkcOt16-RqY';
        //  const response=service.verifyToken(token);
        //  console.log(response);
        // const newToken=service.createToken({email:' praniyal100@gmail.com',id:2});
        // console.log("New token created now is :",newToken);
        if(process.env.DB_SYNC){   //DB_SYNC=true inside .env file then remove it later on
             db.sequelize.sync({alter:true});
        }
        const u1=await User.findByPk(3);
        const r1=await Role.findByPk(2); //row1 uses (1) argument bocz it is for Admin row
        // u1.addRole(r1);
        // const response= await r1.getUsers(); //it will give all the roles for the particular user
        const response=await u1.hasRole(r1);
        console.log(response);




    });


}






prepareAndStartServer();