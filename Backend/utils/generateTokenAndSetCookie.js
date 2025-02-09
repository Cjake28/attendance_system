import jwt from 'jsonwebtoken'

export default function generateTokenAndSetCookie (res, userPayload) {
    const token = jwt.sign(userPayload, process.env.JWT_SECRET,
        {
            expiresIn:"30d"
        } 
    );

    res.cookie("HimlayanToken", token, {
        httpOnly: true,
        secure:true,
        sameSite: "None",
        // domain: 'cemetery-mapping-system.onrender.com' 
    });

    return token;
}