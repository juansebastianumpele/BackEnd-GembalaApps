class _response {
    sendResponse(res, data) {
        try{
            res.status(data.code == 200 ? 200 : data.code ? data.code : 500)

            let status
            switch (data.code) {
                case 200:
                    status = 'OK'
                    break;
                case 400:
                    status = 'BAD_REQUEST'
                    break;
                case 401:
                    status = 'UNAUTHORIZED'
                    break;
                case 403:
                    status = 'FORBIDDEN'
                    break;
                case 404:
                    status = 'NOT_FOUND'
                    break;
                case 500:
                    status = 'INTERNAL_SERVER_ERROR'
                    break;
                default:
                    status = 'INTERNAL_SERVER_ERROR'
                    break;
            }

            if(data.code == 200){
                res.send({
                    code : data.code ? data.code : 500,
                    status,
                    data : data.data ? data.data : null,
                })
            }else{
                res.send({
                    code : data.code ? data.code : 500,
                    status,
                    error : data.error ? data.error : null,
                })
            }
               


            return true
        }catch (error){
            console.error('sendResponse response helper Error: ', error);

            res.status(500).send({
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