import s from "./Header.module.css"
import userWomen from "../../../1Pictures/0Icons/userWomen.png";
import headerUserMore from "../../../1Pictures/0Icons/headerUserMore.png";
import Icon from "../../../1Pictures/0Icons/0IconsContainer/IconsContainer";
import { NavLink } from "react-router-dom";


const Header=(props)=>{
 
    
    return (
<div className={s.main}>
<div className={s.section}>

<div className={s.logo}>
<span className={s.logoMoi}>Мой</span>
<span className={s.logoSouz}>Союз</span></div>




<div className={s.rightHeaderBlock}>

<div className={s.bell}>
  <Icon iconName="bellIcon" />
{/*   <img src={bellIcon} alt='bellIcon'/> */}
  <div className={s.bellCircle}>
  <div className={s.bellCircleNumber}>6</div>
  </div>
</div>

<div className={s.user}>
  <img className={s.userAvatar} src={userWomen} alt='userWomenIcon'/>
  <div className={s.blockNameOfUsers}>
  <div className={s.userName} >
  <NavLink to="/UserPage" className = {s.userName}>Ирина.К.
 </NavLink>

  </div>
  <div className={s.userType} >Администратор</div>
  </div>
  <div className={s.chevronDown}>
  <img src={headerUserMore}/>
  </div>
</div>


</div>

</div>
</div>

)}


export default Header