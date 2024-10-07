import s from "./LoginPage.module.css";
import React , {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { addSubmitAC } from "../../0Redux/userReducer";

const LoginPage=(props)=>{
const { register,handleSubmit,watch,formState: { errors }, } = useForm()

const onSubmit = (data) => {
    console.log(data.password);   
if (data.email==='a@mail.ru' && data.password==='123' ) {
    props.addSubmitAC();
    props.setRender(2)
}}

return (
<div className={s.main}>
<div className={s.section}>
<div className={s.loginBlock}>
<div className={s.title}>Вход</div>

<form className={s.loginForm} onSubmit={handleSubmit(onSubmit)} >
<div className={s.formTitles}>Адрес электронной почты:</div>
<input className={s.input} placeholder={'ivanov@mail.ru'} {...register("email")} />

<div className={s.flexTitles}>
<div className={s.formTitles}>Пароль</div>
<div className={s.formTitles}>Забыли пароль?</div>
</div>

<input className={s.input} type="password" placeholder={'password'} {...register("password", { required: true, /* maxlength===5 */ })} />
<div className={s.checkboxBlock}>

<input className={s.checkbox} type ={'checkbox'} {...register("rememberMe")}/> <div className={s.checkboxText}>Запомнить пароль</div>
</div>
{/*   {errors.email && <span>почта</span>} */}

<div className={s.submitBlock}>

<input className={s.submit} type="submit" value="Войти" /> 
<div className={s.underSubmit}>

<div className={s.textUnderSubmit}>Ещё нет аккаунта?</div>
<a href="#" className={s.linkUnderSubmit}>Регистрация</a>
</div>
</div>
</form>

</div>
</div>
</div>

)}


const mapStateToProps= (state)=>{
return{
userLogin:state.user.userLogin,

}}
/* export default LoginPage */
export default connect(mapStateToProps,{addSubmitAC})(LoginPage)