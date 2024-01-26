"use server";

import { CreateRoomParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { getFromUrl } from "../fetcher/shopeefood/web.api";
import { createRestaurant } from "./restaurant.actions";
import Room from "../database/models/room.model";

/**
 * Creates a new room with the provided parameters.
 *
 * @param {CreateRoomParams} params - The parameters for creating the room.
 * @returns {Promise<object>} - A promise that resolves to the newly created room.
 * @throws {Error} - If the user is not found or an error occurs during the creation process.
 */
export const createRoom = async ({ room, userId }: CreateRoomParams) => {
  try {
    console.log(`Creating room from [${room.restaurantUrl}] by [${userId}]...`);

    await connectToDatabase();

    // const user = await User.findById(userId);
    // if (!user) {
    //   throw new Error("User not found");
    // }

    // Get restaurantId, deliveryId
    const restaurantInfo = await getFromUrl(room.restaurantUrl);
    const _restaurantId = restaurantInfo?.restaurant_id;
    const _deliveryId = restaurantInfo?.delivery_id;

    const newRoom = await Room.create({
      title: room.title,
      expiredAt: room.expiredAt,
      restaurantUrl: room.restaurantUrl,
      hostedBy: userId as string,
      restaurantId: _restaurantId,
      deliveryId: _deliveryId,
    });

    console.log("Room created and saved successfully!");

    return JSON.parse(JSON.stringify(newRoom));
  } catch (error) {
    handleError(error);
  }
};

/**
 * Retrieves a room by its ID.
 * @param {string} roomId - The ID of the room to retrieve.
 * @returns {Promise<object>} - A promise that resolves to the retrieved room object.
 * @throws {Error} - If the room is not found.
 */
export const getRoomById = async (roomId: string) => {
  try {
    await connectToDatabase();

    const room = await Room.findById(roomId);

    if (!room) throw new Error("Room not found");

    return JSON.parse(JSON.stringify(room));
  } catch (error) {
    handleError(error);
  }
};
