import { Schema, model, models } from "mongoose";

const PhotoSchema = new Schema({
  width: { type: Number },
  value: { type: String },
  height: { type: Number },
});

const RestaurantSchema = new Schema({
  restaurantId: { type: Number, required: true },
  deliveryId: { type: Number, required: true },
  name: { type: String, required: true },
  restaurantUrl: { type: String, required: true },
  photos: [PhotoSchema],
  address: { type: String, required: true },
  rating: {
    totalReview: { type: Number, default: 0 },
    avg: { type: Number, default: 0 },
    displayTotalReview: { type: String },
    appLink: { type: String },
  },
  totalOrder: { type: Number, default: 0 },
});

const Restaurant = models.Restaurant || model("Restaurant", RestaurantSchema);

export default Restaurant;
