const {log_error} = require('../utils/logging');

class _treatment{
    constructor(db){
        this.db = db;
    }
    // Get Treatment
    getTreatment = async (req) => {
        try{
            if(!req.query.id_ternak){
                return {
                    code: 400,
                    error: 'id_ternak is required'
                }
            }

            const ternak = await this.db.Ternak.findOne({
                attributes: ['id_ternak', 'id_fp'],
                include: [
                    {
                        model: this.db.Fase,
                        as: 'fase',
                        attributes: ['id_fp', 'fase']
                    }
                ],
                where: {
                    id_ternak: req.query.id_ternak,
                    id_peternakan: req.dataAuth.id_peternakan
                }
            });
            if(!ternak){
                return {
                    code: 404,
                    error: 'Ternak not found'
                }
            }

            if(ternak.dataValues.fase.dataValues.fase.toLowerCase().startsWith('adaptasi')){
                const list = await this.db.Treatment.findAll({
                    attributes: ['id_treatment', 'step', 'treatment'],
                    where: {
                        step: parseInt(ternak.dataValues.fase.dataValues.fase.split(' ')[1])
                    }
                });
                if(list.length <= 0){
                    return{
                        code: 404,
                        error: 'Data treatment not found'
                    }
                }
                return {
                    code: 200,
                    data: {
                        total: list.length,
                        id_ternak: ternak.dataValues.id_ternak,
                        treatments: list
                    }
                };
            }
            else{
                return {
                    code: 400,
                    error: 'Fase Pemeliharaan Ternak not in adaptasi'
                }
            }
        }catch (error){
            log_error('getTreatment Service', error);
            return {
                code: 500,
                error
            }
        }
    }   

    // Get All Treatment
    getAllTreatment = async () => {
        try{
            const list = await this.db.Treatment.findAll({
                attributes: ['id_treatment', 'step', 'treatment']
            });
            if(list.length <= 0){
                return {
                    code: 404,
                    error: 'Data treatment not found'
                }
            }
            return {
                code: 200,
                data: {
                    total: list.length,
                    treatments: list
                }
            }
        }catch(error){
            log_error('getAllTreatment Service', error);
            return {
                code: 500,
                error
            }
        }
    }

    // Create new Treatment
    // createTreatment = async (req) => {
    //     try{
    //         const schema = joi.object({
    //             step: joi.number().required(),
    //             treatment: joi.string().required()
    //         });
    //         const {error, value} = schema.validate(req.body);
    //         if(error){
    //             return {
    //                 code: 400,
    //                 error: error.details[0].message
    //             }
    //         }

    //         const fase = await this.db.Fase.findAll({
    //             where: {
    //                 fase: {
    //                     [Op.like]: 'adaptasi%'
    //                 }
    //             }
    //         })
    //         if(fase.length <= 0){
    //             return {
    //                 code: 404,
    //                 error: 'Fase Pemeliharaan Ternak not found'
    //             }
    //         }

    //         const adaptasiByStep = fase.find(f => parseInt(f.dataValues.fase.charAt(f.dataValues.fase.length - 1)) === value.step);
    //         if(!adaptasiByStep){
    //             const adaptasi = await this.db.Fase.create({
    //                 fase: `adaptasi ${value.step}`,
    //             });
    //             if(!adaptasi){
    //                 return {
    //                     code: 500,
    //                     error: 'Failed to create fase'
    //                 }
    //             }
    //         }

    //         const treatment = await this.db.Treatment.create(value);
    //         if(!treatment){
    //             return{
    //                 code: 500,
    //                 error: 'Failed to create treatment'
    //             }
    //         }

    //         return {
    //             code: 200,
    //             data: treatment
    //         }
    //     }catch(error){
    //         log_error('createTreatment Service', error);
    //         return {
    //             code: 500,
    //             error
    //         }
    //     }
    // }
}

module.exports = (db) => new _treatment(db);