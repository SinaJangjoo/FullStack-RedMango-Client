//When we are passing details from API to some separated page like this page, we need to use Redux!
// Because of that REDUX we can access all the properties much easily in every separeted pages in our website!
//In this page we setup our first Redux in this Project

// Because we want to calculate the counter (Quantity) here, and it is limited only to this page we will use Local State!

import { useNavigate, useParams } from "react-router-dom"; // Because we get an id in the URL of this page
import { useGetMenuItemByIdQuery } from "../Apis/menuItemApi";
import { useState } from "react";
import { useUpdateShoppingCartMutation } from "../Apis/shoppingCartApi";
import { MainLoader } from "../Components/Page/Common";
import { apiResponse, userModel } from "../Interfaces";
import { toastNotify } from "../Helper";
import { useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";


function MenuItemDetails() {
  const { menuItemId } = useParams(); //The reason that we use "menuItemId" is in "App.tsx" we pass this variable exactly with the same name in the path!
  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId); //To get datas from API
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );


  const handleQuantity = (counter: number) => {
    // if the counter that we recieve from </i> was minus(-) it will decreament and if it was plus(+) it will increament
    let newQuantity = quantity + counter;
    if (newQuantity == 0) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
    return;
  };

  //We make this function async because that is mutation and we want to wait for the response
  const handleAddToCart = async (menuItemId: number) => {
    if (!userData.id) {
      navigate("/login")
      return;
    }
    setIsAddingToCart(true);

    const response : apiResponse = await updateShoppingCart({
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
      userId: userData.id,
    });
    if(response.data && response.data.isSuccess){
      toastNotify("Item added to cart successfully!")
    }
    setIsAddingToCart(false);
  };

  return (
    <div className="container pt-4 pt-md-5">
      {/* Conditional Rendering */}
      {!isLoading ? (
        <div className="row">
          <div className="col-7">
            <h2 className="text-success">{data.result?.name}</h2>
            <span>
              <span
                className="badge text-bg-dark pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result?.category}
              </span>
            </span>
            <span>
              <span
                className="badge text-bg-light pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result?.specialTag}
              </span>
            </span>
            <p style={{ fontSize: "20px" }} className="pt-2">
              {data.result?.description}
            </p>
            <span className="h3">${data.result?.price}</span> &nbsp;&nbsp;&nbsp;
            <span
              className="pb-2  p-3"
              style={{ border: "1px solid #333", borderRadius: "30px" }}
            >
              <i
                onClick={() => {
                  handleQuantity(-1);
                }}
                className="bi bi-dash p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
              <span className="h3 mt-3 px-3">{quantity}</span>
              <i
                onClick={() => {
                  handleQuantity(+1);
                }}
                className="bi bi-plus p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </span>
            <div className="row pt-4">
              <div className="col-5">
                <button
                  className="btn btn-success form-control"
                  onClick={() => handleAddToCart(data.result?.id)}
                >
                  Add to Cart
                </button>
              </div>

              <div className="col-5 ">
                <button
                  className="btn btn-secondary form-control"
                  onClick={() => navigate(-1)}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          <div className="col-5">
            <img
              src={data.result.image}
              width="100%"
              style={{ borderRadius: "50%" }}
              alt="No content"
            ></img>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <MainLoader/>
        </div>
      )}
    </div>
  );
}

export default MenuItemDetails;
