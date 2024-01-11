import { Schema, model, models } from "mongoose";

const RoomSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createAt: { type: Date, default: Date.now() },
  expiredAt: { type: Date, default: Date.now() + 3 * 60 * 60 * 1000 }, // Set default to 3 hours from now
  hostedBy: { type: Schema.Types.ObjectId, ref: "User" },
  restaurantId: { type: Number, required: true },
  deliveryId: { type: Number, required: true },
  restaurantUrl: { type: String, required: true },
});

const Room = models.Room || model("Room", RoomSchema);
