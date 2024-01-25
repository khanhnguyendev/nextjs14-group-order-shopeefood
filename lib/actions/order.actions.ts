"use server";

import { CreateOrderParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Order from "../database/models/order.model";

export const createOrder = async ({
  restaurantId,
  userId,
  dish,
  toppings,
  quantity,
}: CreateOrderParams) => {
  try {
    console.log(`Creating order from [${restaurantId}] by [${userId}]...`);

    await connectToDatabase();

    // const user = await User.findById(userId);
    // if (!user) {
    //   throw new Error("User not found");
    // }

    const newOrder = await Order.create({
      // roomId: "65b2424573acf021571b8a83",
      restaurantId,
      userId,
      dish,
      toppings,
      quantity,
      price: dish.price.value as Number,
      totalPrice: Number(dish.price.value) * quantity,
    });

    console.log(`Order created sucessfully with id [${newOrder._id}]!`);

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};
