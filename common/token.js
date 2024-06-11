import jwt from "jsonwebtoken"
 
export const generateToken = async (payload) => {
    return jwt.sign(payload, "key", {expiresIn : "2h"})
}