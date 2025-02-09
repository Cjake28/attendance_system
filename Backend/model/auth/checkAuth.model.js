import db from '../../db/db.connect.js';
import AppError from '../../utils/AppError.js';
export const get_id_name_role_ByID = async (id) => {
  try {
    const [result] = await db.query(`
      SELECT id, name, role, is_verified
      FROM users 
      WHERE id = ?
    `, [id]);

    return result;
  } catch (err) {
    console.log('get_id_name_role_ByID error:', err);
    throw new AppError('Database query failed', 500);
  }
};