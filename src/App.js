import {connect} from 'react-redux'
import s from './App.module.css'
import SiteContent from './Components/SiteContent/SiteContent'
import LoginPage from './Components/LoginPage/LoginPage'
import {  authThunkUserTC } from './0Redux/userReducer'

const App = (props) => {
return (
<div className={s.main}>
{props.isUserLogged 
? 
<SiteContent/> 
:
<LoginPage authThunk={props.authThunk}/>} 
</div>
)}


const mapStateToProps= (state)=>{
  return{
    isUserLogged:state.user.isUserLogged,
  }}

  export default connect(mapStateToProps,{authThunkUserTC})(App)




