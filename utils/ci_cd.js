module.exports = (app) =>{
    app.post('/projectkita-api',(req,res) => {
        execFile('/home/sembadafarm/web/gembala.sembadafarm.com/pull.sh', (err, stdout, stderr) => {
            res.writeHead(200)
            res.end()
        })
    })
}