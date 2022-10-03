// Helper databse yang dibuat
const joi = require('joi');
const date = require('date-and-time');

class _user{
    constructor(db){
        this.db = db;
    }
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
            const list = await this.db.query(query);
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data users not found'
                }
            }
            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            };
        }catch (error){
            console.error('getUsers user module Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Req to Employee
    reqToEmployee = async (req) => {
        try{
            // Query data
            const add = await this.db.query('INSERT INTO req_to_employee (id_users) VALUES (?)',
            [
                req.dataAuth.id_users
            ]);
            if(add.affectedRows <= 0){
                return{
                    code: 400,
                    error: 'Failed to req employee'
                }
            }
            return {
                code: 200,
                data: {
                    id_req_to_employee: add.insertId,
                    createdAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error){
            console.error('reqToEmployee user module Error: ', error);
            return {
                code: 500,
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
            const list = await this.db.query(query);
            if(list.length <= 0){
                return{
                    code: 404,
                    error: 'Data req list not found'
                }
            }
            return {
                code: 200,
                data: {
                    total: list.length,
                    list
                }
            };
        }
        catch (error){
            console.error('getReqList user module Error: ', error);
            return {
                code: 500,
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
                    code: 400,
                    error: errorDetails
                };
            }
            // Query id_user
            const user = await this.db.query('SELECT id_users FROM req_to_employee WHERE id_req = ?', [value.id_req]);
            if(user.length <= 0){
                return{
                    code: 404,
                    error: 'Data req list not found'
                }
            }

            // Update req status
            const updateReq = await this.db.query('UPDATE req_to_employee SET status = ? WHERE id_req = ?',[value.status, value.id_req]);
            if(updateReq.affectedRows <= 0){
                return{
                    status: false,
                    code: 400,
                    error: 'Failed to update req status'
                }
            }

            // Update Role User
            if(value.status == 'accept'){
                const update = await this.db.query('UPDATE auth_users SET role = "employee" WHERE id_users = ?', [user[0].id_users]);
                if(update.affectedRows <= 0){
                    return{
                        status: false,
                        code: 400,
                        error: 'Failed to update role user'
                    }
                }
            }
            return {
                code: 200,
                data: {
                    id_req: value.id_req,
                    id_users: user[0].id_users,
                    status: value.status,
                    updatedAt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }
            };
        }
        catch (error){
            console.error('acceptToEmployee user module Error: ', error);
            return {
                code: 500,
                error
            }
        }
    }
}

const userService = (db) => new _user(db);
module.exports = userService;