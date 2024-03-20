import { SD_Status } from "../Utility/SD";
import orderDetailModel from "./orderDetailModel";
import orderDetail from "./orderDetailModel";

export default interface orderHeaderModel {
  orderHeaderId?: number;
  pickupName?: string;
  pickupPhoneNumber?: string;
  pickupEmail?: string;
  applicationUserId?: string;
  user?: any;
  oredrTotal?: number;
  orderDate?: Date;
  stripePaymentIntentID?: string;
  status?: SD_Status;
  totalItems?: number;
  orderDetails?: orderDetailModel[];
}