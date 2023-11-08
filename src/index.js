const express=require('express');
const {PORT}=require('./config/serverConfig');
const bodyParser=require('body-parser');
const app=express();
const apiRoutes=require('./routes/index');
const {User}=require('./models/index');
const bcrypt=require('bcrypt');
const user = require('./models/user');
const prepareAndStartServer=()=>{
    app.use(bodyParser.json);
    app.use(bodyParser.urlencoded({extended:true}));
     app.use('/api',apiRoutes);

    app.listen(PORT,async()=>{
        console.log(`Server started on Port: ${PORT}`);
        // const incomingPwd='123453';
        // const hash=await User.findByPk(1);
        // const response=bcrypt.compareSync(incomingPwd,hash);
    });


}






prepareAndStartServer();