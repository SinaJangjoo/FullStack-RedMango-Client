import withAdminAuth from "../HOC/withAdminAuth";

function AuthenticationTestAdmin() {
  return (
    <div>This page can only be accessed if role of logged in user is ADMIN</div>
  );
}

export default withAdminAuth(AuthenticationTestAdmin);


//Username: admin@gmail.com
//Password: Admin123*
