import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { useGetAllOrdersQuery } from "../../Apis/orderApi";
import OrderList from "../../Components/Page/Order/OrderList";
import { MainLoader } from "../../Components/Page/Common";
import { SD_Status } from "../../Utility/SD";
import withAuth from "../../HOC/withAuth";

function MyOrders() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);
  const { data, isLoading } = useGetAllOrdersQuery({ userId });
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
            <h1 className="text-success">My Orders</h1>
          </div>
          <div className="mx-5">
            <div className="bg-danger form-control text-center text-white h4 ">
              In this demo, orders older than 3 days might be deleted!
            </div>
          </div>
          {data?.apiResponse.result.length > 0 && (
            <OrderList
              isLoading={isLoading}
              orderData={data?.apiResponse.result}
            />
          )}
          {!(data?.apiResponse.result.length > 0) && (
            <div className="px-5 py-3">
              You do not have any previous orders.
            </div>
          )}
        </>
      )}
    </>
  );
}

export default withAuth(MyOrders);