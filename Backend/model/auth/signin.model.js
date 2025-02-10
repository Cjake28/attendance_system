import db from '../../db/db.connect.js';
import AppError from '../../utils/AppError.js';

export async function getUserName_by_Email(username){
    try{
        const [result] = await db.query(`
            SELECT username, password, is_verified
            FROM users 
            WHERE username = ?    
        `,[username]);

        return result;
    }catch(error){
        console.log(error);
        throw new AppError('getUserName_by_Email: Database query failed', 500);
    }
}

export const get_id_name_role_Byusername = async(username) =>{
    try{
        const [result] = await db.query(`
            SELECT user_id, name, role 
            FROM users 
            WHERE username = ?
        `,[username]);
    
        return result;
    }catch(err){
        console.log(err)
        throw new AppError('get_id_name_role_Byusername: Database query failed', 500);
    };
}