"use server";

import { CreateRoomParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { getFromUrl } from "../fetcher/shopeefood";
import { createRestaurant } from "./restaurant.actions";
import { createDishes } from "./dish.actions";
import Room from "../database/models/room.model";

export const createRoom = async ({ room, userId, path }: CreateRoomParams) => {
  try {
    console.log(`Creating room from [${room.restaurantUrl}] by [${userId}]...`);

    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Get restaurantId, deliveryId
    const restaurantInfo = await getFromUrl(room.restaurantUrl);
    const _restaurantId = restaurantInfo?.reply.restaurant_id;
    const _deliveryId = restaurantInfo?.reply.delivery_id;

    const newRoom = await Room.create({
      ...room,
      hostedBy: userId as string,
      restaurantId: _restaurantId,
      deliveryId: _deliveryId,
    });

    await createRestaurant({
      roomId: newRoom._id,
      restaurantId: _restaurantId,
      deliveryId: _deliveryId,
    });

    await createDishes({
      restaurantId: _restaurantId,
      deliveryId: _deliveryId,
    });

    console.log("Room created and saved successfully!");

    return JSON.parse(JSON.stringify("newRoom"));
  } catch (error) {
    handleError(error);
  }
};
