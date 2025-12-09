import jwt,{type JwtPayload} from "jsonwebtoken"

interface IJwtData {
    id:string,
    name:string
}

export type IDecodedJwt = IJwtData & JwtPayload;

export const jwtSign = (data:IJwtData)=>{
    return jwt.sign(data,`${process.env.JWT_SECRET}`)
}

export const jwtVerify = (token:string,)=>{
    return jwt.verify(token,`${process.env.JWT_SECRET}`) as IDecodedJwt
}