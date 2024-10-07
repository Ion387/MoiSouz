import React , {useEffect, useState} from "react";
import s from "./Aside.module.css"
import Banner from "./Banner/Banner";

const Aside=(props)=>{
 
    
    return (
<div className={s.main}>
<div className={s.section}>
<div className={`${s.bannerBlock} ${s.bannerAd}`}>
<Banner/>
</div>
<div className={s.bannerBlock}>
<Banner/>
</div>
<div className={s.bannerBlock}>
<Banner/>
</div>
</div>
</div>

)}


export default Aside