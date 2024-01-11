"use server";

import { CreateRoomParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Room from "../database/models/room.model";
import { getFromUrl } from "../fetcher/shopeefood";

export const createRoom = async ({ room, userId, path }: CreateRoomParams) => {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const restaurantDetail = await getFromUrl(room.restaurantUrl);

    const newRoom = await Room.create({
      ...room,
      hostedBy: userId as string,
      restaurantId: restaurantDetail?.reply.restaurant_id,
      deliveryId: restaurantDetail?.reply.delivery_id,
    });
    return JSON.parse(JSON.stringify(newRoom));
  } catch (error) {
    handleError(error);
  }
};
