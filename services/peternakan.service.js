const db = require('../models');
const { generateToken } = require('../utils/auth');
const { log_error, log_info } = require('../utils/logging');
const joi = require('joi');

class _peternakan{
    getPeternakan = async (req) => {
        try{
            let list;
            if(req.dataAuth.role == 'superadmin'){
                list = await db.Peternakan.findAll({
                    attributes: ['id_peternakan', 'nama_peternakan', 'alamat', 'id_users', 'createdAt', 'updatedAt']
                });
                if(list.length <= 0){
                    return{
                        code: 400,
                        error: `Peternakan not found`
                    }
                }
            }else if(req.dataAuth.role == 'admin'){
                list = await db.Peternakan.findOne({
                    attributes: ['id_peternakan', 'nama_peternakan', 'alamat', 'id_users', 'createdAt', 'updatedAt'],
                    where : {
                        id_users: req.dataAuth.id_users,
                        id_peternakan: req.dataAuth.id_peternakan
                    }
                });
                if(list == null){
                    return{
                        code: 400,
                        error: `Peternakan not found`
                    }
                }
            }else{
                return{
                    code: 401,
                    error: `Not authorized, Role not found`
                }
            }

            return {
                code : 200,
                data: {
                    total: list.length,
                    list
                },
            };
        }catch (error){
            log_error('getPeternakan Service', error);
            return {
                code : 500,
                error
            }
        }
    }

    newTokenSuperAdmin = async (req) => {
        try{
            const schema = joi.object({
                id_peternakan: joi.number().required()
            });
            const {error, value} = schema.validate(req.body);
            if(error){
                return {
                    code: 400,
                    error: error.details[0].message
                }
            }
            
            const token = generateToken({
                id_users: req.dataAuth.id_users,
                username: req.dataAuth.username,
                role: req.dataAuth.role,
                status: req.dataAuth.status,
                id_peternakan: value.id_peternakan
            })

            return {
                code : 200,
                data: {
                    token
                },
            };

        }catch (error){
            log_error('getPeternakanById Service', error);
            return {
                code : 500,
                error
            }
        }
    }
    createPeternakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                nama_peternakan: joi.string().required(),
                email_admin: joi.string().email().required(),
                alamat: joi.string().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // Check if email already exist
            const checkEmail = await db.AuthUser.findOne({
                where: {
                    email: value.email_admin
                }
            });
            if(checkEmail == null){
                return{
                    code: 400,
                    error: `Email ${value.email_admin} not registered`
                }
            }

            const add = await db.Peternakan.create({
                nama_peternakan: value.nama_peternakan, 
                id_users: checkEmail.id_users,
                alamat: value.alamat,
            });
            if(add == null){
                return{
                    code: 400,
                    error: `Create Peternakan failed`
                }
            }
            return {
                code: 200,
                data: {
                    id_peternakan: add.id_peternakan,
                    nama_peternakan: add.nama_peternakan,
                    alamat: add.alamat,
                    createdAt: add.createdAt,
                },
            };
        }catch (error){
            log_error('createPeternakan Service', error);
            return {
                code : 500,
                error
            }
        }
    }

    updatePeternakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_peternakan: joi.number().required(),
                nama_peternakan: joi.string().required(),
                email_admin: joi.string().email().required(),
                alamat: joi.string().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // Check if email already exist
            const checkEmail = await db.AuthUser.findOne({
                where: {
                    email: value.email_admin
                }
            });
            if(checkEmail == null){
                return{
                    code: 400,
                    error: `Email ${value.email_admin} not registered`
                }
            }

            // Update data
            const update = await db.Peternakan.update({
                nama_peternakan: value.nama_peternakan, 
                id_users: checkEmail.id_users,
                alamat: value.alamat,
            },{
                where: {
                    id_peternakan: value.id_peternakan
                }
            });
            if(update == null){
                return{
                    code: 400,
                    error: `Update Peternakan failed`
                }
            }

            return {
                code: 200,
                data: {
                    id_peternakan: req.params.id_peternakan,
                    nama_peternakan: value.nama_peternakan,
                    alamat: value.alamat,
                    updatedAt: new Date(),
                },
            };
        }catch (error){
            log_error('updatePeternakan Service', error);
            return {
                code : 500,
                error
            }
        }
    }

    deletePeternakan = async (req) => {
        try {
            // Validate data
            const schema = joi.object({
                id_peternakan: joi.number().required(),
            });
            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    code: 400,
                    error: errorDetails,
                }
            }

            // Delete data
            const del = await db.Peternakan.destroy({
                where: {
                    id_peternakan: value.id_peternakan
                }
            });
            if(del == null){
                return{
                    code: 400,
                    error: `Delete Peternakan failed`
                }
            }

            return {
                code: 200,
                data: {
                    id_peternakan: value.id_peternakan,
                    deletedAt: new Date(),
                },
            };
        }catch (error){
            log_error('deletePeternakan Service', error);
            return {
                code : 500,
                error
            }
        }
    }
}

module.exports = new _peternakan();