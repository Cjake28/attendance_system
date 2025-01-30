export function errorHandler(err, req, res, next){
    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : 'Internal Server Error'

    console.error("Error Details", {
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode
    });

    res.status(statusCode).json({
        success: false,
        message
    });
}