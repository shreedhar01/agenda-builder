import jwt from "jsonwebtoken"

export const jwtSign = (password:string)=>{
    return jwt.sign(password,`${process.env.JWT_SECRET}`)
}

export const jwtVerify = (token:string,)=>{
    return jwt.verify(token,`${process.env.JWT_SECRET}`)
}