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

// ====== MENU & ORDER PROPS
export type MenuOrderProps = {
  restaurantId: number;
  menuList: MenuInfo[];
};

// ====== MENU COLLECTION PROPS
export type MenuCollectionProps = {
  restaurantId: number;
  menuList: MenuInfo[];
};

// ====== DIALOG ORDER PROPS
export type DialogOrderProps = {
  restaurantId: number;
  dish: Dish;
  userId: string;
};

// ====== TOPPING GROUP PROPS
export type ToppingGroupProps = {
  restaurantId: number;
  dishId: number;
};

// ====== CARD PROPS
export type CardProps = {
  restaurantId: number;
  dish: Dish;
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
  userId: string;
  restaurantId: number;
  dish: Dish;
  toppings: ToppingOption[];
  quantity: number;
};
