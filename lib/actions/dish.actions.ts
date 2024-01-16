"use server";

import { CreateDishesParams } from "@/types";
import { handleError, priceParser } from "../utils";
import { getDishesWeb } from "../fetcher/shopeefood";
import Dish, { IDish } from "../database/models/dish.model";

export const createDishes = async ({
  restaurantId,
  deliveryId,
}: CreateDishesParams) => {
  try {
    console.log(`Creating dishes for restaurantId [${restaurantId}]...`);

    // Remove existing dishes based on restaurantId
    const deleteResult = await Dish.deleteMany({
      restaurantId: Number(restaurantId),
    });
    console.log(
      `Deleted ${deleteResult.deletedCount} existing dishes for restaurantId: [${restaurantId}]`
    );

    const response = await getDishesWeb(deliveryId);

    const menuShopeeFood = response.reply.menu_infos;

    // Use map to create an array of dish objects
    const newDishes: IDish[] = menuShopeeFood.flatMap((menuInfo: any) =>
      menuInfo.dishes.map((dish: any) => ({
        restaurantId: Number(restaurantId),
        dishId: dish.id,
        groupName: menuInfo.dish_type_name,
        name: dish.name,
        imageUrl: dish.photos[0].value,
        description: dish.description,
        price: priceParser(dish.price.text),
        discountPrice:
          dish.discount_price != null
            ? priceParser(dish.discount_price.text)
            : -1,
        totalOrder: dish.display_order,
        isActive: dish.is_active,
      }))
    );

    // Use insertMany to efficiently insert the array of dishes into the database
    const insertResult = await Dish.insertMany(newDishes);
    console.log(
      `Inserted ${insertResult.length} new dishes for restaurantId: [${restaurantId}]`
    );

    console.log("Dishes created and saved successfully!");
  } catch (error) {
    handleError(error);
  }
};
