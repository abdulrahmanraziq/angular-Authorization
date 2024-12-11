import auth from '../common/auth.js';
const verifyAdmin = async(req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1];
        if(token){
            let payload = await auth.decodeToken(token);
            let user = await userModal.findOne({_id: payload._id});

            if(user && payload.role === 'Admin' && payload.role === user.role){
                next()
            }
            else{
                res.status(401).send({
                    message:"Unauthorized Access"
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Internal Server Error',
            error
        })
    }
}

export default verifyAdmin;