class _response {
    sendResponse(res, data) {
        try{
            if(data.status){
                // res.status(data.code)
                res.status(200)

                delete data.code

                res.send(data)
                return true
            }

            res.status(!data && data.status ? 200 : 500)
            res.send(data)
            return true
        }catch (error){
            console.error('sendResponse response helper Error: ', error);

            res.status(400).send({
                status: false,
                error
            })
            return false
        }
    }

    errorHandler(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            // Error jwt
            return res.status(401).send({
                status: false,
                error: 'Invalid Token'
            });
        }

        // Default error handling
        res.status(500).send({
            status: false,
            error: err.message
        });
    }
}

module.exports = new _response()