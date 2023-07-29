export default async function Login(email:string,password:string){
   const response= await fetch("api/Users/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:email,
          password:password
        }),
      })
      return response
}