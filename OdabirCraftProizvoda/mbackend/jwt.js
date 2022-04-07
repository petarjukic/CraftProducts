import jwt from "jsonwebtoken";
//require('dotenv').config();
import 'dotenv/config'

function signJwt(user_id) {
    const token = jwt.sign({sub: user_id}, process.env.SECRET);
    if (!token) return false;
    return token;
}

function verifyJwt(req, res, next) {
    const authorization = req.header('authorization');
    const token = authorization ? authorization.split('Bearer ')[1] : undefined;
    if(!token) {
        return res.send(401, "Unauthorized");
    }
    jwt.verify(token, process.env.SECRET, (err, payload)=>{
        if (err || !payload.sub) {
            return res.send(401, "Unauthorized");
        }
        return next();
    })
}

export default { signJwt, verifyJwt };