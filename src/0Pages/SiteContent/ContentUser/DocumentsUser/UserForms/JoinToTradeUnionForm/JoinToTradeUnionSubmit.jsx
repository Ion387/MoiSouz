import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormAddToTradeUnion from "./FormJoinToTradeUnion/FormJoinToTradeUnion";
import { Resolution, usePDF } from "react-to-pdf";
import { useRef, useState } from "react";
import PrintedFormJoin from "./PrintedFormJoin/PrintedFormJoin";
import { useReactToPrint } from "react-to-print";

const JoinToTradeUnionForm = (props) => {
  const [savePDF, setSavePDF] = useState(0);
  const { data } = useSelector((state) => state.user);
  const dataForm = { ...data, position: data.position && data.position[0] };
  const { toPDF, targetRef } = usePDF({
    filename: "Заявление о вступлении.pdf",
  });

  const printRef = useRef();

  const cancelHandler = () => {};

  const saveHandler = () => {
    setSavePDF(savePDF + 1);
    /*     setIsShowPrintedForm(false); */
  };

  const printHandler = useReactToPrint({
    printRef,
  });

  /*   const navigate = useNavigate();
  const dispatch = useDispatch(); */
  let dataForPrintedForm = {};
  const onSubmit = (data) => {
    dataForPrintedForm = data;
    /*    setIsShowPrintedForm(true); */
    /*     toPDF(); */
    /*     const avatar = data.avatar;
    delete data.avatar;
    dispatch(postAvatarUserTC(avatar)); */
  };

  return (
    <div>
      <div>
        <PrintedFormJoin
          savePDF={savePDF}
          targetRef={targetRef}
          printRef={printRef}
          toPDF={toPDF}
          /*  toPDF={toPDF} */
          /*             setIsShowPrintedForm={setIsShowPrintedForm} */
        />
      </div>
      <FormAddToTradeUnion
        defaultValues={dataForm}
        onSubmit={onSubmit}
        /*           setIsShowPrintedForm={setIsShowPrintedForm} */
        cancelHandler={cancelHandler}
        saveHandler={saveHandler}
        printHandler={printHandler}
      />
      ;
    </div>
  );
};

export default JoinToTradeUnionForm;
