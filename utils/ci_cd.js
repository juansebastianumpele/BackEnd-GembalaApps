const {execFile} = require('child_process');

module.exports = (app) =>{
    app.post('/build-dashboard',(req,res) => {
        execFile('/home/sembadafarm/web/gembala.sembadafarm.com/pull.sh', (err, stdout, stderr) => {
            res.writeHead(200)
            res.end()
        })
    })
}