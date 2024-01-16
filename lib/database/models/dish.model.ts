import { Document, Schema, model, models } from "mongoose";

export interface IDish extends Document {
  restaurantId: number;
  dishId: number;
  catalogId: number;
  groupName: string;
  name: string;
  imageUrl: string;
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
  imageUrl: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  totalOrder: { type: Number, required: true },
  totalLike: { type: Number, default: 0 },
  isActive: { type: Boolean, default: false },
});

const Dish = models.Dish || model("Dish", DishSchema);

export default Dish;
