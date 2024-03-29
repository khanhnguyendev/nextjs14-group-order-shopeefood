import { Document, Schema, model, models } from "mongoose";

export const PriceSchema = new Schema(
  {
    value: Number,
    text: String,
    unit: String,
  },
  { _id: false }
);

export const PhotoSchema = new Schema(
  {
    width: { type: Number },
    value: { type: String },
    height: { type: Number },
  },
  { _id: false }
);

export const DishSchema = new Schema(
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

export const ToppingOptionSchema = new Schema(
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

export const ToppingGroupSchema = new Schema(
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
  orderBy: string;
  dish: {
    isDeleted: Boolean;
    description: String;
    name: String;
    price: {
      value: Number;
      text: String;
      unit: String;
    };
    isActive: Boolean;
    totalLike: String;
    photos: [
      {
        width: { type: Number };
        value: { type: String };
        height: { type: Number };
      }
    ];
    isAvailable: Boolean;
    id: Number;
    displayOrder: Number;
    quantity: Number;
  };
  toppings: (typeof ToppingGroupSchema)[];
  quantity: number;
  price: number;
  note: string;
  totalPrice: number;
}

const OrderSchema = new Schema({
  roomId: { type: String, required: true, index: true },
  restaurantId: { type: Number, required: true, index: true },
  orderBy: { type: String, required: true, index: true },
  dish: { type: DishSchema, require: true },
  toppings: [ToppingOptionSchema],
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  note: { type: String },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
