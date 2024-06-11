import bcrypt from "bcrypt"
 
export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10)
}

export const comparePassword = async (password, oldpassword) => {
    return bcrypt.compare(password, oldpassword)
}