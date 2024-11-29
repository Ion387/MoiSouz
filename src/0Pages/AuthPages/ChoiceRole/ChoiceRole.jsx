import Button from "3Entities/Forms/FormElements/Base/Button/Button";
import s from "./ChoiceRole.module.css";
import { useDispatch, useSelector } from "react-redux";
import { choseTypeOfRegistrationUserAC } from "0Redux/userReducer";
import { useNavigate } from "react-router-dom";

const ChoiceRole = () => {
  const { isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickUserHandler = () => {
    dispatch(choseTypeOfRegistrationUserAC("USER"));
    navigate("/joinTradeUnionForm");
  };
  const onClickPartnerHandler = () => {
    dispatch(choseTypeOfRegistrationUserAC("TRADEUNION"));
    navigate("/createTradeUnionForm");
  };
  return (
    <div className={s.main}>
      <div className={s.section}>
        <div className={s.topButtonOfChoice}>
          <Button
            value={"Стать участником профсоюза"}
            disabled={isLoading}
            onClick={onClickUserHandler}
          />
        </div>
        <div className={s.bottomButtonOfChoice}>
          <Button
            value={"Зарегистрировать профсоюз"}
            disabled={isLoading}
            onClick={onClickPartnerHandler}
          />
        </div>
      </div>
    </div>
  );
};
export default ChoiceRole;
