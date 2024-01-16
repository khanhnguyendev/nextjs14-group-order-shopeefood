import { IRestaurant } from "../database/models/restaurant.model";

interface ApiRestaurantDetails {
  reply: {
    delivery_detail: {
      total_order: number;
      rating: {
        total_review: number;
        avg: number;
        display_total_review: string;
        app_link: string;
      };
      restaurant_id: number;
    };
    name: string;
  };
  result: string;
}

export const mapApiToRestaurantModel = (
  apiResponse: ApiRestaurantDetails
): IRestaurant | null => {
  try {
    const deliveryDetail = apiResponse.reply.delivery_detail;

    const restaurant: IRestaurant = {
      restaurantId: deliveryDetail.restaurant_id,
      deliveryId: deliveryDetail.delivery_id,
      name: apiResponse.reply.name,
      restaurantUrl: deliveryDetail.restaurant_url,
      photos: deliveryDetail.photos.map((photo) => ({
        width: photo.width,
        value: photo.value,
        height: photo.height,
      })),
      address: deliveryDetail.address,
      rating: {
        totalReview: deliveryDetail.rating.total_review,
        avg: deliveryDetail.rating.avg,
        displayTotalReview: deliveryDetail.rating.display_total_review,
        appLink: deliveryDetail.rating.app_link,
      },
      totalOrder: deliveryDetail.total_order,
    };

    return restaurant;
  } catch (error) {
    console.error("Error mapping API response to Restaurant model:", error);
    return null;
  }
};
