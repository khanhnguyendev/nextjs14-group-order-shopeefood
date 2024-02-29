import { IOrder } from "@/lib/database/models/order.model";
import { Dish, MenuInfo } from "./shopeefood.type";

// ====== CARD PROPS
export type CardProps = {
  _roomId: string;
  _userId: string;
  _restaurantId: number;
  _dish: Dish;
};

// ====== MENU & ORDER PROPS
export type MenuOrderProps = {
  _roomId: string;
  _restaurantId: number;
  _menus: MenuInfo[];
};

// ====== DIALOG ORDER PROPS
export type OrderCollectionProps = {
  _roomId: string;
};

export type OrderTableProps = {
  orders: IOrder[];
};
