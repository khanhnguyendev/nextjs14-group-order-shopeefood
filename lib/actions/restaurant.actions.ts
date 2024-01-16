"use server";

import { CreateRestaurantParams } from "@/types";
import Restaurant from "../database/models/restaurant.model";
import { handleError } from "../utils";
import { getDetail } from "../fetcher/shopeefood";

export const createRestaurant = async ({
  restaurantId,
  deliveryId,
}: CreateRestaurantParams) => {
  try {
    console.log(`Creating restaurant for restaurantId [${restaurantId}]...`);

    // Get restaurant detail
    const restaurantDetails = await getDetail(restaurantId);

    if (!restaurantDetails.reply.delivery_detail) {
      throw new Error("Error while getting restaurant detail from ShopeeAPI");
    }

    const response = restaurantDetails.reply.delivery_detail;

    const newRestaurant = await Restaurant.create({
      restaurantId: restaurantId,
      deliveryId: deliveryId,
      name: response.name,
      restaurantUrl: response.url,
      photos: response.photos,
      address: response.address,
      rating: {
        totalReview: response.rating.total_review,
        avg: response.rating.avg,
        displayTotalReview: response.rating.display_total_review,
        appLink: response.rating.app_link,
      },
      totalOrder: response.total_order,
    });

    console.log("Restaurant created and saved successfully!");
    return JSON.parse(JSON.stringify(newRestaurant));
  } catch (error) {
    handleError(error);
  }
};
