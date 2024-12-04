import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormCreateTradeUnion from "0Pages/SiteContent/Content/Documents/Forms/CreateTradeUnionForm/FormCreateTradeUnion/FormCreateTradeUnion";
import {
  postLogoTUFormTC,
  submitCreateTUFormTC,
} from "0Redux/tradeUnionFormsReducer";

const CreateTradeUnionSubmit = (props) => {
  const { data } = useSelector((state) => state.tradeUnion.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    const logo = data.logo;
    delete data.logo;

    dispatch(submitCreateTUFormTC(data, navigate));
    dispatch(postLogoTUFormTC(logo));
  };

  return <FormCreateTradeUnion defaultValues={data} onSubmit={onSubmit} />;
};

export default CreateTradeUnionSubmit;
