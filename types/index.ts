import { IRoom } from "@/lib/database/models/room.model";
import { Dish, MenuInfo, Restaurant, ToppingOption } from "./shopeefood.type";

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== Room PARAMS
export type CreateRoomParams = {
  userId: string;
  room: {
    title: string;
    expiredAt: Date;
    restaurantUrl: string;
  };
};

// ======= Restaurant PARAMS
export type CreateRestaurantParams = {
  roomId: string;
  restaurantId: string;
  deliveryId: string;
};

// ======== Dishes PARAMS
export type CreateDishesParams = {
  restaurantId: string;
  deliveryId: string;
};

export type GetOrdersByEventParams = {
  eventId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ====== RESTAURANT DETAIL PROPS
export type RestaurantDetailProps = {
  room: IRoom;
  restaurant: Restaurant;
};

// ====== DIALOG ORDER PROPS
export type DialogOrderProps = {
  roomId: string;
  restaurantId: number;
  dish: Dish;
  userId: string;
};

// ====== TOPPING GROUP PROPS
export type ToppingGroupProps = {
  restaurantId: number;
  dishId: number;
};

// ====== ORDER FORM PROPS
export type OrderFormProps = {
  restaurantId: number;
  dish: Dish;
};

// ====== DISH DETAIL PROPS
export type DishDetailProps = {
  dish: Dish;
};

// ====== CREATE ORDER PARAMS
export type CreateOrderParams = {
  _roomId: string;
  _userId: string;
  _restaurantId: number;
  _dish: Dish;
  _toppings: ToppingOption[];
  _quantity: number;
  _note: string;
};

// ====== GET ALL ORDER PARAMS
export type GetAllOrderParams = {
  _roomId: string;
};
