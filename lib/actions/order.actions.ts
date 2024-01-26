"use server";

import { CreateOrderParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";

export const createOrder = async ({
  _roomId,
  _restaurantId,
  _userId,
  _dish,
  _toppings,
  _quantity,
}: CreateOrderParams) => {
  try {
    console.log(`Creating order from [${_restaurantId}] by [${_userId}]...`);

    await connectToDatabase();

    // const user = await User.findById(userId);
    // if (!user) {
    //   throw new Error("User not found");
    // }

    const calculateTotalPrice = () => {
      let _totalPrice = Number(_dish.price.value) * _quantity;
      _toppings.forEach((topping) => {
        _totalPrice += Number(topping.price) * _quantity;
      });
      return _totalPrice;
    };

    const newOrder = await Order.create({
      roomId: _roomId,
      restaurantId: _restaurantId,
      userId: _userId,
      dish: _dish,
      toppings: _toppings,
      quantity: _quantity,
      price: _dish.price.value as Number,
      totalPrice: calculateTotalPrice(),
    });

    console.log(`Order created sucessfully with id [${newOrder._id}]!`);

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};
