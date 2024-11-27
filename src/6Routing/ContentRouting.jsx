import ChoiceRole from "0Pages/AuthPages/ChoiceRole/ChoiceRole";
import Colleagues from "0Pages/SiteContent/Content/Colleagues/Colleagues";
import ContactCard from "0Pages/SiteContent/Content/Colleagues/ContactCard/ContactCard";
import Content from "0Pages/SiteContent/Content/Content";
import Discounts from "0Pages/SiteContent/Content/Discounts/Discounts";
import DocumentsPage from "0Pages/SiteContent/Content/Documents/DocumentsPage";
import Main from "0Pages/SiteContent/Content/Main/Main";
import MyOrganizations from "0Pages/SiteContent/Content/MyOrganizations/MyOrganizations";
import Organization from "0Pages/SiteContent/Content/MyOrganizations/Organization/Organization";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import MainUser from "0Pages/SiteContent/ContentUser/MainUser/MainUser";
import UserAnketForm from "0Pages/SiteContent/ContentUser/DocumentsUser/UserForms/UserAnketForm/UserAnketForm";
import CreateTradeUnionForm from "0Pages/SiteContent/Content/Documents/Forms/CreateTradeUnionForm/CreateTradeUnionForm";
import JoinToTradeUnionForm from "0Pages/SiteContent/ContentUser/DocumentsUser/UserForms/JoinToTradeUnionForm/JoinToTradeUnionForm";

const ContentRouting = () => {
  const { data, typeOfRegistration } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data.firstName) {
      navigate("/discounts");
    }
  }, []);

  return (
    <Routes>
      {/*   ProffSouz Pages */}
      {data.ROLES && data.ROLES.length > 1 && (
        <>
          {data.ROLES[1] === "ROLE_TRADEUNION" && (
            <>
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
              <Route path="/incoming" element={<UserAnketForm />} />
              <Route path="/outgoing" element={<UserAnketForm />} />
              <Route path="/drafts" element={<UserAnketForm />} />
            </>
          )}
        </>
      )}

      {/*   User Pages */}

      {/* TypeOfRegistrationUserAC("USER"));
    navigate("/main");
  };
  const onClickPartnerHandler = () => {
    dispatch(choseTypeOfRegistrationUserAC("TRADEUNION" */}

      {/*    {data.firstName && (
        <>
          <Route path="/*" element={<Main />} />
          <Route path="/notifications" element={<Content />} />
          <Route path="/tasks" element={<Content />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/my_organizations" element={<MyOrganizations />} /> */}
      {/*My_organizations children:*/}
      {/*        <Route path="/organization" element={<Organization />} />{" "}
          <Route path="/colleagues" element={<Colleagues />} /> */}
      {/*Colleagues children:*/}
      {/*   <Route path="/userId/:slug" element={<ContactCard />} />
          <Route path="/money" element={<Content />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/store" element={<Content />} />
          <Route path="/information" element={<Content />} />
          <Route path="/incoming" element={<ProfileInfoForm />} />
          <Route path="/outgoing" element={<ProfileInfoForm />} />
          <Route path="/drafts" element={<ProfileInfoForm />} />
        </>
      )} */}

      {/* <Route path="/*" element={<ChoiceRole />} /> */}

      {!data.firstName && (
        <>
          <Route path="/*" element={<UserAnketForm />} />
          <Route path="/discounts" element={<Discounts />} />
        </>
      )}

      {data.firstName && (
        <>
          <Route path="/*" element={<ChoiceRole />} />
          <Route path="/profile" element={<UserAnketForm />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route
            path="/joinTradeUnionForm"
            element={<JoinToTradeUnionForm />}
          />
          <Route
            path="/createTradeUnionForm"
            element={<CreateTradeUnionForm />}
          />
        </>
      )}

      {typeOfRegistration === "TRADEUNION" && (
        <>
          <Route path="/*" element={<Main />} />
          <Route path="/profileForm" element={<UserAnketForm />} />
        </>
      )}
    </Routes>
  );
};
export default ContentRouting;
