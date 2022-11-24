const fs = require('fs');
const { log_error } = require('./logging');

// Error Model
const newError = (statusCode, message, point) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.point = point;
    throw error;
};

// Error Handler
const errorHandler = (error) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const point = error.point || 'Unknown';

    // Create log
    fs.appendFile('error.log', `${new Date()} - ${statusCode} - ${`[${point}]`} ${message} \r`, (err) => {
        if (err) throw err;
    });
    
    log_error(point, `${error.stack}`);
    return {
        code: statusCode,
        error: message
    };
}

module.exports = {
    newError,
    errorHandler
};