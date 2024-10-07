import React , {useEffect, useState} from "react";
import s from "./LilInfoblock.module.css"
import Icon from "../../../../1Pictures/0Icons/0IconsContainer/IconsContainer";

const LilInfoblock=(props)=>{


return (
<div className={s.main}>
<div className={s.section}>
<div className={s.bigIcon}><Icon iconName={props.bigIcon}/></div>

<div className={s.title}>
{props.title}
</div>
<div className={s.volume}> 
{props.volume}
{props.isRub && <span className={s.rub}>₽</span>}
</div>



</div>
</div>
)}


export default LilInfoblock