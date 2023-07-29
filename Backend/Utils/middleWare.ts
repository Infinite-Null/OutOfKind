const jwt = require('jsonwebtoken');
type Bool = (token:string) => boolean
const VerifyToken:Bool=(token)=>{
    const VerifyValue:boolean=jwt.verify(token,process.env.KEY as string,(err:any,pass:any)=>{
        if(pass){
            return true
        }else{
            return false
        }
    })
    return VerifyValue
}
export default VerifyToken