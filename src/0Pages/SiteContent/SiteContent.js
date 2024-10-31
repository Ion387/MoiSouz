import { Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import s from "./SiteContent.module.css";
import Content from "./Content/Content";
import Main from "./Content/Main/Main";
import UserPage from "./Header/UserPage/UserPage";
import DocumentsPage from "./Content/Documents/Documents";
import Organization from "./Content/MyOrganizations/Organization/Organization";
import Colleagues from "./Content/Colleagues/Colleagues";
import ContactCard from "./Content/Colleagues/ContactCard/ContactCard";
import Discounts from "./Content/Discounts/Discounts";
import MyOrganizations from "./Content/MyOrganizations/MyOrganizations";
const SiteContent = (props) => {
  return (
    <div className={s.main}>
      <header>
        <Header />
      </header>
      <div className={s.mainSection}>
        <nav>
          <Navbar />
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/notifications" element={<Content />} />
            <Route path="/tasks" element={<Content />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/my_organizations" element={<MyOrganizations />} />
            {/*My_organizations children:*/}
            <Route path="/organization" element={<Organization />} />{" "}
            <Route path="/colleagues" element={<Colleagues />} />
            {/*Colleagues children:*/}
            <Route path="/userId/:slug" element={<ContactCard />} />
            <Route path="/money" element={<Content />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/store" element={<Content />} />
            <Route path="/information" element={<Content />} />
            <Route path="/UserPage" element={<UserPage />} />
            {/* <Route path="/Messeges/*" element={<DialogsContainer store={store} />} /> */}
          </Routes>
        </main>
      </div>
      <footer></footer>
    </div>
  );
};

export default SiteContent;
