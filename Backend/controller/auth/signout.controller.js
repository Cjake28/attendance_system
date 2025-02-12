
export async function signout(req, res){
	res.cookie("AtendanceSys", "", {
        httpOnly: true,
        secure:true,
        sameSite: "None",
        // domain: 'cemetery-mapping-system.onrender.com' 
    });
	res.status(200).json({ success: true, message: "Signed out successfully" });
};