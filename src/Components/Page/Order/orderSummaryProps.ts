//------------------------------------ Local Interface ------------------------------//

//We keep this Model in this particular page because we don't want to keep it global, and this is for only
//one particular page which is " OrderSummary.tsx " !!!

import { shoppingCartModel } from "../../../Interfaces";
import { SD_Status } from "../../../Utility/SD";

export interface orderSummaryProps {
  data: {
    id?: number;
    cartItems?: shoppingCartModel[];
    cartTotal?: number;
    userId?: string;
    stripePaymentIntentId?: string;
    status?: SD_Status;
  };
  userInput: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
}
