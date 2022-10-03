
const adminAuth = async (req, res, next) => {
  if(req.dataAuth.role === 'admin'){
    next()
  }else{
    res.status(401).send({
      code: 401,
      error: 'Not authorized'
    })
  }
}

const employeeAuth = async (req, res, next) => {
  if(req.dataAuth.role === 'employee' || req.dataAuth.role === 'admin'){
    next()
  }else{
    res.status(401).send({
      code: 401,
      error: 'Not authorized'
    })
  }
}

module.exports = {
  adminAuth,
  employeeAuth
}