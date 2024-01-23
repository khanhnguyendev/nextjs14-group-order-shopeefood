import { handleError } from "@/lib/utils";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://gappapi.deliverynow.vn/api";

const API_HEADERS = {
  Host: "gappapi.deliverynow.vn",
  "x-foody-client-type": "3",
  accept: "application/json, text/plain, */*",
  "x-foody-client-id": "0603708D-19CB-46D8-9B6F-8C917D1A54E0",
  "x-foody-device-fingerprint": "69569e75::Y5jAFe*RsR)a>uJTQ60R8`4b",
  "x-foody-client-language": "en",
  "x-foody-client-version": "5.42.1",
  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  "x-foody-access-token":
    "3d322dd487524edf69b2e4cd05bee182e9f4a6789c02176005b18c9a4a1ff65fec173aa1a6433e4f520e0c7b0eecd858d1c3ad9ba5393a2222188d58881091e8",
  "x-foody-api-version": "1",
  "user-agent":
    "NOW/5.13.4 (iPhone13,2; ios 17.1.2; Scale/3) appver=139 secid=2002 rnver=2288 ShopeeFood/5.42.1 (iPhone13,2; iOS 17.1.2; Scale/3.00)",
  "x-foody-app-type": "1004",
  "x-foody-client-rn-version": "5.13.4",
  "x-sap-ri": "8d999f658e055397c24c5c22ea7c00a127aba5b1681426b7",
};

export async function GET(req: NextRequest) {
  try {
    const restaurantId = req.nextUrl.searchParams.get("restaurantId");
    const dishId = req.nextUrl.searchParams.get("dishId");

    if (!restaurantId || !dishId) {
      throw new Error("Missing restaurantId or dishId");
    }

    const API = `${BASE_URL}/v5/buyer/store/dish/option_groups?restaurant_id=${restaurantId}&dish_id=${dishId}`;

    const response = await fetch(API, {
      method: "GET",
      headers: API_HEADERS,
    });
    const data = await response.json();

    return NextResponse.json(data.data.option_groups);
  } catch (error) {
    handleError(error);
    return NextResponse.error();
  }
}
