const pgValueErrorCodes = ['42','22','23'];

module.exports = {
    newThrowError(msg, statusCode) {
      let err = new Error(msg);
      err.status = statusCode;
      return err;
    },
    newThrowPgError(err) {
        if(err.code) {
            if (pgValueErrorCodes.includes(err.code.toString().slice(0,2))) err.status = 422;
        }
        return err;
    }
};