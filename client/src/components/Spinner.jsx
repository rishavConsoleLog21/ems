import BeatLoader from "react-spinners/BeatLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Spinner = () => {
  return (
    <div className="sweet-loading">
      <BeatLoader color={"#123abc"} loading={true} css={override} size={15} />
    </div>
  );
};

export default Spinner;
