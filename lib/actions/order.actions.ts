"use server";

import { CreateOrderParams, GetAllOrderParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";

/**
 * Creates a new order.
 *
 * @param _roomId - The ID of the room.
 * @param _restaurantId - The ID of the restaurant.
 * @param _userId - The ID of the user.
 * @param _dish - The dish details.
 * @param _toppings - The toppings for the dish.
 * @param _quantity - The quantity of the dish.
 * @returns The newly created order.
 */
export const createOrder = async ({
  _roomId,
  _restaurantId,
  _userId,
  _dish,
  _toppings,
  _quantity,
  _note,
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
      orderBy: _userId,
      dish: _dish,
      toppings: _toppings,
      quantity: _quantity,
      price: _dish.price.value as Number,
      totalPrice: calculateTotalPrice(),
      note: _note,
    });

    console.log(`Order created sucessfully with id [${newOrder._id}]!`);

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

export const getAllOrders = async ({ _roomId }: GetAllOrderParams) => {
  try {
    const orders = await Order.find({
      roomId: _roomId,
    });
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
};
