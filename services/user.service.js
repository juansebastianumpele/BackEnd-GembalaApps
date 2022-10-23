// Helper databse yang dibuat
const {log_error} = require('../utils/logging');
class _user{
    constructor(db){
        this.db = db;
    }
    // Get Data users
    getUsers = async (req) => {
        try{
            // Query Data
            const list = await this.db.AuthUser.findAll({ 
                attributes: ['id_user', 'image', 'nama_pengguna', 'email', 'nomor_telepon', 'alamat', 'nama_peternakan', 'role', 'status',  'createdAt', 'updatedAt'],
                where : req.query });
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
            log_error('getUsers Service', error);
            return {
                code: 500,
                error
            }
        }
    }
}

module.exports = (db) => new _user(db);