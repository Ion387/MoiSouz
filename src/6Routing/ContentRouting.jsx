import Colleagues from "0Pages/SiteContent/Content/Colleagues/Colleagues";
import ContactCard from "0Pages/SiteContent/Content/Colleagues/ContactCard/ContactCard";
import Content from "0Pages/SiteContent/Content/Content";
import Discounts from "0Pages/SiteContent/Content/Discounts/Discounts";
import DocumentsPage from "0Pages/SiteContent/Content/Documents/DocumentsPage";
import Main from "0Pages/SiteContent/Content/Main/Main";
import MyOrganizations from "0Pages/SiteContent/Content/MyOrganizations/MyOrganizations";
import Organization from "0Pages/SiteContent/Content/MyOrganizations/Organization/Organization";
import UserPage from "0Pages/SiteContent/Header/UserPage/UserPage";
import { Route, Routes } from "react-router-dom";

const ContentRouting = () => {
  return (
    <Routes>
      <Route path="/*" element={<Main />} />
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
  );
};
export default ContentRouting;
