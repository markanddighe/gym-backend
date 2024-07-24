import jwt from "jsonwebtoken"



export const checkAuth = (req, res, next) => {

    const auth = req.headers.authorization

    if(!auth) {
        return res.send("no token provide")
    }

    const token = auth.split("")[1]

    try {
        
        const decode = jwt.sign(token, "key")

        if(decode) {
            req.user = decode
        }
        else {
            next()
        }

    } catch (error) {
        return res.send("wrong token")
    }
}