<<<<<<< HEAD
class ExpressError extends Error {
    constructor(statusCode,message){
        super();
        this.statusCode = statusCode;
        this.message = message;

    }
}
=======
class ExpressError extends Error {
    constructor(statusCode,message){
        super();
        this.statusCode = statusCode;
        this.message = message;

    }
}
>>>>>>> 73859dbc517a6651d4ba007b0089f8536e5da0d4
module.exports = ExpressError;