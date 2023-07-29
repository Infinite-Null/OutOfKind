export default function Quote({title1,title2}:{title1:string,title2:string}){
    return <>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"50px",fontWeight:"100",letterSpacing:"-1",marginTop:"40px",textAlign:"center"}}>{`"${title1}`}</div>
  <div style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"30px",fontWeight:"200",letterSpacing:"1",color:"purple",textAlign:"center"}}>{`${title2}"`}</div>
    </>
}