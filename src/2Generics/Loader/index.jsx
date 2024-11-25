import { RotatingLines } from "react-loader-spinner";

export const Loader = ({ visible = true }) => {
  return (
    <RotatingLines
      visible={visible}
      height="50"
      width="50"
      strokeColor="#4880ff"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
export default Loader;
