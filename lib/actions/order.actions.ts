"use server";

import { CreateOrderParams, GetAllOrderParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import { pusher } from "../pusher";

/**
 * Creates a new order.
 *
 * @param _roomId - The ID of the room where the order is placed.
 * @param _restaurantId - The ID of the restaurant where the order is placed.
 * @param _userId - The ID of the user who placed the order.
 * @param _dish - The dish ordered.
 * @param _toppings - The toppings added to the dish.
 * @param _quantity - The quantity of the dish ordered.
 * @param _note - Additional notes for the order.
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

    // Send to MenuOrder component
    pusher.trigger(_roomId, "new-order", {
      message: JSON.stringify(newOrder),
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
