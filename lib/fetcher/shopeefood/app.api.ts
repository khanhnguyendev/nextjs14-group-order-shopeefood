import { handleError } from "@/lib/utils";

const BASE_URL = "https://gappapi.deliverynow.vn/api";

const API_HEADERS = {
  "x-foody-client-id": "",
  "x-foody-client-type": "1",
  "x-foody-app-type": "1004",
  "x-foody-client-version": "3.0.0",
  "x-foody-api-version": "1",
  "x-foody-client-language": "vi",
  "x-foody-access-token":
    "6cf780ed31c8c4cd81ee12b0f3f4fdaf05ddf91a29ffce73212e4935ed9295fd354df0f4bc015478450a19bf80fddbe13302a61aa0c705af8315aae5a8e9cd6b",
};

// Get topping by dishId
export const getToppingApp = async (restaurantId: number, dishId: number) => {
  try {
    const API = `${BASE_URL}/v5/buyer/store/dish/option_groups?restaurant_id=${restaurantId}&dish_id=${dishId}`;

    const response = await fetch(API, {
      method: "GET",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      .then((data) => data.reply);

    if (!response.reply) {
      console.log("Error while fetching topping from ShopeeFood APP");
      return;
    }

    return response;
  } catch (error) {
    handleError(error);
  }
};
