import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormCreateTradeUnion from "3Entities/Forms/FormCreateTradeUnion/FormCreateTradeUnion";
import {
  postLogoTUFormTC,
  submitCreateTUFormTC,
} from "0Redux/tradeUnionFormsReducer";

const CreateTradeUnionForm = (props) => {
  const { data } = useSelector((state) => state.tradeUnion);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const logo = data.avatar;
    delete data.avatar;
    dispatch(submitCreateTUFormTC(data, navigate));
    dispatch(postLogoTUFormTC(logo));
  };

  return <FormCreateTradeUnion defaultValues={data} onSubmit={onSubmit} />;
};

export default CreateTradeUnionForm;
