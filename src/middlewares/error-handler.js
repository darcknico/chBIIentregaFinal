const errorHandler = async (error, req, res, next) => {
    console.log(error)
    const errorStatus = error.statusCode || 500
    const errorMessage = error.message || 'Algo salió mal'
    const response = {
        status: errorStatus,
        message: errorMessage,
    };
    if(error.errors){
        response.errors = error.errors;
    }
    res.status(errorStatus).json(response)
}

export default errorHandler