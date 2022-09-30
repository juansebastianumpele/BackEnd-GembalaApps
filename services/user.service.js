// Helper databse yang dibuat
const mysql = require('../utils/database');
const joi = require('joi');

class _user{
    // Get Data users
    getUsers = async (req) => {
        try{
            // Query Data
            let query = 'SELECT id_users, foto, nama_lengkap, username, email, no_hp, alamat, role, userLastAccess, createdAt, updatedAt FROM auth_users';
            for (let i = 0; i < Object.entries(req.query).length; i++) {
                query += (i === 0) ? ' WHERE ' : ' AND ';
                query += Object.keys(req.query)[i] == 'username' || Object.keys(req.query)[i] == 'nama_lengkap' 
                ? `${Object.keys(req.query)[i]} LIKE '%${Object.values(req.query)[i]}%'` 
                : `${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`;
            }
            const users = await mysql.query(query);
            if(users.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: 'Data users tidak ditemukan'
                }
            }
            return {
                status: true,
                total: users.length,
                data: users,
            };
        }catch (error){
            console.error('getUsers user module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Req to Employee
    reqToEmployee = async (req) => {
        try{
            // Query data
            const add = await mysql.query('INSERT INTO req_to_employee (id_users) VALUES (?)',
            [
                req.dataAuth.id_users
            ]);
            if(add.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: 'Permintaan gagal'
                }
            }
            return {
                status: true,
                message: 'Permintaan berhasil'
            };
        }
        catch (error){
            console.error('reqToEmployee user module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Get req list
    getReqList = async (req) => {
        try{
            // Query data
            let query = 'SELECT id_req, id_users, createdAt, updatedAt FROM req_to_employee';
            for (let i = 0; i < Object.entries(req.query).length; i++) {
                query += (i === 0) ? ' WHERE ' : ' AND ';
                query += `${Object.keys(req.query)[i]} = '${Object.values(req.query)[i]}'`;
            }
            const reqList = await mysql.query(query);
            if(reqList.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: 'Data permintaan tidak ditemukan'
                }
            }
            return {
                status: true,
                total: reqList.length,
                data: reqList,
            };
        }
        catch (error){
            console.error('getReqList user module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }

    // Accept to Employee
    acceptToEmployee = async (req) => {
        try{
            // Validate data
            const schema = joi.object({
                id_req: joi.number().required(),
                status: joi.string().required()
            });

            const { error, value } = schema.validate(req.body);
            if (error) {
                const errorDetails = error.details.map((detail) => detail.message).join(', ');
                return {
                    status: false,
                    code: 400,
                    message: errorDetails
                };
            }
            // Query id_user
            const user = await mysql.query('SELECT id_users FROM req_to_employee WHERE id_req = ?', [value.id_req]);
            if(user.length <= 0){
                return{
                    status: false,
                    code: 404,
                    message: 'Data permintaan tidak ditemukan'
                }
            }

            // Update req status
            const updateReq = await mysql.query('UPDATE req_to_employee SET status = ? WHERE id_req = ?',[value.status, value.id_req]);
            if(updateReq.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    message: 'Permintaan gagal'
                }
            }

            // Update Role User
            if(value.status == 'accept'){
                const update = await mysql.query('UPDATE auth_users SET role = "employee" WHERE id_users = ?', [user[0].id_users]);
                if(update.affectedRows <= 0){
                    return{
                        status: false,
                        code: 400,
                        message: 'Permintaan gagal'
                    }
                }
            }
            return {
                status: true,
                message: 'Permintaan berhasil'
            };
        }
        catch (error){
            console.error('acceptToEmployee user module Error: ', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _user();