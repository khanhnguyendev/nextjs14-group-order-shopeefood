import { extractRestaurantUrl, handleError } from "../utils";

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

export const getFromUrl = async (restaurantUrl: string) => {
  try {
    const SHOPEEFOOD_URL = extractRestaurantUrl(restaurantUrl);
    console.log(SHOPEEFOOD_URL);

    const API = `${BASE_URL}/delivery/get_from_url?url=${SHOPEEFOOD_URL}`;
    const response = await fetch(API, {
      headers: API_HEADERS,
    });

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    return await response.json();
  } catch (error) {
    handleError(error);
  }
};
