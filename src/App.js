import { Provider } from 'react-redux'

import s from './App.module.css'
import SiteContent from './Components/SiteContent/SiteContent'
import store from "./0Redux/0redux-store"
import LoginPage from './Components/LoginPage/LoginPage'
import { useState } from 'react'

const App = (props) => {
const [render,setRender]=useState(1)
return (
<div className={s.main}>
<Provider store={store}>
{store.getState().user.isUserLogin 
? 
<SiteContent/> 
:
<LoginPage setRender={setRender}/>} 
</Provider>
</div>
)}

export default App
