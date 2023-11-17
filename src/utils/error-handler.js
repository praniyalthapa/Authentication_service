const {StatusCodes}=require('http-status-codes');
class AppErrors extends Error{  //Error is predefined constructor learn from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error
    constructor(name='App Error occured',message='something went wrong',explanation='something went wrong'
    ,statusCode=StatusCodes.INTERNAL_SERVER_ERROR){
        super();
        this.message=message,
        this.explanation=explanation,
        this.name=name ,
    this.statusCode=statusCode }
}



module.exports=AppErrors;
