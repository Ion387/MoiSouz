import React , {useEffect, useState} from "react";
import s from "./Money.module.css";
import BigInfoblock from "../../../../0Generic/Infoblocks/BigInfoblock/BigInfoblock"
import LilInfoblock from "../../../../0Generic/Infoblocks/LilInfoblock/LilInfoblock";
import { connect } from "react-redux";

const UserPage=(props)=>{
 
    return (
<div className={s.main}>
<div className={s.section}>
setProfile()


</div>
</div>

)}



const mapStateToProps= (state)=>{
    return{
      isUserLogin:state.user.isUserLogin,
    }}
  
    export default connect(mapStateToProps)(UserPage)