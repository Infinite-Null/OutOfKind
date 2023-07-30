import DonationCard from "@/Components/DonationCard/DonationCard"
import Section1 from "@/Components/Section1/MainSection1"
import Section2 from "@/Components/Section2/MainSection1"
import { Text } from "@nextui-org/react"
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
    <Section1 image={`url("https://images.pond5.com/happy-employees-connect-jigsaw-puzzles-illustration-201396481_iconl_nowm.jpeg")`} title="Community" discription="Here you can share your story of something good you have done and encourage others to do the same." Toref="/community" button="Connect Now"/>
    <Section2 image={`url("https://img.freepik.com/premium-vector/woman-pointing-web-browser-online-search-engine-bars-seo-optimization-concept-illustration_270158-291.jpg")`} title="Search" discription="Here you can for nearby ngo and there details." Toref="/Search" button="Search Now"/>
     <center style={{
        marginTop:"30px"
     }}><Text b size='$7xl'>Donations</Text></center>
     <div style={{
        margin:"20px"
     }}>
     <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexWrap:"wrap",
        gap:"20px"
     }}>
     <DonationCard/>
     <DonationCard/>
     <DonationCard/>
     <DonationCard/>
     <DonationCard/>
     <DonationCard/>
     <DonationCard/>
     </div>
     </div>
    </>
}