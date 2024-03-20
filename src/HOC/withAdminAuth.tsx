//The Higher-Order Component (HOC) is a Function that takes a component and returns a new component!

import jwtDecode from "jwt-decode";
import { SD_Roles } from "../Utility/SD";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    //You can costomize your own rules here for your personilize authentication!
    //(for eg. you might check the Redux store here before redirectto any sensitive page!)
    const accessToken = localStorage.getItem("token") ?? "";

    if (accessToken) {
      const decode: {
        role: string;
      } = jwtDecode(accessToken);

      if (decode.role !== SD_Roles.ADMIN) {
        window.location.replace("/accessdenied");
        return null;
      }
    } else {
      window.location.replace("/login");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
