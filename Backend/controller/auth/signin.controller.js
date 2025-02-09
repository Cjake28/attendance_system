import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../../utils/generateTokenAndSetCookie.js'
import {getUserName_by_Email, get_id_name_role_Byusername} from '../../model/auth/signin.model.js'
import AppError from '../../utils/AppError.js';

export const signin = async (req, res) =>{
    const {username, password} = req.body;
        
        if(!username || !password){
            throw new AppError("All field are required", 400);
        }
        const usernameLower = username.toLowerCase();
        const queryUserName_password = await getUserName_by_Email(usernameLower);

        const userExist = queryUserName_password && queryUserName_password.length > 0;
        console.log(userExist);
        const dbpassword = userExist && queryUserName_password[0]?.password;
        const isVerified = userExist && queryUserName_password[0]?.is_verified;
        
        if(!userExist){
            throw new AppError("User not exist", 400);
        }
        console.log("isverified: ", isVerified);
        if(!isVerified){
            throw new AppError("Account suspended contact the Admin", 400);
        }

        const encrypted = await bcrypt.compare(password, dbpassword);

        if(!encrypted){
            throw new AppError("Wrong email or password", 400);
        }

        const get_id_name_roleByusername = await get_id_name_role_Byusername(username);
        const userId = get_id_name_roleByusername[0]?.id;
        const name = get_id_name_roleByusername[0]?.name;
        const role = get_id_name_roleByusername[0]?.role;
        const userPayload = { userId: userId, name: name, role: role};

        generateTokenAndSetCookie(res,userPayload);

        res.status(200).json({success:true, message: "signed in successfully", user:userPayload})
}