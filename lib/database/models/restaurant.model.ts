import { Document, Schema, model, models } from "mongoose";

interface IPhoto {
  width?: number;
  value?: string;
  height?: number;
}

interface IRating {
  totalReview?: number;
  avg?: number;
  displayTotalReview?: string;
  appLink?: string;
}

const PhotoSchema = new Schema({
  width: { type: Number },
  value: { type: String },
  height: { type: Number },
});

export interface IRestaurant extends Document {
  restaurantId: number;
  deliveryId: number;
  name: string;
  restaurantUrl: string;
  photos: IPhoto[];
  address: string;
  rating: IRating;
  totalOrder: number;
}

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
