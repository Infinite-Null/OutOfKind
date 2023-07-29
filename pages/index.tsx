import { Link } from "@nextui-org/react"
import { useEffect } from "react"

export default function App(){
    async function Fetch(){
      
    }
    useEffect(()=>{
        Fetch()
        return()=>{

        }
    })
    return <>
    <Link href="/community">Community</Link><br/>
    <Link href="/Search">Search</Link>
    </>
}