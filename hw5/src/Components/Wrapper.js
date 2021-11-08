import "./Wrapper.css";
// the whole screen
const Wrapper = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;