import bcrypt from 'bcryptjs';
import "dotenv/config.js";
import jwt from 'jsonwebtoken';

const hashPassword = async(password) => {
    try {
        let salt = await bcrypt.genSalt(Number(process.env.SALT));
        let hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    } catch (error) {
        throw error
    }
}


const confirmPassword = async(password, hashPassword) => {
    try {
        return await bcrypt.compare(password, hashPassword)
    } catch (error) {
        throw error
    }
}

const createToken = async(payload) => {
    try {
        return await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
    } catch (error) {
        throw error
    }
}

const decodeToken = async(token) => {
    try {
        return await jwt.decode(token);
    } catch (error) {
        throw error
    }
}


export default{
    hashPassword,
    confirmPassword,
    createToken,
    decodeToken
}