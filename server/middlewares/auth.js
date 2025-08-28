import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) => {
    try {
        const {token} = req.headers
        if(!token) {
            return res.json({success:false,message:'Not authorizeed login again'})
        }
        
        const token_decode=jwt.decode(token)
        
        req.user={clerkid:token_decode.clerkid}
        next()

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:error.message || "Internal server error"
        })
    }
}

export default authUser