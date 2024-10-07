import React , {useEffect, useState} from "react";
import s from "./Main.module.css"
import Money from "./1Money/Money";
import Documents from "./2Documents/Documents";
import Appeals from "./3Appeals/Appeals";
import Tascs from "./4Tascs/Tascs";
import News from "./5News/News";

const Main=(props)=>{
 
    return (
<div className={s.main}>
<div className={s.section}>

<section className={s.sectionMoney}>
<Money/>
</section>

<section className={s.sectionDocuments}>
<Documents/>
</section>
Appeals

<section className={s.sectionAppeals}>
<Appeals/>
</section>


<section className={s.sectionTascs}>
<Tascs/>
</section>


<section className={s.sectionTascs}>
<News/>
</section>


</div>
</div>
)}


export default Main