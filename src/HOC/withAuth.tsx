//The Higher-Order Component (HOC) is a Function that takes a component and returns a new component!

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    //You can costomize your own rules here for your personilize authentication!
    //For eg. you might check the Redux store here before redirectto any sensitive page!
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      window.location.replace("/login");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
