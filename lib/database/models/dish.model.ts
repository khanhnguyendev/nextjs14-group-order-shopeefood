import { Document, Schema, model, models } from "mongoose";

export interface IDish extends Document {
  restaurantId: number;
  dishId: number;
  catalogId: number;
  groupName?: string;
  name: string;
  imageUrl: string;
  description?: string;
  price: number;
  discountPrice?: number;
  totalOrder: number;
  listingStatus: boolean;
  ratingGood?: number;
  totalLike?: number;
  rank?: number;
  isHidden?: boolean;
}

const DishSchema = new Schema({
  restaurantId: { type: Number, required: true },
  dishId: { type: Number, required: true },
  catalogId: { type: Number, required: true },
  groupName: { type: String },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  totalOrder: { type: Number, required: true },
  listingStatus: { type: Boolean, required: true },
  ratingGood: { type: Number, default: 0 },
  totalLike: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  isHidden: { type: Boolean, default: false },
});

const Dish = models.Dish || model("Dish", DishSchema);

export default Dish;
