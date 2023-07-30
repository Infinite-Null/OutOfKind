import Link from 'next/link'
import classes from './MainSection.module.css'
export default function Left({title,discription,Toref,button}:{
    title:string,
    discription:string,
    Toref:string,
    button:string
}){
    return <div className={classes.Left}>
        <div className={classes.Quote}>
            {title} 
        </div>
        <div className={classes.Discription}>
        {discription}
        </div>
        <Link href={Toref} className={classes.LeftButton}>
            {button}
        </Link>
    </div>
}