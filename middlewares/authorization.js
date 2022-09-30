const config = require('../config/app.config.json')
const mysql = require('../utils/database');
const jwt = require('jsonwebtoken')
// const m$user = require('../modules/user.modules')

const adminAuth = async (req, res, next) => {
  if(req.dataAuth.role === 'admin'){
    next()
  }else{
    res.status(401).send({
      status: false,
      message: 'Not authorized'
    })
  }
}

const employeeAuth = async (req, res, next) => {
  if(req.dataAuth.role === 'employee' || req.dataAuth.role === 'admin'){
    next()
  }else{
    res.status(401).send({
      status: false,
      message: 'Not authorized'
    })
  }
}

module.exports = {
  adminAuth,
  employeeAuth
}