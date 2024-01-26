import { Document, Schema, model, models } from "mongoose";

const PriceSchema = new Schema(
  {
    value: Number,
    text: String,
    unit: String,
  },
  { _id: false }
);

const PhotoSchema = new Schema(
  {
    width: { type: Number },
    value: { type: String },
    height: { type: Number },
  },
  { _id: false }
);

const DishSchema = new Schema(
  {
    isDeleted: Boolean,
    description: String,
    name: String,
    price: PriceSchema,
    isActive: Boolean,
    totalLike: String,
    photos: [PhotoSchema],
    isAvailable: Boolean,
    id: Number,
    displayOrder: Number,
    quantity: Number,
  },
  { _id: false }
);

const ToppingOptionSchema = new Schema(
  {
    name: String,
    weight: Number,
    price: Number,
    partnerOptionId: String,
    isActive: Boolean,
    rank: Number,
    isDefault: Boolean,
    maxQty: Number,
    groupId: Number,
    id: Number,
  },
  { _id: false }
);

const ToppingGroupSchema = new Schema(
  {
    minSelect: Number,
    name: String,
    rank: Number,
    options: [ToppingOptionSchema],
    maxSelect: Number,
    id: Number,
    partnerOptionGroupId: String,
  },
  { _id: false }
);

export interface IOrder extends Document {
  roomId: number;
  restaurantId: number;
  dish: typeof DishSchema;
  toppings: (typeof ToppingGroupSchema)[];
  quantity: number;
  price: number;
  totalPrice: number;
}

const OrderSchema = new Schema({
  roomId: { type: String, required: true },
  restaurantId: { type: Number, required: true },
  dish: { type: DishSchema, require: true },
  toppings: [ToppingOptionSchema],
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
