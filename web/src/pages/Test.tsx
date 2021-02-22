import Commento from "components/Commento";
import { NavLink } from "react-router-dom";

export const Test = () => {
  console.log(111);

  return (
    <div>
      <NavLink to="/c/1">asd</NavLink>
      <Commento id="1" />
    </div>
  );
};
