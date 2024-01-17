import { Document, Schema, model, models } from "mongoose";

const PhotoSchema = new Schema({
  width: { type: Number },
  value: { type: String },
  height: { type: Number },
});

export interface IPhoto {
  width: number;
  value: string;
  height: number;
}

export interface IDish extends Document {
  restaurantId: number;
  dishId: number;
  catalogId: number;
  groupName: string;
  name: string;
  photos: IPhoto[];
  description: string;
  price: number;
  discountPrice?: number;
  totalOrder: number;
  listingStatus: boolean;
  totalLike?: number;
  isActive: boolean;
}

const DishSchema = new Schema({
  restaurantId: { type: Number, required: true, index: true },
  dishId: { type: Number, required: true, unique: true },
  groupName: { type: String, required: true },
  name: { type: String, required: true },
  photos: [PhotoSchema],
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  totalOrder: { type: Number, required: true },
  totalLike: { type: Number, default: 0 },
  isActive: { type: Boolean, default: false },
});

const Dish = models.Dish || model("Dish", DishSchema);

export default Dish;
