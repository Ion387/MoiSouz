import React, { lazy, Suspense }from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ThumbsUpIcon, ExclamationIcon, LightbulbIcon } from 'react-line-awesome'
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import Aside from './Aside/Aside';
import s from './SiteContent.module.css'
import Content from './Content/Content';
import Main from './Content/Main/Main';
const SiteContent = (props) => {

return (
<div className={s.main}>

<BrowserRouter>
<header><Header/></header>
<div className={s.mainSection}>
<nav><Navbar/></nav>


<main>
<Routes>
<Route path="/" element={<Main/>} />
<Route path="/notifications" element={<Content/>} />
<Route path="/tasks" element={<Content/>} />
<Route path="/documents" element={<Content/>} />
<Route path="/my_organizations" element={<Content/>} />
<Route path="/colleagues" element={<Content/>} />
<Route path="/money" element={<Content/>} />
<Route path="/discounts" element={<Content/>} />
<Route path="/store" element={<Content/>} />
<Route path="/information" element={<Content/>} />


{/* <Route path="/Messeges/*" element={<DialogsContainer store={store} />} /> */}
</Routes>
</main>
<aside><Aside/></aside>
</div>
<footer></footer>

{/* <Footer/> //Футер */}
{/* </Provider>  */}
</BrowserRouter>

</div>
)}

export default SiteContent
