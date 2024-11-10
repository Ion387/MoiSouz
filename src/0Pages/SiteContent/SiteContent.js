import { connect } from "react-redux";
import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import s from "./SiteContent.module.css";
import ContentRouting from "6Routing/ContentRouting";
const SiteContent = (props) => {
  return (
    <div className={s.main}>
      <header>
        <Header />
      </header>
      <div className={s.mainSection}>
        <nav>
          <Navbar isUserFormFilled={props.isUserFormFilled} />
        </nav>

        <main>
          <ContentRouting />
        </main>
      </div>
      <footer></footer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isUserFormFilled: state.user.isUserFormFilled };
};
export default connect(mapStateToProps)(SiteContent);
