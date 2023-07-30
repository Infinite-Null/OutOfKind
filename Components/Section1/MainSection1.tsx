import Left from './Left'
import classes from '../Section2/MainSection.module.css'
export default function Section1({image,title,discription,Toref,button}:{
    image:string,
    title:string,
    discription:string,
    Toref:string,
    button:string
}){
    return <>
    <div className={classes.main}>
        <div className={classes.Left}><Left title={title} discription={discription} Toref={Toref} button={button}/></div>
        <div className={classes.Right}>
          <div className={classes.image} style={{
            background:image,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>

          </div>
        </div>
    </div>
    </>
}