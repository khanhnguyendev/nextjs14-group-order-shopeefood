import { Schema, model, models } from "mongoose";

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
