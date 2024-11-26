import { connect } from "react-redux";
import s from "./DevElement.module.css";
import Navbar from "0Pages/SiteContent/Navbar/Navbar";
import Header from "0Pages/SiteContent/Header/Header";
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

        <main></main>
      </div>
      <footer></footer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isUserFormFilled: state.user.isUserFormFilled };
};
export default connect(mapStateToProps)(SiteContent);
